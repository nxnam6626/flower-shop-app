'use server'

import { prisma } from "@/lib/prisma"
import { revalidatePath } from "next/cache"

// Create new order (can be from consultation or standalone)
export async function createOrder(data: {
    customerName: string
    customerPhone: string
    deliveryDate: string
    deliveryAddress?: string

    productId?: string
    productTitle: string
    productImageUrl: string
    productPrice: number
    shippingFee: number

    consultationId?: string
    notes?: string
}) {
    try {
        // Generate simple Order Number: ORD-YYYYMMDD-XXXX
        const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '')
        const count = await prisma.order.count({
            where: {
                createdAt: {
                    gte: new Date(new Date().setHours(0, 0, 0, 0))
                }
            }
        })
        const orderNumber = `ORD-${dateStr}-${(count + 1).toString().padStart(3, '0')}`

        // Calculate total
        const totalAmount = data.productPrice + data.shippingFee

        // Transaction: Create Order + Update Consultation status
        await prisma.$transaction(async (tx) => {
            // 1. Create Order
            const order = await tx.order.create({
                data: {
                    orderNumber,
                    customerName: data.customerName,
                    customerPhone: data.customerPhone,
                    deliveryDate: new Date(data.deliveryDate),
                    deliveryAddress: data.deliveryAddress,

                    productId: data.productId,
                    productTitle: data.productTitle,
                    productImageUrl: data.productImageUrl,

                    productPrice: data.productPrice,
                    shippingFee: data.shippingFee,
                    totalAmount,

                    status: 'PENDING',
                    paymentStatus: 'UNPAID',

                    consultationId: data.consultationId,
                    notes: data.notes
                }
            })

            // 2. If from consultation, mark as DONE
            if (data.consultationId) {
                await tx.consultation.update({
                    where: { id: data.consultationId },
                    data: { status: 'DONE' }
                })
            }

            // 3. Create CRM Reminder (1 year later) - CRM Phase 4 preview
            await tx.cRMReminder.create({
                data: {
                    orderId: order.id,
                    customerId: data.customerPhone, // Simple customer ID by phone
                    customerName: data.customerName,
                    reminderDate: new Date(new Date(data.deliveryDate).setFullYear(new Date(data.deliveryDate).getFullYear() + 1)),
                    reminderType: 'ANNIVERSARY',
                    occasion: 'Kỷ niệm mua hoa', // Can be refined later
                    lastOrderAmount: totalAmount,
                    status: 'PENDING'
                }
            })
        })

        revalidatePath('/orders')
        revalidatePath('/consultations')
        revalidatePath('/dashboard')

        return { success: true }
    } catch (error) {
        console.error('Create Order Error:', error)
        return { success: false, error: 'Failed to create order' }
    }
}

// Get all orders with optional status filter
export async function getOrders(status?: string) {
    const where = status && status !== 'ALL' ? { status } : {}

    return await prisma.order.findMany({
        where,
        orderBy: [
            { deliveryDate: 'asc' }, // Urgent orders first
            { createdAt: 'desc' }
        ],
        include: {
            product: {
                select: {
                    id: true,
                    title: true,
                    imageUrl: true
                }
            },
            consultation: {
                select: {
                    id: true,
                    occasion: true
                }
            }
        }
    })
}

// Update order status
export async function updateOrderStatus(orderId: string, status: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { status }
        })

        revalidatePath('/orders')
        return { success: true }
    } catch (error) {
        console.error('Update Order Status Error:', error)
        return { success: false, error: 'Failed to update status' }
    }
}

// Update payment status
export async function updatePaymentStatus(orderId: string, paymentStatus: string) {
    try {
        await prisma.order.update({
            where: { id: orderId },
            data: { paymentStatus }
        })

        revalidatePath('/orders')
        return { success: true }
    } catch (error) {
        console.error('Update Payment Status Error:', error)
        return { success: false, error: 'Failed to update payment status' }
    }
}
