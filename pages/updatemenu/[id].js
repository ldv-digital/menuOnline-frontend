import { useState, useEffect } from 'react'
import uploadImageS3 from '../../services/minio-client'
import { gql } from "@apollo/client";
import client from "../../services/apollo-client";
import { getUser } from '../../hooks/getUser';
import { Navigation } from '../../components/Navigation';
import { useRouter } from 'next/router';

export default function UpdateMenu() {
  const [user, setUser] = useState({});
  const urlMinio = '//' + process.env.NEXT_PUBLIC_MINIO_ENDPOINT + ':' + process.env.NEXT_PUBLIC_MINIO_PORT + '/' + process.env.NEXT_PUBLIC_MINIO_BUCKET;
  const [imgName, setImgName] = useState("");
  const [idMenu, setIdMenu] = useState("");
  const router = useRouter();
  const { id } = router.query;

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
            makeUpdate({ id, urlMenu }).then(({ data }) => {
              const { updateMenu } = data;
              setIdMenu(updateMenu?.id);
              console.log('updateMenu', updateMenu);
            })
            setImgName(urlMinio + '/' + urlMenu);
          }
        });
      };

      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  return (
    <div>
      <Navigation />
      <p>Você esta editando o menu: {id}</p>
      <input onChange={onChange} type="file" name="file" />
      {idMenu ? (
        <><p>Menu atualizado com sucesso {idMenu}</p>
          <p><img src={imgName} /></p>
        </>
      ) : (
        <>Selecione uma imagem</>
      )}
    </div>
  );
}

async function makeUpdate(itemsMenu) {

  const result = await client.mutate({
    mutation: gql`
    mutation updateMenu($id: String,$urlLogo: String, $urlMenu: String, $nameStore: String) {
      updateMenu(id: $id, urlLogo: $urlLogo, urlMenu: $urlMenu, nameStore: $nameStore) {
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

