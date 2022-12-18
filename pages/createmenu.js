import { useState } from 'react'
import uploadImageS3 from '../services/minio-client'
import { gql } from "@apollo/client";
import client from "../services/apollo-client";

export default function createmenu() {
  const urlMinio = '//' + process.env.NEXT_PUBLIC_ENDPOINT + ':' + process.env.NEXT_PUBLIC_PORT + '/' + process.env.NEXT_PUBLIC_BUCKET;
  const [imgName, setImgName] = useState("");
  const [idMenu, setIdMenu] = useState("");
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
    <div>
      <input onChange={onChange} type="file" name="file" />
      {idMenu ? (
        <><p>Menu criado com sucesso {idMenu}</p>
          <p><img src={imgName} /></p>
        </>
      ) : (
        <>Selecione uma imagem</>
      )}
    </div>
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

