import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const ids = {
    electronics: "seed-category-electronics",
    clothing: "seed-category-clothing",
    iphone: "seed-product-iphone-15",
    laptop: "seed-product-laptop",
    tshirt: "seed-product-tshirt",
    cartItemPhone: "seed-cart-item-phone",
    cartItemTshirt: "seed-cart-item-tshirt",
    order: "seed-order-completed",
    orderItemPhone: "seed-order-item-phone",
    address: "seed-address-delhi",
  };

  const user = await prisma.user.upsert({
    where: { email: "saurabh@test.com" },
    update: {
      username: "saurabh",
      password: "hashedpassword",
    },
    create: {
      username: "saurabh",
      email: "saurabh@test.com",
      password: "hashedpassword",
    },
  });

  const electronics = await prisma.category.upsert({
    where: { id: ids.electronics },
    update: { name: "Electronics" },
    create: {
      id: ids.electronics,
      name: "Electronics",
    },
  });

  const clothing = await prisma.category.upsert({
    where: { id: ids.clothing },
    update: { name: "Clothing" },
    create: {
      id: ids.clothing,
      name: "Clothing",
    },
  });

  const product1 = await prisma.product.upsert({
    where: { id: ids.iphone },
    update: {
      title: "iPhone 15",
      description: "Apple smartphone",
      price: 80000,
      stock: 10,
      categoryId: electronics.id,
    },
    create: {
      id: ids.iphone,
      title: "iPhone 15",
      description: "Apple smartphone",
      price: 80000,
      stock: 10,
      categoryId: electronics.id,
    },
  });

  await prisma.product.upsert({
    where: { id: ids.laptop },
    update: {
      title: "Laptop",
      description: "Gaming laptop",
      price: 120000,
      stock: 5,
      categoryId: electronics.id,
    },
    create: {
      id: ids.laptop,
      title: "Laptop",
      description: "Gaming laptop",
      price: 120000,
      stock: 5,
      categoryId: electronics.id,
    },
  });

  const product3 = await prisma.product.upsert({
    where: { id: ids.tshirt },
    update: {
      title: "T-Shirt",
      description: "Cotton t-shirt",
      price: 500,
      stock: 50,
      categoryId: clothing.id,
    },
    create: {
      id: ids.tshirt,
      title: "T-Shirt",
      description: "Cotton t-shirt",
      price: 500,
      stock: 50,
      categoryId: clothing.id,
    },
  });

  const cart = await prisma.cart.upsert({
    where: { userid: user.id },
    update: {},
    create: {
      userid: user.id,
    },
  });

  await prisma.cartItem.upsert({
    where: { id: ids.cartItemPhone },
    update: {
      cartId: cart.id,
      productId: product1.id,
      quantity: 1,
    },
    create: {
      id: ids.cartItemPhone,
      cartId: cart.id,
      productId: product1.id,
      quantity: 1,
    },
  });

  await prisma.cartItem.upsert({
    where: { id: ids.cartItemTshirt },
    update: {
      cartId: cart.id,
      productId: product3.id,
      quantity: 2,
    },
    create: {
      id: ids.cartItemTshirt,
      cartId: cart.id,
      productId: product3.id,
      quantity: 2,
    },
  });

  const order = await prisma.order.upsert({
    where: { id: ids.order },
    update: {
      userId: user.id,
      total: 81000,
      discountAmount: 1000,
      finalAmount: 80000,
      status: "completed",
      productId: product1.id,
    },
    create: {
      id: ids.order,
      userId: user.id,
      total: 81000,
      discountAmount: 1000,
      finalAmount: 80000,
      status: "completed",
      productId: product1.id,
    },
  });

  await prisma.orderItem.upsert({
    where: { id: ids.orderItemPhone },
    update: {
      orderId: order.id,
      productId: product1.id,
      quantity: 1,
      price: 80000,
    },
    create: {
      id: ids.orderItemPhone,
      orderId: order.id,
      productId: product1.id,
      quantity: 1,
      price: 80000,
    },
  });

  const coupon = await prisma.coupon.upsert({
    where: { code: "DISCOUNT10" },
    update: {
      discountPercent: 10,
      maxUsage: 100,
      usedCount: 1,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
    create: {
      code: "DISCOUNT10",
      discountPercent: 10,
      maxUsage: 100,
      usedCount: 1,
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    },
  });

  await prisma.couponUsage.upsert({
    where: { orderId: order.id },
    update: {
      couponId: coupon.id,
      userId: user.id,
    },
    create: {
      couponId: coupon.id,
      userId: user.id,
      orderId: order.id,
    },
  });

  await prisma.payment.upsert({
    where: { orderId: order.id },
    update: {
      amount: 80000,
      status: "completed",
      paymentMethod: "CARD",
    },
    create: {
      orderId: order.id,
      amount: 80000,
      status: "completed",
      paymentMethod: "CARD",
    },
  });

  await prisma.address.upsert({
    where: { id: ids.address },
    update: {
      userId: user.id,
      city: "Delhi",
      state: "Delhi",
      country: "India",
      pincode: 110001,
    },
    create: {
      id: ids.address,
      userId: user.id,
      city: "Delhi",
      state: "Delhi",
      country: "India",
      pincode: 110001,
    },
  });

  console.log("Full relational seed completed successfully");
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
