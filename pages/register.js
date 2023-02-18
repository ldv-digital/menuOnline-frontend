import { gql } from '@apollo/client'
import client from '../services/apollo-client'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'

export default function Register() {
  const router = useRouter()
  async function handleRegister(event) {
    event.preventDefault();

    const name = event.target?.name.value;
    const email = event.target?.email.value;
    const pass = event.target?.password.value;
    const rePass = event.target?.rePassword.value;
    if (pass != rePass) {
      alert("As senhas não conferem");
      return;
    }

    let isRegister = await makeRegister({ name, email, pass });

    if (isRegister) {
      router.push('/account')
    }

    router.push('/register')
 
  }

  return (
    <div className={styles.body}>
      <div className={styles.login_body}>
        <div className={styles.login_box}>
          <h2>Crie sua conta</h2>
          <form onSubmit={handleRegister}>
            <div className={styles.input_box}>
              <input required type="text" name="name" placeholder="Nome" />
            </div>

            <div className={styles.input_box}>
              <input required type="email" name="email" placeholder="Seu Email" />
            </div>

            <div className={styles.input_box}>
              <input
                required
                type="password"
                name="password"
                pattern="[a-z0-9]{1,15}"
                title="A senha deve conter numeros (0 a 9) ou letras (a to z)."
                placeholder="Senha"
              />
            </div>

            <div className={styles.input_box}>
              <input
                required
                type="password"
                name="rePassword"
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
  return isvalidToken;
}
