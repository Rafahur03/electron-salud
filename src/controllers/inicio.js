const {ipcRenderer}= require('electron')
const { dataConfActivo} = require('../bd/bd')


const menuAdministracion = document.querySelector('.administracion');
const menuActivos = document.querySelector('.activos');
const menuSolicitud= document.querySelector('.solicitud');
const menuReporte = document.querySelector('.reporte');
const menuEncuesta = document.querySelector('.encuesta');
const menuEstadistica = document.querySelector('.estadistica');
const usuario = document.querySelector('.usuario');
let openMenu




ipcRenderer.on('userData', async (e, userData)=>{
   usuario.textContent = `Bienvenido ${userData.nombre} ${userData.nombre_1} ${userData.apellido} ${userData.apellido_1}`
   const config = await dataConfActivo()
   localStorage.setItem('configActivos', JSON.stringify(config))
})

menuAdministracion.addEventListener('click',()=>{ 
    openMenu = 'ventanaAdministracion'
    ipcRenderer.send('openMenu',openMenu)
})

menuActivos.addEventListener('click', ()=> {
    openMenu = 'ventanaActivos'
    ipcRenderer.send('openMenu',openMenu)
})

menuSolicitud.addEventListener('click', ()=> {
    openMenu = 'ventanaSolicitud'
    ipcRenderer.send('openMenu',openMenu)
})

menuReporte.addEventListener('click', ()=> {
    openMenu = 'ventanaReporte'
    ipcRenderer.send('openMenu',openMenu)
})

menuEncuesta.addEventListener('click', ()=>{
    openMenu = 'ventanaEncuesta'
    ipcRenderer.send('openMenu',openMenu)
})

menuEstadistica.addEventListener('click', ()=>{
    openMenu = 'ventanaEstadistica'
    ipcRenderer.send('openMenu',openMenu)
})