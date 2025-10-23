'use client'

import { useEffect } from 'react'

import { clearCart } from '@/stores/cartStore'
import ConfirmedState from '@/components/ShowState'
import ConfirmedImg from '@/icon/confirmed.svg'

export default function Confirmed() {
  useEffect(() => { clearCart() }, [])

  return (
    <ConfirmedState
      text="Compra realizada com sucesso!"
      imageToLoad={ConfirmedImg}
      textButton='voltar'
    />
  )
}