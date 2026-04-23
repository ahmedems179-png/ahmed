'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ShoppingCart, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useCartStore, Product } from '@/lib/store'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem)

  const hasDiscount = product.original_price && product.original_price > product.price
  const discountPercentage = hasDiscount 
    ? Math.round((1 - product.price / product.original_price!) * 100)
    : 0

  return (
    <Card className="group overflow-hidden border-0 shadow-sm hover:shadow-lg transition-all duration-300 bg-card">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-muted/30">
          <Image
            src={product.image_url || '/placeholder.svg'}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 right-2 flex flex-col gap-1">
            {hasDiscount && (
              <Badge className="bg-destructive text-destructive-foreground text-[10px] px-1.5">
                -{discountPercentage}%
              </Badge>
            )}
            {product.iphone_model && (
              <Badge variant="secondary" className="text-[10px] px-1.5">
                {product.iphone_model}
              </Badge>
            )}
          </div>
          
          {/* Quick Add Button */}
          <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              className="w-full gap-1 text-xs shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                addItem(product)
              }}
            >
              <Plus className="h-3.5 w-3.5" />
              أضف للسلة
            </Button>
          </div>
        </div>
      </Link>
      
      <CardContent className="p-3 md:p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-sm md:text-base line-clamp-2 hover:text-primary transition-colors min-h-[2.5rem]">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-2 mt-2">
          <p className="text-base md:text-lg font-bold text-primary">
            {product.price.toLocaleString('ar-IQ')}
            <span className="text-xs font-normal text-muted-foreground mr-1">د.ع</span>
          </p>
          {hasDiscount && (
            <p className="text-xs text-muted-foreground line-through">
              {product.original_price!.toLocaleString('ar-IQ')}
            </p>
          )}
        </div>
        
        {/* Mobile Add Button */}
        <Button
          size="sm"
          variant="outline"
          className="w-full mt-3 gap-1 text-xs md:hidden"
          onClick={() => addItem(product)}
        >
          <ShoppingCart className="h-3.5 w-3.5" />
          أضف للسلة
        </Button>
      </CardContent>
    </Card>
  )
}
