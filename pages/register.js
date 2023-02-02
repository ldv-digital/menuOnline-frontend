import { useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Register() {
  return (
    <div className={styles.body}>
      <div className={styles.login_body}>
        <div className={styles.login_box}>
          <h2>Crie sua conta</h2>
          <form>
            <div className={styles.input_box}>
              <input required type="text" placeholder="Nome" />
            </div>

            <div className={styles.input_box}>
              <input required type="email" placeholder="Seu Email" />
            </div>

            <div className={styles.input_box}>
              <input
                required
                type="password"
                pattern="[a-z0-9]{1,15}"
                title="A senha deve conter numeros (0 a 9) ou letras (a to z)."
                placeholder="Senha"
              />
            </div>

            <div className={styles.input_box}>
              <input
                required
                type="password"
                pattern="[a-z0-9]{1,15}"
                title="A senha deve conter numeros (0 a 9) ou letras (a to z)."
                placeholder="Confirme sua Senha"
              />
            </div>

            <div>
              <button className={styles.submit}>Cadastrar</button>
            </div>
          </form>

          <div className={styles.login_footer}>
            <div className={styles.terms}>
              <p>
                Esta página é a pagina de cadastro do site Menu Online.
                <br /> Para voltar a pagina inicial: <b />
                <a href="./login">Clique aqui</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
