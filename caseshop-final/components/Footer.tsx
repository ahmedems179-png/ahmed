import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground font-bold text-lg">
                C
              </div>
              <span className="text-xl font-bold">CaseShop</span>
            </Link>
            <p className="text-muted-foreground text-sm max-w-sm">
              متجرك المفضل لكفرات الآيفون والستيكرات المميزة. جودة عالية وتصاميم حصرية مع توصيل سريع لجميع المحافظات.
            </p>
            <a 
              href="https://wa.me/7845533270"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-sm text-primary hover:underline"
            >
              <MessageCircle className="h-4 w-4" />
              تواصل معنا عبر واتساب
            </a>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4">روابط سريعة</h4>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                الرئيسية
              </Link>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                جميع المنتجات
              </Link>
              <Link href="/products?category=iphone_case" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                كفرات آيفون
              </Link>
              <Link href="/products?category=sticker" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                الستيكرات
              </Link>
            </nav>
          </div>
          
          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">تواصل معنا</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>واتساب: 7845533270</p>
              <p>التوصيل: لجميع المحافظات</p>
              <p>الدفع: عند الاستلام</p>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            جميع الحقوق محفوظة CaseShop 2024
          </p>
        </div>
      </div>
    </footer>
  )
}
