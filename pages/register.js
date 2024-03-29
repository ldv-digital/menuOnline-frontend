import { gql } from '@apollo/client'
import client from '../services/apollo-client'
import styles from './register.module.css'
import { useRouter } from 'next/router'
import { Navigation } from '../components/Navigation'
import { Footer } from '../components/footer'

export default function Register() {
  const router = useRouter()
  async function handleRegister(event) {
    event.preventDefault()

    const name = event.target?.name.value
    const email = event.target?.email.value
    const pass = event.target?.password.value
    const rePass = event.target?.rePassword.value
    if (pass != rePass) {
      alert('As senhas não conferem')
      return
    }

    let isRegister = await makeRegister({ name, email, pass })

    if (isRegister) {
      router.push('/account')
    }

    router.push('/register')
  }

  return (
    <>
      <Navigation />
      <div className={styles.body}>
        <div className={styles.login_body}>
          <div className={styles.login_box}>
            <h2>Crie sua conta</h2>
            <form onSubmit={handleRegister}>
              <div className={styles.input_box}>
                <input required type="text" name="name" placeholder="Nome" />
              </div>

              <div className={styles.input_box}>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="Seu Email"
                />
              </div>

              <div className={styles.input_box}>
                <input
                  required
                  type="password"
                  name="password"
                  minLength="8"
                  title="A senha deve conter no minimo 8 caracteres."
                  placeholder="Senha"
                />
              </div>

              <div className={styles.input_box}>
                <input
                  required
                  type="password"
                  name="rePassword"
                  minLength="8"
                  title="A senha deve conter no minimo 8 caracteres."
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
                  Ao clicar em Cadastrar, você concorda com nossos Termos,"
                  <a href="/privacy" rel="noopener noreferrer" target="_blank">
                    Política de Privacidade
                  </a>
                  " e "
                  <a href="/terms" rel="noopener noreferrer" target="_blank">
                    Termos de Uso
                  </a>
                  ".
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

async function makeRegister(variables) {
  const result = await client.mutate({
    mutation: gql`
      mutation createUser($email: String, $pass: String, $name: String) {
        createUser(email: $email, pass: $pass, name: $name) {
          token
        }
      }
    `,
    variables
  })

  let resToken = result?.data?.createUser?.token
  let isvalidToken = resToken ? true : false
  if (isvalidToken) {
    localStorage.setItem('token', resToken)
  }
  return isvalidToken
}
