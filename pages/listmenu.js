import { useEffect, useState } from 'react';
import { gql } from '@apollo/client';
import client from '../services/apollo-client';
import { useRouter } from 'next/router';
import { Navigation } from '../components/Navigation';
import styles from './listmenu.module.css';
import QRCode from 'qrcode';


export default function ListMenu() {
    const urlMinio = '//' + process.env.NEXT_PUBLIC_MINIO_ENDPOINT + ':' + process.env.NEXT_PUBLIC_MINIO_PORT + '/' + process.env.NEXT_PUBLIC_MINIO_BUCKET
    const [Menus, setMenus] = useState([])
    const [linkQr, setLinkQr] = useState('')
    const router = useRouter()


    useEffect(() => {
        listMenuData();
    }, []);

    async function deleteMenu(id) {
        const { data }  = await client.mutate({
            mutation: gql`
            mutation deleteMenu($id: String) {
                deleteMenu(id: $id) {
                    status
              }
            }
          `,
            variables: { id }
        });

        if (parseInt(data?.deleteMenu?.status)) {
            console.log('sucesso');
            listMenuData();
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
        setMenus(data.listMenu);
    }
   

async function generateQRCode(id) {
    const qrCodeUrl = await QRCode.toDataURL('http://191.101.234.188/' + '/' + id, { width: 500 });
    setLinkQr(qrCodeUrl);
  }
  
  return (
    <>
      <Navigation />
      <div className={styles.menuOps}>
        {Menus.map((item) => (
          <div className={styles.me} key={item.id}>
            <img src={urlMinio + '/' + item.urlMenu} width="300" />
            <div className={styles.menuList}>
              <button onClick={() => router.push(item.id)}>Visualizar</button> |

              <button onClick={() => generateQRCode(item.id)}>
              {linkQr ? (
                <a href={linkQr} download={'qr-code.png'}>
                QRcode
              </a>
              ) : (
                <a href={linkQr} download={'qr-code.png'}>
                  QRcode
                </a>
              )
              }

              </button> |
             
             
              <button onClick={() => deleteMenu(item.id)}>Excluir</button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
              
}