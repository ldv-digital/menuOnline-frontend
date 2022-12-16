import { useEffect, useState } from 'react'
import { gql } from "@apollo/client";
import client from "../services/apollo-client";
import { useRouter } from 'next/router'

export default function MenuCliente() {

  const [urlMenu, setUrlMenu] = useState('');

  const router = useRouter()
  const { id } = router.query

  useEffect(() => {
    if (id) {
      getMenuById(id).then((value) => {

        const { urlMenu } = value;

        setUrlMenu(urlMenu)

      })
    }
  }, [id])

  return (
    <div>
      <img src={urlMenu} />
    </div>
  );
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
  });

  return data?.getMenu;
}

