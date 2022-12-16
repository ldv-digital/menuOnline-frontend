import { useState } from 'react'
import uploadImageS3 from '../services/minio-client'

export default function createmenu() {

  testeAteste()

  const [imgsSrc, setImgsSrc] = useState([]);
  const [imgName, setImgName] = useState("");

  const onChange = (e) => {



    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadImageS3(reader.result, file).then(function (result) {

          console.log('tetse', result)

          setImgName(result.fileName)
        });

        setImgsSrc((imgs) => [...imgs, reader.result]);
      };

      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };

  return (
    <div>
      <input onChange={onChange} type="file" name="file" />
      {imgName}
      {imgsSrc.map((link, key) => (
        <img key={key} src={link} />
      ))}
    </div>
  );
}

async function testeAteste() {



  // const id_menu = 1;
  // const { data } = await client.query({
  //   query: gql`
  //     query Menu($id_menu: ID) {
  //       getMenu(id: $id_menu) {
  //         userId
  //         urlLogo
  //         urlMenu
  //       }
  //     }
  //   `,
  //   variables: { id_menu }
  // });

  // console.log('aaaaaaaaaaaaa', data)


}

