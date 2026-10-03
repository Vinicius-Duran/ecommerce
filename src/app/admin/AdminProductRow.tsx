'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { deleteProduct, editProduct } from '@/app/actions'

export default function AdminProductRow({ product }: { product: Product }) {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  if (isEditing) {
    return (
      <tr className="bg-pink-50/50">
        <td colSpan={4} className="p-4">
          <form action={async (formData) => {
            setIsLoading(true)
            await editProduct(formData)
            setIsLoading(false)
            setIsEditing(false)
          }} className="space-y-4">
            <input type="hidden" name="id" value={product.id} />
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Nome</label>
                <input name="name" defaultValue={product.name} required className="w-full border rounded-lg p-2 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Preço</label>
                <input name="price" type="number" step="0.01" defaultValue={product.price} required className="w-full border rounded-lg p-2 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Categoria</label>
                <input name="category" defaultValue={product.category || ''} className="w-full border rounded-lg p-2 outline-none" />
              </div>
              <div>
                <label className="text-xs font-semibold text-gray-600 uppercase">Nova Imagem (Opcional)</label>
                <input name="image" type="file" accept="image/*" className="w-full border rounded-lg p-1.5 outline-none bg-white" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-gray-600 uppercase">Descrição</label>
                <textarea name="description" rows={2} defaultValue={product.description || ''} className="w-full border rounded-lg p-2 outline-none" />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <button 
                type="button" 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </form>
        </td>
      </tr>
    )
  }

  return (
    <tr className="hover:bg-gray-50 border-b">
      <td className="py-3 px-2">
        {product.image_url ? (
          <img src={product.image_url} alt="" className="w-12 h-12 object-cover rounded-md shadow-sm" />
        ) : (
          <div className="w-12 h-12 bg-pink-100 rounded-md flex items-center justify-center text-pink-300 text-xs">Sem foto</div>
        )}
      </td>
      <td className="py-3 px-2 font-medium text-gray-800">{product.name}</td>
      <td className="py-3 px-2 text-gray-600 font-semibold">R$ {product.price.toFixed(2)}</td>
      <td className="py-3 px-2 text-right space-x-3">
        <button 
          onClick={() => setIsEditing(true)}
          className="text-blue-500 hover:text-blue-700 font-medium text-sm transition-colors"
        >
          Editar
        </button>
        <button 
          onClick={async () => {
            if (confirm('Tem certeza que deseja excluir?')) {
              await deleteProduct(product.id)
            }
          }}
          className="text-red-500 hover:text-red-700 font-medium text-sm transition-colors"
        >
          Excluir
        </button>
      </td>
    </tr>
  )
}
