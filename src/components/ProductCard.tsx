'use client'

import { Product } from '@/types'
import { useCartStore } from '@/store/cartStore'

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem)

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow">
      {product.image_url ? (
        <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-xl mb-4" />
      ) : (
        <div className="w-full h-48 bg-pink-50 rounded-xl mb-4 flex items-center justify-center text-pink-200">
          Sem Imagem
        </div>
      )}
      <h3 className="font-semibold text-gray-800">{product.name}</h3>
      <p className="text-gray-500 text-sm mb-3 h-10 overflow-hidden">{product.description}</p>
      
      <div className="flex items-center justify-between">
        <span className="font-bold text-pink-600">
          R$ {product.price.toFixed(2)}
        </span>
        <button 
          onClick={() => addItem(product)}
          className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-full text-sm font-medium transition-colors"
        >
          Comprar
        </button>
      </div>
    </div>
  )
}
