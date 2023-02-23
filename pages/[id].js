import { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import client from '../services/apollo-client'
import { useRouter } from 'next/router'
import { Footer } from '../components/footer'
import styles from '../styles/Home.module.css'

export default function MenuCliente() {
  const urlMinio =
    '//' +
    process.env.NEXT_PUBLIC_MINIO_ENDPOINT +
    ':' +
    process.env.NEXT_PUBLIC_MINIO_PORT +
    '/' +
    process.env.NEXT_PUBLIC_MINIO_BUCKET
  const [urlMenu, setUrlMenu] = useState('')
  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      getMenuById(id).then(value => {
        const { urlMenu } = value
        setUrlMenu(urlMinio + '/' + urlMenu)
      })
    }
  }, [id])

  return (
    <div className={styles.cardapio}>
      <img src={urlMenu} Style="width: 100%;" />
      <Footer />
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
