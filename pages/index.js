import { Navigation } from '../components/Navigation'
import styles from './index.module.css'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <div className={styles.body}>
        <h1>Bem vindo!!! teste </h1>
      </div>
      <Footer />
    </>
  )
}
