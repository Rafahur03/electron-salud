const { ipcRenderer } = require('electron')
const { alert } = require('../../helper/alert')

const buttonconfirmar = document.querySelector('.confirmar')
const form = document.querySelector('form')

const idactivo = document.querySelector('#codigoInterno')
const nombreActivo = document.querySelector('#nombreActivo')
const modeloActivo = document.querySelector('#modeloActivo')
const marcaActivo = document.querySelector('#marcaActivo')
const serieActivo = document.querySelector('#serieActivo')
const tipoActivo = document.querySelector('#procesoActivo')
const areaActivo = document.querySelector('#areaActivo')
const ubicacionActivo = document.querySelector('#ubicacionActivo')
const estadoActivo = document.querySelector('#estadoActivo')
const confirmarActivo = document.querySelector('#confirmarActivo')
let activo

ipcRenderer.on('eliminarActivo', (e, dataActivo)=>{
    idactivo.value = dataActivo.id_equipo
    nombreActivo.value = dataActivo.nombre
    modeloActivo.value = dataActivo.modelo
    marcaActivo.value = dataActivo.marca
    serieActivo.value = dataActivo.serie
    areaActivo.value = dataActivo.area
    ubicacionActivo.value = dataActivo.ubicacion
    estadoActivo.value = dataActivo.estado
    tipoActivo.value = dataActivo.tipo
    activo=dataActivo
})

buttonconfirmar.addEventListener('click' ,e=>{

    if(confirmarActivo.value !== activo.id_equipo){
        alert('El codigo ingresado no coincide', form, buttonconfirmar,'alert-danger')
        return
    }

    ipcRenderer.send('confirmarEliminar', activo)


})