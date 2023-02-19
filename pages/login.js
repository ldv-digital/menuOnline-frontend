import { gql } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import client from '../services/apollo-client'
import styles from '../styles/Home.module.css'
import { Navigation } from '../components/Navigation';
import { getUser } from '../hooks/getUser';

export default function Login() {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')
  const [loginError, setLoginError] = useState(false)
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const data = await getUser()

      if (data?.id) {
        router.push('/account');
      }
    }
    fetchData();
  }, []);

  async function handleLogin(event) {
    event.preventDefault()
    let loginOk = await makeLogin(user, pass)
    if (loginOk) {
      router.push('/account');
    } else {
      setLoginError(true)
    }
  }

  function handleUser(event) {
    setUser(event.target.value)
  }

  function handlePass(event) {
    setPass(event.target.value)
  }

  function DivError() {
    return <div className={styles.error_message}>Usuario Não encontrado!!!</div>
  }

  const _onReady = event => {
    console.log(event)
  }

  return (
    <div className={styles.body}>
      <Navigation />
      {loginError ? <DivError /> : null}
      <div className={styles.login_body}>
        <div className={styles.login_box}>
          <h2>Menu Online</h2>
          <form onSubmit={handleLogin}>
            <div className={styles.input_box}>
              <input
                className={loginError ? styles.ativo : null}
                id="inputBox"
                required
                type="email"
                placeholder="Email"
                onChange={handleUser}
              />
            </div>

            <div className={styles.input_box}>
              <input
                className={loginError ? styles.ativo : null}
                required
                type="password"
                placeholder="Senha"
                onChange={handlePass}
              />
            </div>

            <div>
              <button type="submit" value="submit" className={styles.submit}>
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
                Novo por aqui? <a href="./register">Cadastre-se.</a>
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
  let resToken = result?.data?.getLogin?.token
  let isvalidToken = resToken ? true : false
  if (isvalidToken) {
    localStorage.setItem('token', resToken)
  }
  return isvalidToken
}
