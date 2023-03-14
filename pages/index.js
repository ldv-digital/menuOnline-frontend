import { Navigation } from '../components/Navigation'
import styles from '../styles/Home.module.css'
import { Footer } from '../components/footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <div className={styles.body}>
        <h1>Bem vindo!!!</h1>
        <p>teste CI/CD</p>
      </div>
      <Footer />
    </>
  )
}
