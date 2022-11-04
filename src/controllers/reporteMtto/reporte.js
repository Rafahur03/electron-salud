const {ipcRenderer} = require('electron')
const cardRealizarRepote = document.querySelector('.realizarRepote')

cardRealizarRepote.addEventListener('click', ()=>{
   console.log('first')
    ipcRenderer.send('realizarReporte')
})