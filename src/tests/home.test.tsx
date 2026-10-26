import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import { useRouter } from 'next/navigation'
import HomePage from '@/app/page'
import { useMovies } from '@/hooks/useMovies'
import { cartStore, clearCart } from '@/stores/cartStore'
import type { Movie } from '@/types/movie'

vi.mock('@/hooks/useMovies', () => ({
  useMovies: vi.fn(),
}))

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}))

vi.mock('next/image', () => ({
  __esModule: true,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  default: ({ src, alt, fill, ...props }: any) => {
    const resolvedSrc = typeof src === 'object' && src?.src ? src.src : src
    return <img src={resolvedSrc} alt={alt || ''} data-fill={fill ? 'true' : undefined} {...props} />
  },
}))

describe('Home Page', () => {
  const mockPush = vi.fn()

  const mockMovies: Movie[] = [
    {
      id: '1',
      title: 'Viúva Negra',
      price: 9.99,
      image: 'https://wefit-react-web-test.s3.amazonaws.com/viuva-negra.png',
    },
    {
      id: '2',
      title: 'Shang-Chi',
      price: 30.99,
      image: 'https://wefit-react-web-test.s3.amazonaws.com/shang-chi.png',
    },
    {
      id: '3',
      title: 'Homem-Aranha',
      price: 29.9,
      image: 'https://wefit-react-web-test.s3.amazonaws.com/spider-man.png',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
    clearCart()
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    } as unknown as ReturnType<typeof useRouter>)
  })

  it('renders loading state when movies are being fetched', () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: [],
      isLoading: true,
      error: undefined,
    })

    const { container } = render(<HomePage />)

    // Verify loading spinner is present
    const spinner = container.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()

    // Neither movie cards nor empty state messages should be shown
    expect(screen.queryByText('Viúva Negra')).not.toBeInTheDocument()
    expect(screen.queryByText(/parece que não há nada/i)).not.toBeInTheDocument()
  })

  it('renders movies successfully when API returns data', () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: mockMovies,
      isLoading: false,
      error: undefined,
    })

    render(<HomePage />)

    // Verify movie titles are rendered
    expect(screen.getByText('Viúva Negra')).toBeInTheDocument()
    expect(screen.getByText('Shang-Chi')).toBeInTheDocument()
    expect(screen.getByText('Homem-Aranha')).toBeInTheDocument()

    // Verify formatted currency prices (Brazilian Real BRL)
    expect(screen.getByText('R$ 9,99')).toBeInTheDocument()
    expect(screen.getByText('R$ 30,99')).toBeInTheDocument()
    expect(screen.getByText('R$ 29,90')).toBeInTheDocument()

    // Verify posters are rendered with accessible alt text
    expect(screen.getByAltText('Viúva Negra')).toBeInTheDocument()
    expect(screen.getByAltText('Shang-Chi')).toBeInTheDocument()
    expect(screen.getByAltText('Homem-Aranha')).toBeInTheDocument()

    // Verify add to cart buttons
    const addButtons = screen.getAllByRole('button', { name: /adicionar ao carrinho/i })
    expect(addButtons).toHaveLength(3)
  })

  it('renders error state with retry option when API fails', () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: [],
      isLoading: false,
      error: new Error('Failed to fetch movies from API'),
    })

    render(<HomePage />)

    // Verifies customized error message is rendered
    expect(screen.getByText('Ops! Ocorreu um erro ao carregar os filmes.')).toBeInTheDocument()

    // Verifies retry button is available and triggers navigation
    const retryButton = screen.getByRole('button', { name: /tentar novamente/i })
    expect(retryButton).toBeInTheDocument()

    fireEvent.click(retryButton)
    expect(mockPush).toHaveBeenCalledWith('/')

    // Movie cards should not be displayed
    expect(screen.queryByText('Viúva Negra')).not.toBeInTheDocument()
  })

  it('renders empty state when API returns an empty list', () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: [],
      isLoading: false,
      error: undefined,
    })

    render(<HomePage />)

    // Verifies default empty state text is rendered
    expect(screen.getByText('Parece que não há nada por aqui :(')).toBeInTheDocument()

    // Verifies reload page button is displayed and navigates to '/'
    const reloadButton = screen.getByRole('button', { name: /recarregar página/i })
    expect(reloadButton).toBeInTheDocument()

    fireEvent.click(reloadButton)
    expect(mockPush).toHaveBeenCalledWith('/')

    // Movie cards should not be displayed
    expect(screen.queryByText('Viúva Negra')).not.toBeInTheDocument()
  })

  it('adds movie to cart and increments quantity on button click', () => {
    vi.mocked(useMovies).mockReturnValue({
      movies: mockMovies,
      isLoading: false,
      error: undefined,
    })

    render(<HomePage />)

    const buttons = screen.getAllByRole('button', { name: /adicionar ao carrinho/i })
    const firstMovieButton = buttons[0]

    // Initial state: 0 items in cart for this movie
    expect(firstMovieButton).toHaveTextContent('0')
    expect(cartStore.get()).toHaveLength(0)

    // First click: adds movie with qty 1
    fireEvent.click(firstMovieButton)

    expect(cartStore.get()).toHaveLength(1)
    expect(cartStore.get()[0]).toEqual({
      movie: mockMovies[0],
      qty: 1,
    })
    expect(firstMovieButton).toHaveTextContent('1')

    // Second click: increments qty to 2
    fireEvent.click(firstMovieButton)

    expect(cartStore.get()).toHaveLength(1)
    expect(cartStore.get()[0].qty).toBe(2)
    expect(firstMovieButton).toHaveTextContent('2')

    // Adding second movie updates independent count
    const secondMovieButton = buttons[1]
    expect(secondMovieButton).toHaveTextContent('0')

    fireEvent.click(secondMovieButton)
    expect(secondMovieButton).toHaveTextContent('1')
    expect(cartStore.get()).toHaveLength(2)
  })
})
