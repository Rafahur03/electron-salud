// const { google } = require('googleapis')
// require('dotenv').config()
// const fs = require('fs')
// const path = require('path');
// const { open } = require('node:fs/promises')

// const keyFile = process.env.KEYFILEGOOGLE
// const scopes = [process.env.SCOPEGOOGLE]
// const foldersId = '1WONK0L9hDlNTfWKEYV1eyZXiXIw-yXAE'

// const auth = new google.auth.GoogleAuth({
//     keyFile,
//     scopes
//   })

//   const drive = google.drive({
//     version: 'v3',
//     auth
// })



// async function saveImg() {
//     try {
    
//         const fileMetaData = {
//             name: 'prueba.jpg',
//             parents: [foldersId]
//         }
//         const media ={
//             mimeType: 'image/jpg',
//             body: fs.createReadStream('./ataraxia.jpg')
//         }
//         console.log(media)
        
//         const res = await drive.files.create({
//             resource: fileMetaData,
//             media: media,
                    
//         })

//         console.log(res)
    
//     } catch (error) {
//        console.log(error)
        
//     }
    
   
// }
  

// module.exports = { saveImg }

const fs = require('fs')
const { google } = require('googleapis')
const stream = require('stream');

const GOOGLE_API_FOLDER_ID = '1WONK0L9hDlNTfWKEYV1eyZXiXIw-yXAE'

const a = fs.createReadStream('./ataraxia.jpg')
a.on('data', (chunk)=>{
    console.log(chunk instanceof Buffer)
    console.log('He recibido ' + chunk.length + ' bytes de datos.');
    process.stdout.write(chunk)

})



async function saveImg(){
    try{
        const auth = new google.auth.GoogleAuth({
            keyFile: process.env.KEYFILEGOOGLE,
            scopes: [process.env.SCOPEGOOGLE]
        })

        const driveService = google.drive({
            version: 'v3',
            auth
        })

        const fileMetaData = {
            'name': 'snowplace.jpg',
            'parents': [GOOGLE_API_FOLDER_ID]
        }

        const media = {
            mimeType: 'image/jpg',
            body: fs.createReadStream('./ataraxia.jpg','base64')
        }
       // console.log(fs.createReadStream('./ataraxia.jpg'))
        const response = await driveService.files.create({
            resource: fileMetaData,
            media: media,
        })
        return response.data.id

    }catch(err){
        console.log('Upload file error', err)
    }
}

saveImg().then(data => {
    console.log(data)
    //https://drive.google.com/uc?export=view&id=
})

module.exports = { saveImg }