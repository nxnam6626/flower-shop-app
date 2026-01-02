// src/actions/products.ts
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getProducts(tagFilter?: string) {
    const where = tagFilter
        ? { tags: { has: tagFilter } }
        : {}

    return await prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            imageUrl: true,
            title: true,
            tags: true,
            isRealPhoto: true,
            createdAt: true
        }
    })
}

export async function getAllTags() {
    const products = await prisma.product.findMany({
        select: { tags: true }
    })

    // Flatten and deduplicate tags
    const allTags = products.flatMap(p => p.tags)
    return Array.from(new Set(allTags)).sort()
}

export async function deleteProduct(id: string) {
    await prisma.product.delete({
        where: { id }
    })

    revalidatePath('/gallery')
    revalidatePath('/dashboard')

    return { success: true }
}

export async function updateProduct(id: string, data: { title?: string, tags?: string[] }) {
    await prisma.product.update({
        where: { id },
        data
    })

    revalidatePath('/gallery')
    revalidatePath('/dashboard')

    return { success: true }
}
