const {ipcRenderer} = require('electron')

const encuesta = document.querySelector('.encuesta')

encuesta.addEventListener('click', (e)=>{ 
    ipcRenderer.send('encuesta')
})