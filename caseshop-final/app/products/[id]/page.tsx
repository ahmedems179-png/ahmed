'use client'

import { use, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, Minus, Plus, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ProductCard } from '@/components/ProductCard'
import { WhatsAppProductButton } from '@/components/WhatsAppButton'
import { products } from '@/lib/products'
import { useCartStore } from '@/lib/store'

interface ProductPageProps {
  params: Promise<{ id: string }>
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const product = products.find((p) => p.id === id)
  const [quantity, setQuantity] = useState(1)
  const addItem = useCartStore((state) => state.addItem)

  if (!product) {
    notFound()
  }

  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4)

  const handleAddToCart = () => {
    addItem(product, quantity)
    setQuantity(1)
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
          <Link href="/products" className="hover:text-foreground transition-colors">
            المنتجات
          </Link>
          <ArrowRight className="h-4 w-4" />
          <span className="text-foreground">{product.name}</span>
        </nav>

        {/* Product Details */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <Image
              src={product.image_url || '/placeholder.svg'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            {product.iphone_model && (
              <Badge variant="secondary" className="w-fit mb-4">
                {product.iphone_model}
              </Badge>
            )}
            
            <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
            
            <p className="text-3xl font-bold mt-4">
              {product.price.toLocaleString('ar-IQ')} د.ع
            </p>

            <p className="text-muted-foreground mt-4 leading-relaxed">
              {product.description}
            </p>

            <div className="mt-6 flex items-center gap-4">
              <span className="text-sm font-medium">الكمية:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-3">
              <Button size="lg" className="gap-2" onClick={handleAddToCart}>
                <ShoppingCart className="h-5 w-5" />
                أضف للسلة
              </Button>
              
              <WhatsAppProductButton
                productName={product.name}
                price={product.price}
                quantity={quantity}
              />
            </div>

            <div className="mt-6 p-4 rounded-lg bg-muted/50">
              <p className="text-sm text-muted-foreground">
                ✓ توصيل سريع لجميع المحافظات
                <br />
                ✓ دفع عند الاستلام
                <br />
                ✓ ضمان جودة المنتج
              </p>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold mb-6">منتجات مشابهة</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
