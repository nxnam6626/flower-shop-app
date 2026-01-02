// src/actions/consultations.ts
'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

export async function getConsultations(status?: 'NEW' | 'DONE' | 'ALL') {
    const where = status && status !== 'ALL' ? { status } : {}

    return await prisma.consultation.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        select: {
            id: true,
            customerName: true,
            customerPhone: true,
            budget: true,
            occasion: true,
            style: true,
            notes: true,
            status: true,
            createdAt: true
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
