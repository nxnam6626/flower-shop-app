// src/actions/gallery.ts
'use server'

import { prisma } from "@/lib/prisma"
import cloudinary from "@/lib/cloudinary"
import { revalidatePath } from "next/cache"

export async function uploadProduct(formData: FormData) {
  const file = formData.get('file') as File
  const title = formData.get('title') as string
  const tags = formData.get('tags') as string // Nhận chuỗi tags (VD: "Sinh nhật,Đỏ")

  if (!file) throw new Error("Chưa chọn ảnh!")

  // 1. Convert file sang Buffer để upload lên Cloudinary
  const arrayBuffer = await file.arrayBuffer()
  const buffer = new Uint8Array(arrayBuffer)

  // 2. Upload lên Cloudinary
  const uploadResult: any = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "flower-shop-products" }, // Tên thư mục trên Cloud
      (error, result) => {
        if (error) reject(error)
        else resolve(result)
      }
    ).end(buffer)
  })

  // 3. Lưu vào Database (Prisma)
  await prisma.product.create({
    data: {
      imageUrl: uploadResult.secure_url,
      title: title || null, // Thêm title vào database
      tags: tags ? tags.split(',').map(t => t.trim()) : [], // Tách chuỗi thành mảng
      isRealPhoto: true,
    }
  })

  // 4. Làm mới dữ liệu trang chủ (để ảnh hiện ra ngay lập tức)
  revalidatePath('/')
  revalidatePath('/gallery')
  revalidatePath('/dashboard')

  return { success: true }
}