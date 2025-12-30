// src/actions/test-db.ts
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function createTestProduct() {
    try {
        const newProduct = await prisma.product.create({
            data: {
                imageUrl: "https://images.unsplash.com/photo-1522673607200-1648832cee98", // Ảnh hoa mẫu từ Unsplash
                title: "Bó hoa Test Kết Nối",
                tags: ["Test", "Neon", "Prisma"],
                isRealPhoto: true,
            }
        })

        // Làm mới trang để thấy dữ liệu mới
        revalidatePath('/')

        return { success: true, data: newProduct }
    } catch (error) {
        console.error("Lỗi khi lưu dữ liệu:", error)
        return { success: false, error: String(error) }
    }
}