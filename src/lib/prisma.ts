// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

// Khai báo biến global cho TypeScript (để không bị báo lỗi đỏ)
const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Tạo adapter cho PostgreSQL với connection string từ biến môi trường
const connectionString = process.env.DATABASE_URL!
const adapter = new PrismaPg({ connectionString })

// Kiểm tra xem đã có instance nào chưa, nếu chưa thì tạo mới
// Prisma 7.x yêu cầu driver adapter khi khởi tạo PrismaClient
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter })

// Nếu không phải môi trường Production (tức là đang chạy dev), 
// thì lưu instance vào biến global để tái sử dụng
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma