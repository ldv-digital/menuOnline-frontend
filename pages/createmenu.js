import { useState, useEffect } from 'react'
import uploadImageS3 from '../services/minio-client'
import { gql } from "@apollo/client";
import client from "../services/apollo-client";
import { getUser } from '../hooks/getUser';
import { Navigation } from '../components/Navigation';
import styles from './createmenu.module.css'


export default function createmenu() {
  const [user, setUser] = useState({});
  const urlMinio = '//' + process.env.NEXT_PUBLIC_MINIO_ENDPOINT + ':' + process.env.NEXT_PUBLIC_MINIO_PORT + '/' + process.env.NEXT_PUBLIC_MINIO_BUCKET;
  const [imgName, setImgName] = useState("");
  const [idMenu, setIdMenu] = useState("");

  useEffect(() => {
    async function fetchData() {
      const data = await getUser()

      if (!data?.id) {
        console.log('usuario não está logado!')
      }
      setUser(data)
    }
    fetchData();
  }, []);

  if (!user.id) {
    return (
      <div>
        Faça Login para criar um menu
      </div>
    );
  }

  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadImageS3(reader.result, file).then(function (resultUpload) {
          if (resultUpload.sucess) {
            const urlMenu = resultUpload?.fileName;
            makeMenu({ urlMenu }).then(({ data }) => {
              const { createMenu } = data
              setIdMenu(createMenu?.id)
              console.log('createMenu', createMenu)
            })
            setImgName(urlMinio + '/' + urlMenu)
          }
        });
      };

      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.body}>
        <div className={styles.box}>
      {idMenu ? (
        <><p>Menu criado com sucesso {idMenu} <a href='/listmenu'>Ver menu</a></p>
          <img src={imgName} />
        </>
      ) : (
        <h2>Selecione uma imagem</h2>
        )}
        <input onChange={onChange} type="file" name="file" />
       </div>
      </div>
    </>
  );
}

async function makeMenu(itemsMenu) {

  const result = await client.mutate({
    mutation: gql`
    mutation createMenu($urlLogo: String, $urlMenu: String, $nameStore: String) {
      createMenu(urlLogo: $urlLogo, urlMenu: $urlMenu, nameStore: $nameStore) {
          id
        userId
        urlLogo
        urlMenu
      }
    }
  `,
    variables: itemsMenu
  })

  return result;
}

