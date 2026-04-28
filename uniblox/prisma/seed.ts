

const prisma = new PrismaClient()

async function main() {
  // 1. Create Categories
  const electronics = await prisma.category.create({
    data: {
      name: "Electronics"
    }
  })

  const clothing = await prisma.category.create({
    data: {
      name: "Clothing"
    }
  })

  // 2. Create Products
  await prisma.product.createMany({
    data: [
      {
        title: "iPhone 15",
        description: "Apple smartphone",
        price: 80000,
        stock: 10,
        categoryId: electronics.id
      },
      {
        title: "Laptop",
        description: "Gaming laptop",
        price: 120000,
        stock: 5,
        categoryId: electronics.id
      },
      {
        title: "T-Shirt",
        description: "Cotton t-shirt",
        price: 500,
        stock: 50,
        categoryId: clothing.id
      }
    ]
  })

  console.log("🌱 Seed data inserted")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })