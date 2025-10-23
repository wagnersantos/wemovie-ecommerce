'use client'

import Image from 'next/image'
import { useStore } from '@nanostores/react';

import Cart from '@/icon/cart.svg'
import { cartStore } from '@/stores/cartStore';
import { useRouter } from 'next/navigation';

export const Header = () => {
  const cart = useStore(cartStore)
  const qtdItens = cart.reduce((acc, item) => acc + item.qty, 0)
  const router = useRouter();

  return (
    <header className="flex items-center justify-between py-8">
      <h1
        className="text-lg font-bold cursor-pointer md:text-2xl"
        onClick={() => router.push('/')}
        role="button"        
        aria-label="home"
      >
        WeMovies
      </h1>

      <div
        className="flex items-center gap-2 text-xs cursor-pointer md:text-sm"
        onClick={() => router.push('/cart')}
        role="button"
        aria-label={`Meu Carrinho com ${qtdItens} itens`}
      >
        <div className='flex flex-col'>
          <span className="hidden text-sm sm:inline">Meu Carrinho</span>
          <span className="self-end text-[#999]">{qtdItens} itens</span>
        </div>
        <Image src={Cart} alt="Imagem Carrinho" className='cursor-pointer' />
      </div>
    </header>
  )
}