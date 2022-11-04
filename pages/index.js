import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useState } from 'react'

const Minio = require('minio')

const uploadImageS3 = async (reader, file) => {
  const fileData = reader.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(fileData, 'base64');

  const minioClient = new Minio.Client({
    endPoint: '191.101.234.188',
    port: 9000,
    useSSL: false,
    accessKey: 'minio',
    secretKey: 'minio123'
  });

  minioClient.putObject('menu', file.name, buffer, function (err, etag) {
    return console.log(err, etag)
  })
}

export default function Home() {
  const [imgsSrc, setImgsSrc] = useState([]);
  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadImageS3(reader.result, file);
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
      {imgsSrc.map((link, key) => (
        <img key={key} src={link} />
      ))}
    </div>
  );
}