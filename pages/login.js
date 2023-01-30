import { gql } from '@apollo/client'
import { useState } from 'react'
import client from '../services/apollo-client'
import styles from '../styles/Home.module.css'
export default function Login() {
  const [getUser, setUser] = useState('')
  const [getPass, setPass] = useState('')

  function handleLogin() {
    makeLogin(getUser, getPass)
  }

  function handleUser(event) {
    setUser(event.target.value)
  }

  function handlePass(event) {
    setPass(event.target.value)
  }

  return (
    <div className={styles.body}>
      <div className={styles.login_body}>
        <div className={styles.login_box}>
          <h2>Menu Online</h2>
          <form>
            <div className={styles.input_box}>
              <input
                required
                type="email"
                placeholder="Email"
                onChange={handleUser}
              />
            </div>

            <div className={styles.input_box}>
              <input
                required
                type="password"
                placeholder="Senha"
                onChange={handlePass}
              />
            </div>

            <div>
              <button onClick={handleLogin} className={styles.submit}>
                Login
              </button>
            </div>
          </form>

          <div className={styles.support}>
            <div className={styles.remember}>
              <span>
                <input type="checkbox" />
              </span>
              <span>Lembre-se de mim</span>
            </div>
            <div className={styles.help}>
              <a href="#">Precisa de ajuda?</a>
            </div>
          </div>

          <div className={styles.login_footer}>
            <div className={styles.sign_up}>
              <p>
                Novo por aqui? <a href="#">Cadastre-se.</a>
              </p>
            </div>

            <div className={styles.terms}>
              <p>
                Esta página é a pagina de acesso ao site Menu Online.
                <br /> Para mais informações clique em: <b />
                <a href="#">Saiba mais</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

async function makeLogin(user, pass) {
  const result = await client.mutate({
    mutation: gql`
      mutation LoginUser($user: String, $pass: String) {
        getLogin(email: $user, pass: $pass) {
          token
          email
          name
        }
      }
    `,
    variables: { user, pass }
  })

  localStorage.setItem('token', result?.data?.getLogin?.token)
}
