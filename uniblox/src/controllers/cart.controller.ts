import {  type Request, type Response } from "express";
import { prisma } from "../lib/prisma.js";

export async function addCart(req: Request, res: Response){
  try {
    const {  productId, quantity } = req.body;
    const userId = req.user.userId

   const product = await prisma.product.findUnique({
    where: {
      id: productId
    }
   })

   if(!product){
    return res.status(404).json({message: "item doesnt exist"})
   }

  if(product.stock < quantity){
    return res.status(400).json({message: "out of stock product"})
  }

  let cart = await prisma.cart.findUnique({
    where: {userId: userId}
  })

  if(!cart){
    cart = await prisma.cart.create({
      data: {userId: userId}
    })
  }
  
    
  const existingItem = await prisma.cartItem.findFirst({
    where: {cartId: cart.id,
      productId
    }
  }) 

  if(existingItem){
    await prisma.cartItem.update({
    where: {id: existingItem.id},
    data: {quantity: existingItem.quantity + quantity}
    })

  }else{
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity
      }
    })
  }
    

    return res.json({ success: true, message: "Added to cart" });


  } catch (error) {
    return res.status(500).json({ message: "Error adding item" });
  }
};

export async function getCart(req: Request, res: Response){

  try {
    
const cart = await prisma.cartItem.findMany()

return

  } catch (error) {
    
  }

}