import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { CartItem, Product } from '@/types'

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  openCart: () => void;
  closeCart: () => void;
  checkoutWhatsApp: (phoneNumber: string) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      
      openCart: () => set({ isOpen: true }),
      closeCart: () => set({ isOpen: false }),

      addItem: (product) => set((state) => {
        const existingItem = state.items.find(item => item.id === product.id);
        if (existingItem) {
          return {
            items: state.items.map(item => 
              item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
            ),
            isOpen: true
          }
        }
        return { items: [...state.items, { ...product, quantity: 1 }], isOpen: true }
      }),

      removeItem: (productId) => set((state) => ({
        items: state.items.filter(item => item.id !== productId)
      })),

      clearCart: () => set({ items: [] }),

      getTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },

      checkoutWhatsApp: (phoneNumber) => {
        const { items, getTotal } = get();
        if (items.length === 0) return;

        let message = `🛍️ *Novo Pedido - Sandra Cosméticos*\n\n`;
        message += `*Itens do Pedido:*\n`;
        items.forEach(item => {
          message += `▪️ ${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}\n`;
        });
        
        message += `\n💰 *Total da Compra: R$ ${getTotal().toFixed(2)}*`;
        message += `\n\nPor favor, aguardo as instruções para pagamento e entrega!`;
        
        const encodedMessage = encodeURIComponent(message);
        window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ items: state.items }), // Salva apenas os itens no localStorage
    }
  )
)
