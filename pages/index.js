import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { useState } from 'react'

const uploadImageS3 = async (file) => {


  console.log('file', file);
}

export default function Home() {
  const [imgsSrc, setImgsSrc] = useState([]);
  const onChange = (e) => {
    for (const file of e.target.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setImgsSrc((imgs) => [...imgs, reader.result]);
      };
      uploadImageS3(file);
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