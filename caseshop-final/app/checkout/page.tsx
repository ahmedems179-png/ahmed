'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShoppingBag, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { WhatsAppCheckoutButton } from '@/components/WhatsAppButton'
import { useCartStore } from '@/lib/store'

export default function CheckoutPage() {
  const { items, getTotal, clearCart } = useCartStore()
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [notes, setNotes] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const isFormValid = name.trim() && phone.trim() && address.trim() && items.length > 0

  const handleSuccess = () => {
    setIsSubmitted(true)
    clearCart()
  }

  if (isSubmitted) {
    return (
      <main className="py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">تم إرسال طلبك!</h1>
            <p className="text-muted-foreground mb-6">
              شكراً لك! سنتواصل معك قريباً عبر واتساب لتأكيد الطلب.
            </p>
            <Button asChild>
              <Link href="/products">متابعة التسوق</Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }

  if (items.length === 0) {
    return (
      <main className="py-16">
        <div className="container mx-auto px-4 text-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
          <p className="text-muted-foreground mb-6">
            أضف بعض المنتجات لإتمام الطلب
          </p>
          <Button asChild>
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link href="/" className="hover:text-foreground transition-colors">
            الرئيسية
          </Link>
          <ArrowRight className="h-4 w-4" />
          <span className="text-foreground">إتمام الطلب</span>
        </nav>

        <h1 className="text-3xl font-bold mb-8">إتمام الطلب</h1>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Customer Info Form */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات التوصيل</CardTitle>
            </CardHeader>
            <CardContent>
              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="name">الاسم الكامل</FieldLabel>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="أدخل اسمك الكامل"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="phone">رقم الهاتف</FieldLabel>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="07XX XXX XXXX"
                    dir="ltr"
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="city">المدينة / المحافظة</FieldLabel>
                  <Input
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="بغداد، البصرة، أربيل..."
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="address">عنوان التوصيل</FieldLabel>
                  <Textarea
                    id="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="المنطقة، الشارع، أقرب نقطة دالة..."
                    rows={3}
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="notes">ملاحظات (اختياري)</FieldLabel>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="أي ملاحظات إضافية للطلب..."
                    rows={2}
                  />
                </Field>
              </FieldGroup>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image
                        src={item.image_url || '/placeholder.svg'}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm line-clamp-1">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × {item.price.toLocaleString('ar-IQ')} د.ع
                      </p>
                    </div>
                    <p className="font-medium text-sm">
                      {(item.price * item.quantity).toLocaleString('ar-IQ')} د.ع
                    </p>
                  </div>
                ))}

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>المجموع:</span>
                    <span>{getTotal().toLocaleString('ar-IQ')} د.ع</span>
                  </div>
                </div>

                <div className="pt-4">
                  {isFormValid ? (
                    <WhatsAppCheckoutButton
                      name={name}
                      phone={phone}
                      address={address}
                      city={city}
                      notes={notes}
                      items={items}
                      total={getTotal()}
                      onSuccess={handleSuccess}
                    />
                  ) : (
                    <Button className="w-full" size="lg" disabled>
                      أكمل بياناتك لإرسال الطلب
                    </Button>
                  )}
                </div>

                <p className="text-xs text-muted-foreground text-center">
                  سيتم فتح واتساب لإرسال تفاصيل طلبك مباشرة
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
