/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import { useStore } from '@nanostores/react'
import { useRouter } from 'next/navigation'
import CartPage from '@/app/cart/page'
import { removeFromCart, changeQty, getTotal, getSubTotal } from '@/stores/cartStore'

vi.mock('@nanostores/react', () => ({
  useStore: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: any) => {
    return <img {...props} alt={props.alt || "mocked image"} />;
  },
}));

vi.mock('@/components/ShowState', () => ({
  __esModule: true,
  default: () => <div data-testid="empty-state">Empty</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, ...props }: any) => (
    <button data-testid="button" {...props}>{children}</button>
  ),
}));

vi.mock('@/stores/cartStore', () => ({
  cartStore: {},
  removeFromCart: vi.fn(),
  changeQty: vi.fn(),
  getTotal: vi.fn(),
  getSubTotal: vi.fn(),
}));

vi.mock('@/lib/formatCurrencyBRL', () => ({
  formatCurrencyBRL: (value: number) => `R$ ${value.toFixed(2)}`,
}));

describe('Tests cart page', () => {
  const push = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useRouter as any).mockReturnValue({ push });
  })

  it('should render the empty state when the cart is empty', () => {
    (useStore as any).mockReturnValue([]);

    render(<CartPage />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  })

  it('should render the items in the cart', () => {
    const mockItems = [
      { movie: { id: 1, title: 'Filme A', image: '/img.jpg', price: 10 }, qty: 2 },
      { movie: { id: 2, title: 'Filme B', image: '/img2.jpg', price: 20 }, qty: 1 },
    ];

    (useStore as any).mockReturnValue(mockItems);
    (getSubTotal as any).mockImplementation(({ movie, qty }: any) => movie.price * qty);
    (getTotal as any).mockReturnValue(40);

    render(<CartPage />);

    expect(screen.getByText('Filme A')).toBeInTheDocument();
    expect(screen.getByText('Filme B')).toBeInTheDocument();
    expect(screen.getByText('R$ 40.00')).toBeInTheDocument();
  })

  it('should call removeFromCart when clicking on the remove icon', () => {
    const mockItems = [
      { movie: { id: 1, title: 'Filme A', image: '/img.jpg', price: 10 }, qty: 2 },
    ];
    (useStore as any).mockReturnValue(mockItems);
    (getSubTotal as any).mockReturnValue(20);
    (getTotal as any).mockReturnValue(20);

    render(<CartPage />);

    const removeIcon = screen.getByAltText('Imagem lixeira');
    fireEvent.click(removeIcon);

    expect(removeFromCart).toHaveBeenCalledWith(1);
  })

  it('should call changeQty when clicking the + and - buttons', () => {
    const mockItems = [
      { movie: { id: 1, title: 'Filme A', image: '/img.jpg', price: 10 }, qty: 2 },
    ];
    (useStore as any).mockReturnValue(mockItems);
    (getSubTotal as any).mockReturnValue(20);
    (getTotal as any).mockReturnValue(20);

    render(<CartPage />);

    const addIcon = screen.getByAltText('Imagem aumentar');
    const minusIcon = screen.getByAltText('Imagem diminuir');

    fireEvent.click(addIcon);
    expect(changeQty).toHaveBeenCalledWith(1, 3);

    fireEvent.click(minusIcon);
    expect(changeQty).toHaveBeenCalledWith(1, 1);
  })

  it('should redirect when clicking on finalize order', () => {
    const mockItems = [
      { movie: { id: 1, title: 'Filme A', image: '/img.jpg', price: 10 }, qty: 1 },
    ];
    (useStore as any).mockReturnValue(mockItems);
    (getSubTotal as any).mockReturnValue(10);
    (getTotal as any).mockReturnValue(10);

    render(<CartPage />);

    fireEvent.click(screen.getByTestId('button'));

    expect(push).toHaveBeenCalledWith('/confirmed');
  })
})
