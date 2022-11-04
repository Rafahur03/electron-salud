const {ipcRenderer} = require('electron')

const cardNuevaSoliictud = document.querySelector('.nuevaSolicitudMtto');
const consultarReporteMtto = document.querySelector('.estadoSolicitudMtto');

cardNuevaSoliictud.addEventListener('click', ()=>{
        ipcRenderer.send('ventanaSolicitudMtto')

})

consultarReporteMtto.addEventListener('click', ()=>{
    ipcRenderer.send('ventanaConsultarMtto')

})