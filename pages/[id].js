import { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import client from '../services/apollo-client'
import { useRouter } from 'next/router'
import { getUser } from '../hooks/getUser';
import { Navigation } from '../components/Navigation';
import styles from '../components/footer/Footer.module.css'


export default function MenuCliente() {
  const urlMinio =
    '//' +
    process.env.NEXT_PUBLIC_MINIO_ENDPOINT +
    ':' +
    process.env.NEXT_PUBLIC_MINIO_PORT +
    '/' +
    process.env.NEXT_PUBLIC_MINIO_BUCKET
  const [urlMenu, setUrlMenu] = useState('')
  const [user, setUser] = useState({})
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    async function fetchData() {
      const data = await getUser()
      setUser(data)
    }
    fetchData();
    if (id) {
      getMenuById(id).then(value => {
        const { urlMenu } = value
        setUrlMenu(urlMinio + '/' + urlMenu)
      })
    }
  }, [id])

  return (
    <div className={styles.body}>
      {(user?.id) && (
        <>
          <Navigation />
          <a className={styles.botao} href="/listmenu">&#11013;</a>
        </>
      )}

      <img src={urlMenu} Style="width: 100%;" />
      <div className={styles.footer}>
        <a href="/register">
          Crie sua conta grátis! Desfrute do acesso ao menu virtual, sem custo
          algum!!
        </a>
      </div>
    </div>
  )
}

async function getMenuById(id_menu) {
  const { data } = await client.query({
    query: gql`
      query Menu($id_menu: ID) {
        getMenu(id: $id_menu) {
          userId
          urlLogo
          urlMenu
        }
      }
    `,
    variables: { id_menu }
  })

  return data?.getMenu
}
