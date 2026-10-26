import { describe, it, expect, beforeEach } from 'vitest'
import {
  cartStore,
  addToCart,
  removeFromCart,
  clearCart,
  changeQty,
  getTotal,
  getSubTotal,
  type CartItem,
} from '@/stores/cartStore'
import type { Movie } from '@/types/movie'

const movieA: Movie = { id: '1', title: 'Filme A', image: '/a.jpg', price: 29.99 }
const movieB: Movie = { id: '2', title: 'Filme B', image: '/b.jpg', price: 9.99 }

describe('cartStore', () => {
  beforeEach(() => {
    cartStore.set([])
  })

  describe('addToCart', () => {
    it('adds a new item with qty 1', () => {
      addToCart(movieA)

      const items = cartStore.get()
      expect(items).toHaveLength(1)
      expect(items[0].movie.id).toBe('1')
      expect(items[0].qty).toBe(1)
    })

    it('increments qty for an existing item', () => {
      addToCart(movieA)
      addToCart(movieA)

      const items = cartStore.get()
      expect(items).toHaveLength(1)
      expect(items[0].qty).toBe(2)
    })

    it('keeps separate entries for different movies', () => {
      addToCart(movieA)
      addToCart(movieB)

      const items = cartStore.get()
      expect(items).toHaveLength(2)
      expect(items[0].movie.id).toBe('1')
      expect(items[1].movie.id).toBe('2')
    })
  })

  describe('removeFromCart', () => {
    it('removes the correct item by id', () => {
      addToCart(movieA)
      addToCart(movieB)
      removeFromCart('1')

      const items = cartStore.get()
      expect(items).toHaveLength(1)
      expect(items[0].movie.id).toBe('2')
    })

    it('does nothing when removing a non-existent id', () => {
      addToCart(movieA)
      removeFromCart('999')

      expect(cartStore.get()).toHaveLength(1)
    })
  })

  describe('clearCart', () => {
    it('resets the cart to an empty array', () => {
      addToCart(movieA)
      addToCart(movieB)
      clearCart()

      expect(cartStore.get()).toEqual([])
    })
  })

  describe('changeQty', () => {
    it('updates the quantity of an existing item', () => {
      addToCart(movieA)
      changeQty('1', 5)

      expect(cartStore.get()[0].qty).toBe(5)
    })

    it('removes the item when qty is set to 0', () => {
      addToCart(movieA)
      changeQty('1', 0)

      expect(cartStore.get()).toHaveLength(0)
    })

    it('removes the item when qty is negative', () => {
      addToCart(movieA)
      changeQty('1', -1)

      expect(cartStore.get()).toHaveLength(0)
    })

    it('does not affect other items', () => {
      addToCart(movieA)
      addToCart(movieB)
      changeQty('1', 10)

      expect(cartStore.get()[0].qty).toBe(10)
      expect(cartStore.get()[1].qty).toBe(1)
    })
  })

  describe('getTotal', () => {
    it('returns 0 for an empty cart', () => {
      expect(getTotal()).toBe(0)
    })

    it('calculates the total for a single item', () => {
      addToCart(movieA)
      changeQty('1', 3)

      expect(getTotal()).toBeCloseTo(29.99 * 3)
    })

    it('calculates the total for multiple items', () => {
      addToCart(movieA)
      addToCart(movieB)
      changeQty('2', 2)

      expect(getTotal()).toBeCloseTo(29.99 + 9.99 * 2)
    })
  })

  describe('getSubTotal', () => {
    it('returns price * qty for a cart item', () => {
      const item: CartItem = { movie: movieA, qty: 3 }

      expect(getSubTotal(item)).toBeCloseTo(29.99 * 3)
    })

    it('returns 0 for qty of 0', () => {
      const item: CartItem = { movie: movieA, qty: 0 }

      expect(getSubTotal(item)).toBe(0)
    })
  })
})
