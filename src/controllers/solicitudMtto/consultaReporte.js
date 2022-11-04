const { activoSolicitudes, consultarSolicitud } = require('../../bd/bd')
const { cargarOptionActivosSolicitud,
    cargarOptionSolcitudes } = require('../../helper/mostarListado')
const { letterUppercase } = require('../../helper/upperCase')
const { alert } = require('../../helper/alert')

const inputCodigoInterno = document.querySelector('#codigoInterno')
const inputModeloActivo = document.querySelector('#modeloActivo')
const inputAreaActivo = document.querySelector('#areaActivo')
const inputNombreActivo = document.querySelector('#nombreActivo')
const inputSerieActivo = document.querySelector('#serieActivo')
const inputUbicacionActivo = document.querySelector('#ubicacionActivo')
const inputMarcaActivo = document.querySelector('#marcaActivo')
const inputProcesoActivo = document.querySelector('#procesoActivo')
const inputEstadoActivo = document.querySelector('#estadoActivo')
const inputidactivo = document.querySelector('#idactivo')
const inputIdSolicitud = document.querySelector('#idSolicitud')
const inputTipoActivo = document.querySelector('#tipoActivo')
const inputFechaSolicitud = document.querySelector('#fechaSolicitud')
const inputEstadoSolicitud = document.querySelector('#estadoSolicitud')
const inputDescripcionSolicitud = document.querySelector('#descripcionSolicitud')
// div
const form = document.querySelector('form')
const divDataActivo = document.querySelector('.dataActivo')
// lits 
const listActivos = document.querySelector('#listActivos')
const listSolicitudes = document.querySelector('#listSolicitudes')

//variables

let timeout
let activo
let solicitud
let idActivoanterior
let idSolictudAnterior

document.addEventListener('DOMContentLoaded', async () => {
    await cargarOptionActivosSolicitud(listActivos)
    await cargarOptionSolcitudes(listSolicitudes)
})

inputidactivo.addEventListener('keyup', (e) => {

    if (activo) {
        if (idActivoanterior === inputidactivo.value.trim()) {
            return
        }
        idActivoanterior = inputidactivo.value.trim()
    } else {
        idActivoanterior = inputidactivo.value.trim()

    }
    letterUppercase(e)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        cargarActivo(idActivoanterior)
        clearTimeout(timeout)
    }, 1000)

})

inputIdSolicitud.addEventListener('keyup', (e) => {

    if (solicitud) {
        if (idSolictudAnterior === inputIdSolicitud.value.trim()) {
            return
        }
        idSolictudAnterior = inputIdSolicitud.value.trim()
    } else {
        idSolictudAnterior = inputIdSolicitud.value.trim()

    }
    letterUppercase(e)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        cargarSolicitud(idSolictudAnterior)
        clearTimeout(timeout)
    }, 1000)

})

const cargarActivo = async (valor) => {
    if (valor === '') {
        resetSolictud()
        resetActivo()
        return
    }

    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(valor)
    if (!onlyNumbers) {
        alert('El dato debe ser un id valido', divDataActivo, form, 'alert-danger')
        resetActivo()
        resetSolictud()
        return
    }
    const id = parseInt(valor)

    activo = await activoSolicitudes(id)
    if (!activo) {
        alert('El activo que intenta buscar no existe', divDataActivo, form, 'alert-danger')
        resetActivo()
        resetSolictud()
       return
    }

    inputCodigoInterno.value = activo.siglas.trim() + activo.consecutivo_interno
    inputAreaActivo.value = activo.area.trim()
    inputModeloActivo.value = activo.modelo.trim()
    inputNombreActivo.value = activo.nombreActivo.trim()
    inputSerieActivo.value = activo.serie.trim()
    inputUbicacionActivo.value = activo.ubicacion.trim()
    inputMarcaActivo.value = activo.marca.trim()
    inputProcesoActivo.value = activo.proceso.trim()
    inputEstadoActivo.value = activo.estado.trim()
    inputTipoActivo.value = activo.tipo_activo.trim()
    filtrarScolictudActivo(activo)
}

const resetActivo = async () => {
    activo = ''
    inputCodigoInterno.value = ''
    inputAreaActivo.value = ''
    inputModeloActivo.value = ''
    inputNombreActivo.value = ''
    inputSerieActivo.value = ''
    inputUbicacionActivo.value = ''
    inputMarcaActivo.value = ''
    inputProcesoActivo.value = ''
    inputEstadoActivo.value = ''
    inputTipoActivo.value = ''
    await cargarOptionSolcitudes(listSolicitudes)

}

const filtrarScolictudActivo = async (activo) => {
    if (!activo) {
        return
    }
    if (activo === '') {
        return
    }
    await cargarOptionSolcitudes(listSolicitudes, activo.id)
}

const cargarSolicitud = async (valor) => {
    if (valor === '') {
        console.log('1')
        resetSolictud()
        return
    }

    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(valor)
    if (!onlyNumbers) {
        resetSolictud()
        alert('El dato debe ser un id valido', divDataActivo, form, 'alert-danger')
        console.log('2')
        return
    }
    const id = parseInt(valor)
 
    solicitud = await consultarSolicitud(id)

    if (!solicitud) {
        resetSolictud()
        alert('La solicitud que intenta buscar no existe', divDataActivo, form, 'alert-danger')
        return
    }
    const data = new Date(solicitud.fecha_solicitud)
    inputFechaSolicitud.value = data.toLocaleString('en-GB')
    inputEstadoSolicitud.value = solicitud.idEstado  + ' ' + solicitud.estado.trim()
    inputDescripcionSolicitud.value =solicitud.solicitud

    if(inputidactivo.value === solicitud.id_activo){
        return
    }
    inputidactivo.value = solicitud.id_activo
    cargarActivo(solicitud.id_activo)
}

const resetSolictud = async () => {
    solicitud = ''
    inputIdSolicitud.value =''
    inputFechaSolicitud.value = ''
    inputEstadoSolicitud.value = ''
    inputDescripcionSolicitud.value = ''
}
