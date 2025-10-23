'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useStore } from '@nanostores/react'

import EmptyState from '@/components/ShowState'
import { Button } from '@/components/ui/button'

import Remove from '@/icon/remove.svg'
import Minus from '@/icon/minus.svg'
import Add from '@/icon/add.svg'

import { cartStore, removeFromCart, changeQty, getTotal, getSubTotal } from '@/stores/cartStore'
import { formatCurrencyBRL } from '@/lib/formatCurrencyBRL'
import { cn } from '@/lib/cn'

export default function CartPage() {
  const route = useRouter()
  const items = useStore(cartStore)

  if (items.length === 0) return <EmptyState />

  return (
    <div className="p-4 bg-white rounded-sm">
      <ul className='space-y-4'>
        {items.map(({ movie, qty }, index) => (
          <li key={movie.id} className="flex items-center w-full gap-4 md:relative md:flex-row md:justify-between">
            {/* Coluna Produto */}
            <div className="flex flex-col">
              <p className={cn("hidden md:inline uppercase font-bold text-xs text-[#999] pb-7",
                index > 0 && 'md:hidden')
              }
              >
                produto
              </p>
              <img src={movie.image} className="object-cover w-16 rounded" />
            </div>

            <div className="flex flex-col w-full md:flex-row md:items-center">
              <div className='flex items-center justify-between w-full md:flex-col md:items-start md:w-48'>
                <h3 className="font-bold text-sm text-[#2F2E41] pr-6 md:pr-0 md:whitespace-nowrap">
                  {movie.title}
                </h3>

                <div className='flex items-center gap-4'>
                  <p className="font-bold text-base text-[#2F2E41]">
                    {formatCurrencyBRL(movie.price)}
                  </p>
                  <Image
                    src={Remove}
                    alt="Imagem lixeira"
                    onClick={() => removeFromCart(movie.id)}
                    className='cursor-pointer md:absolute md:right-0 md:-mt-5'
                  />
                </div>
              </div>

              {/* Coluna Quantidade e Subtotal */}
              <div className="flex items-center justify-between w-full gap-2 mt-2 md:mt-0 md:justify-around">
                <div className='flex flex-col'>
                  <p className={
                    cn("hidden md:inline uppercase font-bold text-xs text-[#999] md:absolute md:top-0",
                      index > 0 && 'md:hidden')
                  }
                  >
                    qtd
                  </p>
                  <div className="flex items-center">
                    <Image src={Minus} alt="Imagem diminuir" onClick={() => changeQty(movie.id, qty - 1)} className='cursor-pointer' />
                    <div className="flex items-center justify-center min-w-14.75 px-3 py-0.5 border border-[#D9D9D9] rounded-sm mx-2.75">
                      <span className='font-normal text-sm text-[#2F2E41]'>
                        {qty}
                      </span>
                    </div>
                    <Image src={Add} alt="Imagem aumentar" onClick={() => changeQty(movie.id, qty + 1)} className='cursor-pointer' />
                  </div>
                </div>

                <div className='flex flex-col items-center'>
                  <div>
                    <p className={cn("uppercase font-bold text-xs text-[#999] md:absolute md:top-0", index > 0 && "md:hidden")}>subtotal</p>
                    <p className="uppercase font-bold text-base text-[#2F2E41]">
                      {formatCurrencyBRL(getSubTotal({ movie, qty }))}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Total */}
      <div className="flex flex-col md:flex-row-reverse items-center mt-6 gap-4  border-t border-[#999999] w-full pt-5.25">
        <div className='flex items-center justify-between w-full md:justify-end'>
          <p className="font-bold text-sm text-[#999] md:pr-6">Total</p>
          <p className="font-bold text-2xl text-[#2F2E41]">
            {formatCurrencyBRL(getTotal())}
          </p>
        </div>
        <Button
          onClick={() => route.push('/confirmed')}
          className='w-full md:w-43.25 gap-3 px-3 py-1 text-white uppercase rounded cursor-pointer'>
          finalizar pedido
        </Button>
      </div>
    </div>
  )
}