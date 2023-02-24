import React from 'react'
import footer from './Footer.module.css'

export const Footer = () => {
  return (
    <div className={footer.footer}>
      <a href="/register">
        Crie sua conta grátis! Desfrute do acesso ao menu virtual, sem custo
        algum!
      </a>
    </div>
  )
}
