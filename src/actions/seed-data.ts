// src/actions/seed-data.ts
'use server'

import { prisma } from "@/lib/prisma"

export async function seedTestData() {
    try {
        // 1. Tạo consultations mẫu
        const consultations = await Promise.all([
            prisma.consultation.create({
                data: {
                    customerName: "Nguyễn Văn A",
                    customerPhone: "0912345678",
                    budget: "500k - 1tr",
                    occasion: "Sinh nhật",
                    style: "Tone hồng pastel",
                    notes: "Muốn hoa tươi, giao trong ngày",
                    status: "NEW"
                }
            }),
            prisma.consultation.create({
                data: {
                    customerName: "Trần Thị B",
                    customerPhone: "0987654321",
                    budget: "1tr - 2tr",
                    occasion: "Khai trương",
                    style: "Tone đỏ, vàng sang trọng",
                    notes: "Cần giao trước 8h sáng",
                    status: "NEW"
                }
            }),
            prisma.consultation.create({
                data: {
                    customerName: "Lê Văn C",
                    customerPhone: "0901234567",
                    budget: "300k - 500k",
                    occasion: "Valentine",
                    style: "Hoa hồng đỏ",
                    notes: null,
                    status: "NEW"
                }
            }),
            prisma.consultation.create({
                data: {
                    customerName: "Phạm Thị D",
                    customerPhone: "0976543210",
                    budget: "Trên 2tr",
                    occasion: "Đám cưới",
                    style: "Tone trắng, kem",
                    notes: "Cần tư vấn kỹ về thiết kế",
                    status: "NEW"
                }
            })
        ])

        // 2. Tạo products mẫu (dùng Unsplash images)
        const products = await Promise.all([
            prisma.product.create({
                data: {
                    imageUrl: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800",
                    title: "Bó hoa hồng đỏ vintage",
                    tags: ["Hoa hồng", "Tone đỏ", "Valentine", "Cao cấp"],
                    isRealPhoto: true
                }
            }),
            prisma.product.create({
                data: {
                    imageUrl: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?w=800",
                    title: "Bó hoa tulip hồng pastel",
                    tags: ["Tulip", "Tone hồng", "Sinh nhật", "Tone pastel"],
                    isRealPhoto: true
                }
            }),
            prisma.product.create({
                data: {
                    imageUrl: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800",
                    title: "Bó hoa cẩm chướng trắng",
                    tags: ["Cẩm chướng", "Tone trắng", "Đám cưới", "Giá rẻ"],
                    isRealPhoto: true
                }
            }),
            prisma.product.create({
                data: {
                    imageUrl: "https://images.unsplash.com/photo-1518895312237-a9e23508077d?w=800",
                    title: "Bó hoa hướng dương vàng",
                    tags: ["Hướng dương", "Tone vàng", "Khai trương", "Năng lượng"],
                    isRealPhoto: true
                }
            }),
            prisma.product.create({
                data: {
                    imageUrl: "https://images.unsplash.com/photo-1487070183336-b863922373d4?w=800",
                    title: "Kệ hoa chúc mừng sang trọng",
                    tags: ["Kệ hoa", "Khai trương", "Cao cấp", "Tone đỏ"],
                    isRealPhoto: true
                }
            }),
            prisma.product.create({
                data: {
                    imageUrl: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?w=800",
                    title: "Bó hoa lily trắng tinh khôi",
                    tags: ["Lily", "Tone trắng", "Đám tang", "Thanh lịch"],
                    isRealPhoto: true
                }
            })
        ])

        // 3. Tạo ShopConfig nếu chưa có
        await prisma.shopConfig.upsert({
            where: { id: 1 },
            update: {},
            create: { id: 1, isAccepting: true }
        })

        return {
            success: true,
            data: {
                consultationsCreated: consultations.length,
                productsCreated: products.length
            }
        }
    } catch (error) {
        console.error("Seed error:", error)
        return {
            success: false,
            error: String(error)
        }
    }
}

export async function clearTestData() {
    try {
        await prisma.consultation.deleteMany({})
        await prisma.product.deleteMany({})

        return { success: true }
    } catch (error) {
        return { success: false, error: String(error) }
    }
}
