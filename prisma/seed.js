const { PrismaClient } = require("@prisma/client")
const { categories } = require('./data.js')
const prisma = new PrismaClient();

const load = async () => {
    try {
        await prisma.category.deleteMany();
        console.log("Deleted records in category table");

        await prisma.product.deleteMany();
        console.log("Deleted records in book table")

        await prisma.category.createMany({
            data: categories
        });
        console.log("Added category data");

        await prisma.product.createMany({
            data: products
        })
        console.log("Added product data")
    } catch (e) {
        console.error(e)
        process.exit(1)

    } finally {
        await prisma.$disconnect();

    }
}
load();