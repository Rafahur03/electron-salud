const {ipcRenderer} = require('electron')

const indicadorOportunidad = document.querySelector('.indicadorOportunidad')
const indicadorFallas = document.querySelector('.indicadorFallas')
const indicadorCostos = document.querySelector('.indicadorCostos')

indicadorOportunidad.addEventListener('click', (e)=>{ 
    ipcRenderer.send('indicadorOportunidad')
})

indicadorFallas.addEventListener('click', (e)=>{ 
    ipcRenderer.send('indicadorFallas')
})

indicadorCostos.addEventListener('click', (e)=>{ 
    ipcRenderer.send('indicadorCostos')
})