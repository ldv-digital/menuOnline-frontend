import { Navigation } from '../components/Navigation'
import Image from 'next/image'
import styles from './index.module.css'
import img from '../public/img.jpeg'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <div className={styles.body}>

        <div className={styles.home}>

          <h2 className={styles.animeLeft}>
            "aaaaaaaaaaaaaaaaaa Seja {'bem-vindo(a)'} ao Menu Online! Aqui você encontrará uma maneira fácil
            e prática para que os donos de bares e restaurantes possam hospedar uma
            imagem do cardápio online. Com o nosso serviço, você poderá compartilhar
            o seu cardápio com seus clientes de forma rápida e eficiente, evitando a
            impressão de cardápios físicos e ajudando na preservação do meio ambiente.
            Navegue pelo nosso site e descubra como é simples ter o seu cardápio online.
            Cadastre-se agora e comece a aproveitar todas as vantagens que oferecemos
            para o seu negócio! "
          </h2>
          <div className={`${styles.imagens} ${styles.animeRight}`}>
            <Image src={img} alt="imagem ilustrativa de um cardapio" />
          </div>

        </div>
      </div>
      <Footer />
    </>
  )
}
