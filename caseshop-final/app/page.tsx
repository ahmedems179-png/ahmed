'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Smartphone, Sticker, Truck, Shield, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ProductCard } from '@/components/ProductCard'
import { products } from '@/lib/products'

export default function HomePage() {
  const featuredProducts = products.slice(0, 4)
  const cases = products.filter(p => p.category === 'iphone_case').slice(0, 2)
  const stickers = products.filter(p => p.category === 'sticker').slice(0, 2)

  return (
    <main>
      {/* Hero Section - Modern & Minimal */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(var(--primary),0.1),transparent_50%)]" />
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                تشكيلة جديدة 2024
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-balance">
                احمِ جهازك
                <span className="text-primary"> بأناقة</span>
              </h1>
              <p className="text-muted-foreground text-base md:text-lg max-w-md">
                كفرات آيفون فاخرة وستيكرات مميزة. جودة عالية، حماية مضمونة، وتصاميم عصرية.
              </p>
              <div className="flex flex-wrap gap-3">
                <Button size="lg" className="gap-2 shadow-lg shadow-primary/25" asChild>
                  <Link href="/products">
                    تسوق الآن
                    <ArrowLeft className="h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/products?category=sticker">
                    الستيكرات
                  </Link>
                </Button>
              </div>
            </div>
            
            {/* Hero Image Grid */}
            <div className="relative hidden md:block">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 p-4 flex items-center justify-center">
                    <Smartphone className="h-24 w-24 text-primary/40" />
                  </div>
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 p-4 flex items-center justify-center">
                    <Sticker className="h-16 w-16 text-accent/60" />
                  </div>
                </div>
                <div className="space-y-4 pt-8">
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 p-4 flex items-center justify-center">
                    <Shield className="h-16 w-16 text-primary/40" />
                  </div>
                  <div className="aspect-[3/4] rounded-2xl bg-gradient-to-br from-accent/20 to-primary/5 p-4 flex items-center justify-center">
                    <Star className="h-20 w-20 text-accent/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="border-y bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Truck className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">توصيل سريع</p>
                <p className="text-xs text-muted-foreground">لجميع المحافظات</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">حماية مضمونة</p>
                <p className="text-xs text-muted-foreground">جودة عالية</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium text-sm">تقييم ممتاز</p>
                <p className="text-xs text-muted-foreground">+500 عميل راضي</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <Sparkles className="h-5 w-5 text-accent" />
              </div>
              <div>
                <p className="font-medium text-sm">تصاميم حصرية</p>
                <p className="text-xs text-muted-foreground">تشكيلة متجددة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold">تصفح منتجاتنا</h2>
            <p className="text-muted-foreground mt-2">اختر الفئة المناسبة لك</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <Link
              href="/products?category=iphone_case"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 p-6 md:p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/20 mb-4">
                  <Smartphone className="h-7 w-7 text-primary" />
                </div>
                <h3 className="font-bold text-xl mb-2">كفرات آيفون</h3>
                <p className="text-muted-foreground text-sm mb-4">حماية فائقة مع تصاميم أنيقة لجميع موديلات آيفون</p>
                <span className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-2 transition-all">
                  تصفح الكفرات
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </span>
              </div>
            </Link>
            
            <Link
              href="/products?category=sticker"
              className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 p-6 md:p-8 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/30 mb-4">
                  <Sticker className="h-7 w-7 text-accent" />
                </div>
                <h3 className="font-bold text-xl mb-2">ستيكرات</h3>
                <p className="text-muted-foreground text-sm mb-4">مجموعات ستيكرات متنوعة لتزيين أجهزتك ومقتنياتك</p>
                <span className="inline-flex items-center text-accent font-medium text-sm group-hover:gap-2 transition-all">
                  تصفح الستيكرات
                  <ArrowLeft className="h-4 w-4 mr-1" />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">الأكثر مبيعاً</h2>
              <p className="text-muted-foreground mt-1">منتجات يحبها عملاؤنا</p>
            </div>
            <Button variant="outline" className="hidden md:flex" asChild>
              <Link href="/products">
                عرض الكل
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="mt-6 text-center md:hidden">
            <Button variant="outline" asChild>
              <Link href="/products">
                عرض جميع المنتجات
                <ArrowLeft className="mr-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-16 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            هل لديك سؤال؟
          </h2>
          <p className="text-primary-foreground/80 mb-6 max-w-md mx-auto">
            تواصل معنا مباشرة عبر واتساب وسنرد عليك بأسرع وقت
          </p>
          <Button
            size="lg"
            variant="secondary"
            className="shadow-lg"
            asChild
          >
            <a
              href="https://wa.me/7845533270?text=مرحبا، لدي استفسار عن منتجاتكم"
              target="_blank"
              rel="noopener noreferrer"
            >
              تواصل عبر واتساب
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
