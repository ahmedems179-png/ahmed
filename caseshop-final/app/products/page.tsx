'use client'

import { useState, useMemo, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { ProductCard } from '@/components/ProductCard'
import { products, iphoneModels } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Smartphone, Sticker, LayoutGrid, SlidersHorizontal } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type Category = 'all' | 'iphone_case' | 'sticker'

function ProductsContent() {
  const searchParams = useSearchParams()
  const initialCategory = (searchParams.get('category') as Category) || 'all'
  
  const [category, setCategory] = useState<Category>(initialCategory)
  const [iphoneModel, setIphoneModel] = useState<string>('all')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category
      const matchesModel = iphoneModel === 'all' || product.iphone_model === iphoneModel
      return matchesCategory && matchesModel
    })
  }, [category, iphoneModel])

  const categoryButtons = [
    { key: 'all' as Category, label: 'الكل', icon: LayoutGrid },
    { key: 'iphone_case' as Category, label: 'كفرات آيفون', icon: Smartphone },
    { key: 'sticker' as Category, label: 'ستيكرات', icon: Sticker },
  ]

  return (
    <main className="py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">جميع المنتجات</h1>
          <p className="text-muted-foreground">
            {filteredProducts.length} منتج متوفر
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8 p-4 rounded-2xl bg-muted/30">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <SlidersHorizontal className="h-4 w-4" />
            <span>تصفية:</span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categoryButtons.map(({ key, label, icon: Icon }) => (
              <Button
                key={key}
                variant={category === key ? 'default' : 'outline'}
                size="sm"
                className="gap-2"
                onClick={() => setCategory(key)}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Button>
            ))}
          </div>

          {category !== 'sticker' && (
            <Select value={iphoneModel} onValueChange={setIphoneModel}>
              <SelectTrigger className="w-[180px] bg-background">
                <SelectValue placeholder="موديل الآيفون" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">جميع الموديلات</SelectItem>
                {iphoneModels.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-muted/20 rounded-2xl">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                <LayoutGrid className="h-8 w-8 text-muted-foreground" />
              </div>
            </div>
            <p className="text-muted-foreground text-lg">لا توجد منتجات تطابق البحث</p>
            <Button 
              variant="link" 
              onClick={() => {
                setCategory('all')
                setIphoneModel('all')
              }}
            >
              عرض جميع المنتجات
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}

export default function ProductsPage() {
  return (
    <Suspense fallback={
      <main className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded w-48 mb-8"></div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[1,2,3,4].map(i => (
                <div key={i} className="aspect-square bg-muted rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </main>
    }>
      <ProductsContent />
    </Suspense>
  )
}
