import { atom } from "nanostores";
import type { Movie } from "@/types/movie";

export type CartItem = { movie: Movie; qty: number };

export const cartStore = atom<CartItem[]>([]);

export const addToCart = (movie: Movie) => {
  const prev = cartStore.get();
  const found = prev.find((item) => item.movie.id === movie.id);

  if (found) {
    cartStore.set(
      prev.map((item) => (item.movie.id === movie.id ? { ...item, qty: item.qty + 1 } : item))
    );
    return;
  }
  cartStore.set([...prev, { movie, qty: 1 }]);
};

export const removeFromCart = (movieId: string) => {
  const prev = cartStore.get();
  cartStore.set(prev.filter((item) => item.movie.id !== movieId));
};

export const clearCart = () => {
  cartStore.set([]);
};

export const changeQty = (movieId: string, qty: number) => {
  if (qty <= 0) {
    removeFromCart(movieId);
    return;
  }

  const prev = cartStore.get();
  cartStore.set(prev.map((item) => (item.movie.id === movieId ? { ...item, qty } : item)));
};

export const getTotal = () => {
  const items = cartStore.get();
  return items.reduce(
    (acc, item) => acc + (item.movie.price || 0) * item.qty,
    0
  );
};

export const getSubTotal = (item: CartItem) => {
  return item.movie.price * item.qty;
};
