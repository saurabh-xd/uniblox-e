import type { Request, Response } from "express"
import { prisma } from "../lib/prisma.js";


type Product = {
    title: string,
    description: string,
    price: number,
    stock: number,
    categoryId: string
}

export async function addProduct(req: Request, res: Response){
 try {
    
       const {title, description, price, stock, categoryId} = req.body as Product
   
       if(!title || !description || price===undefined || !stock===undefined || !categoryId){
               return res.status(400).json({ message: "All fields required" });
       }
   
       const newProduct = await prisma.product.create({
           data: {
               title,
               description,
               price,
               stock,
               categoryId
           }
       })

       return res.status(201).json({
        success: true,
        message: "product added successfully",
        newProduct
       })
 } catch (error) {
    return res.status(500).json({
        success: false,
        message: "internal server error "
    })
 }

}

export async function getProduct(req: Request, res: Response){

try {
    const allProducts = await prisma.product.findMany();
    
    return res.status(200).json({
        success: true,
        allProducts
    })
} catch (error) {
    return res.status(500).json({
        success: false,
        message: "internal server error "
    })
}

}

export async function getOneProduct(req: Request, res: Response){
   try {
     const {id}= req.params

     const singleProduct = await prisma.product.findUnique({
        where: {
            id
        }
     })

     if(!singleProduct){
        return res.status(404).json({
            success: false,
            message: "product not found"
        })
     }

     return res.status(200).json({
        success: true,
        singleProduct
     })

   } catch (error) {

    return res.status(500).json({
         success: false,
        message: "internal server error "
    })
    
   }



}

export async function updateProduct(req: Request, res: Response){

   try {
    const {id} = req.params
     const {title, description, price, stock, categoryId} = req.body

    

const updatedProduct = await prisma.product.update({
    where: {
      id
    },
    data: {
         title,
         description,
         price,
         stock,
         categoryId 
    }
})

if(!updateProduct){
    return res.status(404).json({
        success: false,
        message: "product not found"
    })
}

return res.status(200).json({
    success: true,
    message: "product updated sucessfully"
})

   } catch (error) {

     return res.status(500).json({
         success: false,
        message: "internal server error "
    })
    
   }



}

export async function deleteProduct(req: Request, res: Response){

   try {
     const {id} = req.params
 
     const deleteProduct = await prisma.product.delete({
         where: {
             id
         }
     })

     return res.status(200).json({
        success: true,
        message: "product deleted succefully"
     })
   } catch (error) {
     return res.status(500).json({
         success: false,
        message: "internal server error "
    })
   }

}

