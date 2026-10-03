import { supabaseAdmin } from '@/lib/supabase'
import { addProduct } from '@/app/actions'
import AdminProductRow from './AdminProductRow'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const { data: products } = await supabaseAdmin
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Painel Administrativo</h1>
          <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm font-medium">
            Área Protegida
          </span>
        </header>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Cadastrar Novo Produto</h2>
          
          <form action={addProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Nome do Produto</label>
              <input name="name" required className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-pink-500" />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Preço (R$)</label>
              <input name="price" type="number" step="0.01" required className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-pink-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Categoria</label>
              <input name="category" className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-pink-500" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Imagem (Upload)</label>
              <input name="image" type="file" accept="image/*" required className="w-full border rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-pink-500" />
            </div>

            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <textarea name="description" rows={3} className="w-full border rounded-lg p-3 outline-none focus:ring-2 focus:ring-pink-500" />
            </div>

            <button type="submit" className="md:col-span-2 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 rounded-lg transition-colors">
              Salvar Novo Produto
            </button>
          </form>
        </section>

        <section className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-6">Produtos Cadastrados</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-sm text-gray-500">
                  <th className="pb-3 px-2">Imagem</th>
                  <th className="pb-3 px-2">Nome</th>
                  <th className="pb-3 px-2">Preço</th>
                  <th className="pb-3 px-2 text-right">Ação</th>
                </tr>
              </thead>
              <tbody>
                {products?.map(product => (
                  <AdminProductRow key={product.id} product={product} />
                ))}
                {(!products || products.length === 0) && (
                  <tr>
                    <td colSpan={4} className="py-8 text-center text-gray-500">
                      Nenhum produto cadastrado ainda.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  )
}

