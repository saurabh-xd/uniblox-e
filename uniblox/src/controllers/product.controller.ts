import type { Request, Response } from "express";
import { prisma } from "../lib/prisma.js";



export async function allProducts(req: Request, res: Response){
       
 try {
    const products = await prisma.product.findMany()

    return res.json({
      success: true,
      data: products
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    })
  }

}

export async function product(req: Request, res: Response){

    try {
        const { id }= req.params;
    
        const product = await prisma.product.findUnique({
            where: {
                id: id
            }
        })

        return res.json({
      success: true,
      data: product
    })


    } catch (error) {
        

        return res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    })
  }

    }

export async function productByCategory(req: Request, res: Response){

   try {
     const { id } = req.params
 
     const product = await prisma.product.findMany({
         where: {
             categoryId: id
         }
     })

      return res.json({
      success: true,
      data: product
    })

   } catch (error) {
       return res.status(500).json({
      success: false,
      message: "Failed to fetch products"
    })
   }

}

