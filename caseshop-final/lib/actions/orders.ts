'use server'

import { createClient } from '@/lib/supabase/server'

export type OrderItem = {
  product_id?: string
  product_name: string
  quantity: number
  price: number
}

export type CreateOrderInput = {
  customer_name: string
  customer_phone: string
  customer_address: string
  customer_city?: string
  customer_notes?: string
  total_amount: number
  items: OrderItem[]
}

export async function createOrder(input: CreateOrderInput) {
  const supabase = await createClient()

  // إنشاء الطلب
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      customer_name: input.customer_name,
      customer_phone: input.customer_phone,
      customer_address: input.customer_address,
      customer_city: input.customer_city,
      customer_notes: input.customer_notes,
      total_amount: input.total_amount,
      status: 'pending',
      whatsapp_sent: true, // سيتم إرساله عبر واتساب
    })
    .select()
    .single()

  if (orderError) {
    console.error('Error creating order:', orderError)
    return { success: false, error: orderError.message }
  }

  // إضافة عناصر الطلب
  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id || null,
    product_name: item.product_name,
    quantity: item.quantity,
    price: item.price,
  }))

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems)

  if (itemsError) {
    console.error('Error creating order items:', itemsError)
    return { success: false, error: itemsError.message }
  }

  return { success: true, order }
}

export async function getOrders() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('orders')
    .select(`
      *,
      order_items (*)
    `)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching orders:', error)
    return { success: false, error: error.message, data: [] }
  }

  return { success: true, data }
}

export async function updateOrderStatus(orderId: string, status: string) {
  const supabase = await createClient()

  const { error } = await supabase
    .from('orders')
    .update({ status, updated_at: new Date().toISOString() })
    .eq('id', orderId)

  if (error) {
    console.error('Error updating order status:', error)
    return { success: false, error: error.message }
  }

  return { success: true }
}
