import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        const today = new Date()
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

        const weeklySales = await prisma.order.groupBy({
            by: ['createdAt'],
            where: {
                createdAt: {
                    gte: lastWeek,
                    lte: today
                },
                orderStatus: 'DELIVERED'  // Using orderStatus field
            },
            _sum: {
                shippingCost: true  // Using shippingCost for total sales
            }
        })

        const formattedData = weeklySales.map(day => ({
            date: day.createdAt,
            total: day._sum.shippingCost || 0
        }))

        return Response.json(formattedData)
    } catch (error) {
        return Response.json({ error: 'Failed to fetch sales data' }, { status: 500 })
    }
}
