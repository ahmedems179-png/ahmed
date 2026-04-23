'use client'

import { useState } from 'react'
import { MessageCircle, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createOrder } from '@/lib/actions/orders'

const WHATSAPP_NUMBER = '7845533270'

interface WhatsAppProductButtonProps {
  productName: string
  price: number
  quantity: number
}

export function WhatsAppProductButton({ productName, price, quantity }: WhatsAppProductButtonProps) {
  const message = encodeURIComponent(
    `مرحبا، أريد طلب:\n\n` +
    `المنتج: ${productName}\n` +
    `الكمية: ${quantity}\n` +
    `السعر: ${(price * quantity).toLocaleString('ar-IQ')} د.ع\n\n` +
    `أرجو التأكيد.`
  )
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <Button
      asChild
      className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
      size="lg"
    >
      <a href={url} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-5 w-5" />
        اطلب عبر واتساب
      </a>
    </Button>
  )
}

interface CartItem {
  id?: string
  name: string
  quantity: number
  price: number
}

interface WhatsAppCheckoutButtonProps {
  name: string
  phone: string
  address: string
  city?: string
  notes?: string
  items: CartItem[]
  total: number
  onSuccess?: () => void
}

export function WhatsAppCheckoutButton({ 
  name, 
  phone, 
  address,
  city,
  notes,
  items, 
  total,
  onSuccess 
}: WhatsAppCheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  const itemsList = items
    .map(i => `• ${i.name} × ${i.quantity} — ${(i.price * i.quantity).toLocaleString('ar-IQ')} د.ع`)
    .join('\n')

  const message = encodeURIComponent(
    `🛒 طلب جديد من الموقع\n\n` +
    `👤 الاسم: ${name}\n` +
    `📱 الهاتف: ${phone}\n` +
    `📍 العنوان: ${address}\n` +
    (city ? `🏙️ المدينة: ${city}\n` : '') +
    (notes ? `📝 ملاحظات: ${notes}\n` : '') +
    `\n📦 المنتجات:\n${itemsList}\n\n` +
    `💰 المجموع: ${total.toLocaleString('ar-IQ')} د.ع`
  )
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  const handleClick = async () => {
    setIsLoading(true)
    
    // حفظ الطلب في قاعدة البيانات
    const result = await createOrder({
      customer_name: name,
      customer_phone: phone,
      customer_address: address,
      customer_city: city,
      customer_notes: notes,
      total_amount: total,
      items: items.map(i => ({
        product_id: i.id,
        product_name: i.name,
        quantity: i.quantity,
        price: i.price,
      })),
    })

    setIsLoading(false)

    if (result.success) {
      // فتح واتساب
      window.open(url, '_blank')
      if (onSuccess) {
        onSuccess()
      }
    } else {
      // حتى لو فشل الحفظ، نفتح واتساب
      window.open(url, '_blank')
      if (onSuccess) {
        onSuccess()
      }
    }
  }

  return (
    <Button
      className="w-full bg-green-500 hover:bg-green-600 text-white gap-2"
      size="lg"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          جاري إرسال الطلب...
        </>
      ) : (
        <>
          <MessageCircle className="h-5 w-5" />
          أرسل الطلب عبر واتساب
        </>
      )}
    </Button>
  )
}

export function FloatingWhatsAppButton() {
  const message = encodeURIComponent('مرحبا، لدي استفسار عن منتجاتكم')
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
      aria-label="تواصل معنا عبر واتساب"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  )
}
