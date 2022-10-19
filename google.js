const fs = require('fs')
const { google } = require('googleapis')

 const GOOGLE_API_FOLDER_ID = '1WONK0L9hDlNTfWKEYV1eyZXiXIw-yXAE'

    const keyFile = 'D:\\AppEscritorio\\salud\\config.json'
    const scopes = ['https://www.googleapis.com/auth/drive']
    const auth = new google.auth.GoogleAuth({
        keyFile,
        scopes
    })

    const driveService = google.drive({
        version: 'v3',
        auth
    })

async function subirImagen() {
   
    try {
        const fileMetadatafolder = {
            name: 'nuevo folder',
            parents: [GOOGLE_API_FOLDER_ID],
            mimeType: 'application/vnd.google-apps.folder',
        }
        const file = await driveService.files.create({
            resource: fileMetadatafolder,
            fields: 'id'
        })
        console.log(file.data.id)

        const fileMetaDataImg = {
            'name': 'snowplace.png',
            'parents': [file.data.id]
        }
        const fd = fs.openSync('D:\\Users\\RJHR\\OneDrive\\Imágenes\\5x7.PNG', 'r')
        console.log(fd)
        const media = {
            mimeType: 'image/pmg',
            body: fs.createReadStream('D:\\Users\\RJHR\\OneDrive\\Imágenes\\5x7.PNG')
        }

        console.log(media)
        const response = await driveService.files.create({
            resource: fileMetaDataImg,
            media: media,
            field: 'id'
        })
        //return 
        console.log(response.data.id)

    } catch (err) {
        console.log('Upload file error', err)
    }
}




module.exports = { subirImagen }