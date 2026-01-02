// src/actions/dashboard.ts
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Lấy thống kê tổng quan
export async function getDashboardStats() {
    const [newConsultations, totalProducts] = await Promise.all([
        prisma.consultation.count({
            where: { status: "NEW" }
        }),
        prisma.product.count()
    ])

    return {
        newConsultations,
        totalProducts
    }
}

// Lấy 5 consultations mới nhất
export async function getLatestConsultations() {
    return await prisma.consultation.findMany({
        where: { status: "NEW" },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
            id: true,
            customerName: true,
            customerPhone: true,
            occasion: true,
            budget: true,
            createdAt: true
        }
    })
}

// Lấy sản phẩm gần đây
export async function getRecentProducts(limit = 6) {
    return await prisma.product.findMany({
        orderBy: { createdAt: 'desc' },
        take: limit,
        select: {
            id: true,
            imageUrl: true,
            title: true,
            tags: true,
            createdAt: true
        }
    })
}

// Lấy shop status
export async function getShopStatus() {
    let config = await prisma.shopConfig.findUnique({
        where: { id: 1 }
    })

    // Tạo config nếu chưa có
    if (!config) {
        config = await prisma.shopConfig.create({
            data: { id: 1, isAccepting: true }
        })
    }

    return config
}

// Cập nhật shop status
export async function updateShopStatus(isAccepting: boolean) {
    const result = await prisma.shopConfig.upsert({
        where: { id: 1 },
        update: { isAccepting },
        create: { id: 1, isAccepting }
    })

    revalidatePath('/dashboard')
    return result
}
