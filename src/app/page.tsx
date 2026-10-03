import { supabaseClient } from '@/lib/supabase'
import ProductCard from '@/components/ProductCard'
import Cart from '@/components/Cart'

// ISR / SSR configurado
export const revalidate = 60

export default async function Home() {
  const { data: products } = await supabaseClient
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <main className="min-h-screen bg-slate-50 text-slate-800">
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="max-w-6xl mx-auto p-6">
          <h1 className="text-3xl font-black text-pink-600 tracking-tight">Cosméticos de Luxo</h1>
          <p className="text-gray-500">A sua vitrine de beleza e cuidado.</p>
        </div>
      </header>

      <section className="max-w-6xl mx-auto p-6 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products?.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
          {(!products || products.length === 0) && (
            <div className="col-span-full py-20 text-center text-gray-500">
              Nenhum produto cadastrado ainda.
            </div>
          )}
        </div>
      </section>

      <Cart />
    </main>
  )
}
