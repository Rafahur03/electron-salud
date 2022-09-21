const {ipcRenderer}= require('electron')


const menuAdministracion = document.querySelector('.administracion')
const menuActivos = document.querySelector('.activos')
const menuSolicitud= document.querySelector('.solicitud')
const menuReporte = document.querySelector('.reporte')
const menuEncuesta = document.querySelector('.encuesta')
let openMenu

ipcRenderer.on('userData', (e,userData)=>{
    document.title = `Bienvenido ${userData.nombre_1} ${userData.nombre_2} ${userData.aprellido_1} ${userData.apellido_2}`
})


menuAdministracion.addEventListener('click',()=>{ 
    console.log('hola')
    openMenu = 'ventanaAdministracion'
    ipcRenderer.send('openMenu',openMenu)
})

menuActivos.addEventListener('click', ()=> {
    console.log('activos')
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