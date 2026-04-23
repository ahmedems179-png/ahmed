'use server'

import { createClient } from '@/lib/supabase/server'

export type Product = {
  id: string
  name: string
  name_ar: string
  description: string | null
  description_ar: string | null
  price: number
  original_price: number | null
  category: string
  image_url: string | null
  badge: string | null
  badge_ar: string | null
  in_stock: boolean
  created_at: string
  updated_at: string
}

export async function getProducts(category?: string) {
  const supabase = await createClient()

  let query = supabase
    .from('products')
    .select('*')
    .eq('in_stock', true)
    .order('created_at', { ascending: false })

  if (category && category !== 'all') {
    query = query.eq('category', category)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching products:', error)
    return { success: false, error: error.message, data: [] }
  }

  return { success: true, data: data as Product[] }
}

export async function getProductById(id: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching product:', error)
    return { success: false, error: error.message, data: null }
  }

  return { success: true, data: data as Product }
}

export async function getCategories() {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('products')
    .select('category')
    .eq('in_stock', true)

  if (error) {
    console.error('Error fetching categories:', error)
    return { success: false, error: error.message, data: [] }
  }

  // استخراج الفئات الفريدة
  const categories = [...new Set(data.map((p) => p.category))]
  return { success: true, data: categories }
}
