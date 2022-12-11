const Minio = require('minio')

async function uploadImageS3(reader, file) {
    try {
        const fileData = reader.replace(/^data:image\/\w+;base64,/, "");
        const buffer = Buffer.from(fileData, 'base64');

        const fileName = (file?.name).replace(/ /g, '_');

        const minioClient = new Minio.Client({
            endPoint: '191.101.234.188',
            port: 9000,
            useSSL: false,
            accessKey: 'minio',
            secretKey: 'minio123'
        });

        minioClient.putObject('menu', fileName, buffer);

        return {
            sucess: true,
            fileName,
            message: ""
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