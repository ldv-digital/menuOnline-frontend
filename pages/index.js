import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

const Minio = require('minio')

import { useState } from 'react'

const uploadImageS3 = async (fileStream, fileSize) => {

  const stream = await fileStream.stream();

  console.log("ccccccccccc", fileSize)

var minioClient = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: true,
    accessKey: 'minio',
    secretKey: 'minio123'
});

minioClient.putObject('menu', '40mbfile', stream, fileSize, function(err, objInfo) {
  if(err) {
      return console.log("error", err) // err should be null
  }

})

  console.log('fileStream', fileStream);
}

export default function Home() {
  const [imgsSrc, setImgsSrc] = useState([]);
  const onChange = (e) => {
    for (const file of e.target.files) {


      uploadImageS3(file, file.size);


      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
 

        setImgsSrc((imgs) => [...imgs, reader.result]);
      };
   
      reader.onerror = () => {
        console.log(reader.error);
      };
    }
  };
  console.log(imgsSrc, imgsSrc.length);



  return (
    <div>
      <input onChange={onChange} type="file" name="file" multiple />
      {imgsSrc.map((link, key) => (
        <img key={key} src={link} />
      ))}
    </div>
  );
}