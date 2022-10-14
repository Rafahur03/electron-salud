const {ipcRenderer} = require('electron')

const cardNuevaSoliictud = document.querySelector('.nuevaSolicitudMtto');
const consultarReporteMtto = document.querySelector('.estadoSolicitudMtto');

cardNuevaSoliictud.addEventListener('click', ()=>{
    let ventanaSolicitudMtto=null
    ipcRenderer.send('ventanaSolicitudMtto', ventanaSolicitudMtto)

})

consultarReporteMtto.addEventListener('click', ()=>{
    ipcRenderer.send('ventanaConsultarMtto')

})