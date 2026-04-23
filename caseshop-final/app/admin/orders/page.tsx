import { getOrders } from '@/lib/actions/orders'
import { OrdersTable } from '@/components/admin/OrdersTable'

export const dynamic = 'force-dynamic'

export default async function AdminOrdersPage() {
  const { data: orders } = await getOrders()

  return (
    <main className="py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">إدارة الطلبات</h1>
          <p className="text-muted-foreground mt-2">
            متابعة وإدارة جميع الطلبات الواردة
          </p>
        </div>

        <OrdersTable orders={orders || []} />
      </div>
    </main>
  )
}
