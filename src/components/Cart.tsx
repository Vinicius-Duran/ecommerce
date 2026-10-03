'use client'

import { useCartStore } from '@/store/cartStore'
import { ShoppingBag, X } from 'lucide-react'
import { useState } from 'react'

export default function Cart() {
  const { items, getTotal, removeItem, checkoutWhatsApp } = useCartStore()
  const [isOpen, setIsOpen] = useState(false)

  const itemCount = items.reduce((acc, item) => acc + item.quantity, 0)

  // O número do WhatsApp para receber os pedidos
  const WPP_NUMBER = '5511999999999'

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-pink-600 text-white p-4 rounded-full shadow-lg hover:bg-pink-700 transition-colors flex items-center gap-2 z-40"
      >
        <ShoppingBag size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-white text-pink-600 font-bold w-6 h-6 rounded-full flex items-center justify-center text-xs shadow-sm">
            {itemCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/20 z-50 flex justify-end">
          <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right">
            <div className="p-6 border-b flex justify-between items-center bg-pink-50">
              <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <ShoppingBag /> Seu Carrinho
              </h2>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {items.length === 0 ? (
                <p className="text-gray-500 text-center mt-10">O carrinho está vazio.</p>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex justify-between items-center border-b pb-4">
                    <div>
                      <p className="font-semibold text-gray-800">{item.name}</p>
                      <p className="text-sm text-gray-500">
                        {item.quantity}x R$ {item.price.toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-bold text-gray-800">
                        R$ {(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button onClick={() => removeItem(item.id)} className="text-red-400 hover:text-red-600">
                        <X size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t bg-gray-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-lg font-semibold text-gray-600">Total:</span>
                  <span className="text-2xl font-bold text-pink-600">R$ {getTotal().toFixed(2)}</span>
                </div>
                <button 
                  onClick={() => checkoutWhatsApp(WPP_NUMBER)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-xl font-bold text-lg transition-colors flex justify-center items-center gap-2"
                >
                  Finalizar no WhatsApp
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
