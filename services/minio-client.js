const Minio = require('minio')

async function uploadImageS3(reader, file) {
    try {
        const fileData = reader.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(fileData, 'base64');

        const fileName = (file?.name).replace(/ /g, '_');
        const bucket = process.env.NEXT_PUBLIC_MINIO_BUCKET;

        const options = {
            endPoint: process.env.NEXT_PUBLIC_MINIO_ENDPOINT,
            port: parseInt(process.env.NEXT_PUBLIC_MINIO_PORT),
            useSSL: Boolean(parseInt(process.env.NEXT_PUBLIC_MINIO_USESSL)),
            accessKey: process.env.NEXT_PUBLIC_MINIO_ACCESSKEY,
            secretKey: process.env.NEXT_PUBLIC_MINIO_SECRETKEY
        };

        const minioClient = new Minio.Client(options);
        const response = await minioClient.putObject(bucket, fileName, buffer);

        return {
            sucess: true,
            fileName,
            message: response
        }

    } catch (error) {
        return {
            sucess: false,
            fileName: "",
            message: error
        }
    }
}

export default uploadImageS3;