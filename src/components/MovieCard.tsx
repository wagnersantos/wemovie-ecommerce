import { useStore } from '@nanostores/react'
import Image from 'next/image'

import type { Movie } from '@/types/movie'
import { addToCart, cartStore } from '@/stores/cartStore'
import { Button } from './ui/button'
import Cart1 from '@/icon/cart_1.svg'
import { cn } from '@/lib/cn'
import { formatCurrencyBRL } from '@/lib/formatCurrencyBRL'

export default function MovieCard({ movie }: { movie: Movie }) {
  const cart = useStore(cartStore)
  const qtdItensByMovie = (id: string) =>
    cart.reduce((acc, item) => item.movie.id === id ? acc + item.qty : acc, 0)
  const valueQtdItens = qtdItensByMovie(movie.id)

  return (
    <article className="bg-white rounded-sm gap-2 p-4 flex flex-col justify-center items-center">
      <img src={movie.image} alt={movie.title} className="w-36.75 object-cover rounded" />
      <h3 className="text-[#333] font-bold text-xs">{movie.title}</h3>
      <span className="font-bold text-[#2F2E41] text-base">{formatCurrencyBRL(movie.price)}</span>
      <Button
        onClick={() => addToCart(movie)}
        className={cn("px-3 py-1 gap-3 text-white rounded w-full cursor-pointer uppercase",
          valueQtdItens && "bg-[#039B00] hover:bg-[#039B00]/80")
        }
      >
        <div className='flex items-center'>
          <Image src={Cart1} alt="Imagem carrinho" className='size-3' />
          <span className='pl-0.5 font-normal text-xs'>{valueQtdItens}</span>
        </div>
        adicionar ao carrinho
      </Button>
    </article>
  )
}