// src/actions/consultations.ts
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getConsultations(status?: 'NEW' | 'DONE' | 'ALL') {
    const where = status && status !== 'ALL' ? { status } : {}

    // Smart sorting: NEW by delivery date (urgent first), DONE by created date
    const orderBy = status === 'NEW'
        ? [
            { deliveryDate: 'asc' as const },  // Urgent consultations first
            { createdAt: 'desc' as const }     // Then by newest
        ]
        : { createdAt: 'desc' as const }

    return await prisma.consultation.findMany({
        where,
        orderBy,
        include: {
            product: {
                select: {
                    id: true,
                    title: true,
                    imageUrl: true
                }
            }
        }
    })
}

export async function markAsDone(id: string) {
    await prisma.consultation.update({
        where: { id },
        data: { status: 'DONE' }
    })

    revalidatePath('/consultations')
    revalidatePath('/dashboard')

    return { success: true }
}

export async function markAsNew(id: string) {
    await prisma.consultation.update({
        where: { id },
        data: { status: 'NEW' }
    })

    revalidatePath('/consultations')
    revalidatePath('/dashboard')

    return { success: true }
}

// NEW: Create consultation from product page (CRM Phase 2)
export async function createConsultationFromProduct(data: {
    customerName: string
    customerPhone: string
    deliveryDate: string
    occasion: string
    productId: string
    productTitle: string
    budget: string
    source: string
}) {
    await prisma.consultation.create({
        data: {
            customerName: data.customerName,
            customerPhone: data.customerPhone,
            deliveryDate: new Date(data.deliveryDate),
            occasion: data.occasion,
            productId: data.productId,
            budget: data.budget,
            notes: `Quan tâm mẫu: ${data.productTitle}`,
            source: data.source,
            status: 'NEW'
        }
    })

    revalidatePath('/consultations')
    revalidatePath('/dashboard')

    return { success: true }
}
