import { useState, useEffect } from 'react'
import { getUser } from '../hooks/getUser'
import { Navigation } from '../components/Navigation'
import { useRouter } from 'next/router'
import { gql } from '@apollo/client'
import client from '../services/apollo-client'
import styles from './updateaccount.module.css'

export default function UpdateAccount() {
  const router = useRouter()
  const [user, setUser] = useState({})

  useEffect(() => {
    async function fetchData() {
      const data = await getUser()

      if (!data?.id) {
        console.log('usuario não está logado!')
      }
      setUser(data)
    }
    fetchData()
  }, [])

  async function handleUpdate(event) {
    event.preventDefault()

    const name = event.target?.name.value
    const email = event.target?.email.value
    const pass = event.target?.password.value
    const rePass = event.target?.rePassword.value
    let data = {}

    if (pass && rePass) {
      if (pass != rePass) {
        alert('As senhas não conferem')
        return
      }

      data.pass = pass
    }

    if (name != user?.name) {
      data.name = name
    }

    if (email != user?.email) {
      data.email = email
    }

    let isUpdate = await makeUpdate(data)

    if (isUpdate) {
      router.push('/account')
    }
  }

  async function makeUpdate(variables) {
    const result = await client.mutate({
      mutation: gql`
        mutation updateUser($email: String, $pass: String, $name: String) {
          updateUser(email: $email, pass: $pass, name: $name) {
            pass
          }
        }
      `,
      variables
    })

    const resToken = result?.data?.updateUser?.pass

    return resToken ? true : false
  }

  return (
    <>
    <Navigation />
    <div className={styles.body}>
    <form className={styles.form} onSubmit={handleUpdate}>
      <h2>Atualize suas informações</h2>
      <div className={styles.input_box}>
        <input type="text" name="name" placeholder="Nome" defaultValue={user?.name} />
      </div>

      <div className={styles.input_box}>
        <input
          required
          type="password"
          name="rePassword"
          minLength="8"
          title="A senha deve conter no minimo 8 caracteres."
          placeholder="Nova Senha"
        />
      </div>

      <div className={styles.input_box}>
        <input
          required
          type="password"
          name="rePassword"
          minLength="8"
          title="A senha deve conter no minimo 8 caracteres."
          placeholder="Confirme nova Senha"
        />
      </div>

      <div>
        <button>Atualizar</button>
      </div>
    </form>
    </div>
    </>
  )
}
