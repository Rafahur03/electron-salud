const {ipcRenderer} = require('electron')

const listado = document.querySelector('.listado')
const ingreso = document.querySelector('.ingreso-Activo')
let openMenu


listado.addEventListener('click', (e)=>{ 
    openMenu = 'ventanaListadoActivos'
    ipcRenderer.send('openMenu',openMenu)
})

ingreso.addEventListener('click',(e)=>{ 
    openMenu = 'ventanaIngresoActivo'
    ipcRenderer.send('openMenu',openMenu)
})