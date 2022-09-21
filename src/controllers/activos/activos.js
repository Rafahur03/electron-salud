const {ipcRenderer} = require('electron')
const listado = document.querySelector('.listado')
const ingreso = document.querySelector('.ingresoActivo')
let openMenu


listado.addEventListener('click',()=>{ 
    openMenu = 'ventanaListadoActivos'
    ipcRenderer.send('openMenu',openMenu)
})

ingreso.addEventListener('click',()=>{ 
    openMenu = 'VentanaIngresoActivo'
    ipcRenderer.send('openMenu',openMenu)
})