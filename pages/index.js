import { useState } from 'react'
import uploadImageS3 from '../Minio'

export default function Home() {
  const [imgsSrc, setImgsSrc] = useState([]);
  const [imgName, setImgName] = useState("");

  const onChange = (e) => {
    for (const file of e.target.files) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        uploadImageS3(reader.result, file).then(function (result) {
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