import { prisma } from '@/lib/prisma'

export async function GET() {
    try {
        // Tạo 2 mốc thời gian: hiện tại và 7 ngày trước
        const today = new Date()
        const lastWeek = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

        // Sử dụng Prisma để truy vấn và nhóm đơn hàng theo orderStatus
        const orderStats = await prisma.order.groupBy({
            by: ['orderStatus'], // Nhóm theo trạng thái đơn hàng
            _count: true // Đếm số lượng đơn hàng trong mỗi nhóm
        })

        // Chuyển đổi dữ liệu sang định dạng phù hợp để hiển thị
        const formattedData = orderStats.map(status => ({
            status: status.orderStatus, // Trạng thái đơn hàng (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELED)
            count: status._count // Số lượng đơn hàng trong trạng thái đó
        }))

        // Trả về dữ liệu dạng JSON
        return Response.json(formattedData)
    } catch (error) {
        // Xử lý lỗi nếu có
        return Response.json({ error: 'Failed to fetch orders data' }, { status: 500 })
    }
}
