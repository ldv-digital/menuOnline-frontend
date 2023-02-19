import { useEffect, useState } from 'react'
import { gql } from '@apollo/client'
import client from '../services/apollo-client'
import { useRouter } from 'next/router'
import { Navigation } from '../components/Navigation';

export default function ListMenu() {
    const urlMinio = '//' + process.env.NEXT_PUBLIC_MINIO_ENDPOINT + ':' + process.env.NEXT_PUBLIC_MINIO_PORT + '/' + process.env.NEXT_PUBLIC_MINIO_BUCKET
    const [Menus, setMenus] = useState([])
    const router = useRouter()

    useEffect(() => {
        listMenuData().then(menu => {
            setMenus(menu);
        })
    }, [Menus]);

    async function deleteMenu(id) {
        const result = await client.mutate({
            mutation: gql`
            mutation deleteMenu($id: String) {
                deleteMenu(id: $id) {
                    status
              }
            }
          `,
            variables: { id }
        });

        if (result?.status) {
            console.log('sucesso');
            setMenus([]);
        } else {
            console.log('error');
        }

    }

    async function listMenuData() {
        const { data } = await client.query({
            query: gql`
                query listMenu {
                        listMenu {
                            id
                            userId
                            urlLogo
                            urlMenu
                        }
                }
    `,
            fetchPolicy: "no-cache"
        })

        return data.listMenu
    }

    return (<div>
        <Navigation />
        {Menus.map((item) => (
            <div key={item.id}>
                <img src={urlMinio + '/' + item.urlMenu} width="300" />
                <div><button onClick={() => router.push(item.id)}>Visualizar</button> | <button onClick={() => deleteMenu(item.id)}>Excluir</button></div>

                <br></br>
                <br></br>
            </div>
        ))}
    </div>);
}


