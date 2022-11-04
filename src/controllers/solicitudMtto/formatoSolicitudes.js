const { activoSolicitudes, guardarSolicitudSoporte, eliminarSolicitud } = require('../../bd/bd')
const { cargarOptionActivosSolicitud } = require('../../helper/mostarListado')
const { letterUppercase } = require('../../helper/upperCase')
const { maxCaracteres } = require('../../helper/maxCarracteres')
const { alert } = require('../../helper/alert')


const buttonCrear = document.querySelector('.crear')
const buttonImprimir = document.querySelector('.print')
const buttonnuevaSolicitud = document.querySelector('.nuevaSolicitud')
const buttoneliminar = document.querySelector('.eliminar')
const buttonConfirmarEliminar = document.querySelector('.confirmarEliminar')
const buttonCancelarEliminar = document.querySelector('.cancelarEliminar')

//list
const listActivos = document.querySelector('#listActivos')

// input 
const inputCodigoInterno = document.querySelector('#codigoInterno')
const inputModeloActivo = document.querySelector('#modeloActivo')
const inputAreaActivo = document.querySelector('#areaActivo')
const inputNombreActivo = document.querySelector('#nombreActivo')
const inputSerieActivo = document.querySelector('#serieActivo')
const inputUbicacionActivo = document.querySelector('#ubicacionActivo')
const inputMarcaActivo = document.querySelector('#marcaActivo')
const inputProcesoActivo = document.querySelector('#procesoActivo')
const inputEstadoActivo = document.querySelector('#estadoActivo')
const inputdescripcionSolicitud = document.querySelector('#descripcionSolicitud')
const inputResponsable = document.querySelector('#responsable')
const imputFechaSolicitud = document.querySelector('#fechaSolicitud')
const imputUsuarioSolicitud = document.querySelector('#usuarioSolicitud')
const inputIdSolicitud = document.querySelector('#idSolicitud')
const inputConfirmarCodigoInterno = document.querySelector('#confirmarCodigoInterno')
const inputIdActivo = document.querySelector('#idActivo')

//labels
const labelFechaSolicitud = document.querySelector('.fechaSolicitud')
const labelUsuarioSolicitud = document.querySelector('.usuarioSolicitud')
//div
const form = document.querySelector('form')
const divDataActivo = document.querySelector('.dataActivo')
const divIdSolicitud = document.querySelector('.idSolicitud')
const pcaracteressolicitud = document.querySelector('#caracteressolicitud')
const divConfirmarCodigoInterno = document.querySelector('.infoConfirmarELiminar')


let timeout
let activo
let primercodigo

document.addEventListener('DOMContentLoaded', async () => {
    await cargarOptionActivosSolicitud(listActivos)
})

inputIdActivo.addEventListener('keyup', (e) => {

    if (activo) {
        if (primercodigo === inputIdActivo.value.trim()) {
            return
        }
        primercodigo = inputIdActivo.value.trim()
    } else {
        primercodigo = inputIdActivo.value.trim()

    }
    letterUppercase(e)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        consultarACtivo(primercodigo)
        clearTimeout(timeout)
    }, 1500)

})

inputIdActivo.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        const valor = inputIdActivo.value.trim()
        consultarACtivo(valor)
    }
})

inputdescripcionSolicitud.addEventListener('keyup', e => {
    maxCaracteres(e, pcaracteressolicitud, 1000)
 
})


buttonCrear.addEventListener('click', async () => {

    if (inputdescripcionSolicitud.value.trim() == '') {
        alert('Debe ingresar una solicitud', divDataActivo, form, 'alert-danger')
        return
    }
    if (inputdescripcionSolicitud.value.trim().length > 1000) {
        alert('La descripcion de la solicitud supera los 1000 caracteres', divDataActivo, form, 'alert-danger')
        return
    }
    const date = Date.now()
    const user = JSON.parse(localStorage.getItem('userData'))

    const solicitud = {
        id_activo: activo.id,
        solictud: inputdescripcionSolicitud.value,
        fecha_solicitud: new Date(date).toISOString(),
        id_user: user.id,
        ima_solictud: 'https://4ddig.tenorshare.com/es/images/otros/documentos/word-danado.webp?w=715&h=450'
    }
    const res = await guardarSolicitudSoporte(solicitud)
    if (!res.id) {
        alert('No se pudo guardar su solicitud favor intentelo mas tarde', divDataActivo, form, 'alert-danger')
        return
    }
    imputFechaSolicitud.classList.remove('d-none')
    imputUsuarioSolicitud.classList.remove('d-none')
    labelFechaSolicitud.classList.remove('d-none')
    labelUsuarioSolicitud.classList.remove('d-none')
    const fecha = new Date(solicitud.fecha_solicitud)
    imputFechaSolicitud.value = fecha.toLocaleString()
        if (activo.nombre_1 === '') {
        imputUsuarioSolicitud.value = `${user.nombre.trim()} ${user.apellido.trim()} ${user.apellido_1.trim()}`
    } else {
        imputUsuarioSolicitud.value = `${user.nombre.trim()} ${user.nombre_1.trim()} ${user.apellido.trim()} ${user.apellido_1.trim()}`
    }
    divIdSolicitud.classList.remove('d-none')
    inputIdSolicitud.value = res.id
    buttonCrear.classList.add('d-none')
    buttonImprimir.classList.remove('d-none')
    buttonnuevaSolicitud.classList.remove('d-none')
    buttoneliminar.classList.remove('d-none')
    inputdescripcionSolicitud.readOnly = true
    inputIdActivo.readOnly=true
    alert('Solictud creada exitosamente', divDataActivo, form, 'alert-success')
    return

})

buttonnuevaSolicitud.addEventListener('click', () => {
    form.reset()
    divIdSolicitud.classList.add('d-none')
    imputFechaSolicitud.classList.add('d-none')
    imputUsuarioSolicitud.classList.add('d-none')
    labelFechaSolicitud.classList.add('d-none')
    labelUsuarioSolicitud.classList.add('d-none')
    pcaracteressolicitud.textContent = 'Maximo 1000 caracteres'
    buttonCrear.classList.remove('d-none')
    buttonImprimir.classList.add('d-none')
    buttonnuevaSolicitud.classList.add('d-none')
    buttoneliminar.classList.add('d-none')
    inputIdActivo.readOnly=false

})

buttoneliminar.addEventListener('click', () => {
    divConfirmarCodigoInterno.classList.remove('d-none')
})

buttonConfirmarEliminar.addEventListener('click', async () => {

    const id = inputIdSolicitud.value

    if (!inputConfirmarCodigoInterno) {
        return
    }
    if (inputConfirmarCodigoInterno.value === '') {

        return
    }

    if (id !== inputConfirmarCodigoInterno.value.trim()) {
        alert('el id ingresado no corresponde a id de la solicictud', divDataActivo, form, 'alert-danger')
        return
    }
    const res = await eliminarSolicitud(id)
    if (res !== 1) {
        alert('No se pudo eliminar la solictud contacte con soporte', divDataActivo, form, 'alert-danger')
        return
    }

    form.reset()
    divIdSolicitud.classList.add('d-none')
    imputFechaSolicitud.classList.add('d-none')
    imputUsuarioSolicitud.classList.add('d-none')
    labelFechaSolicitud.classList.add('d-none')
    labelUsuarioSolicitud.classList.add('d-none')
    divConfirmarCodigoInterno.classList.add('d-none')
    buttonCrear.classList.remove('d-none')
    buttonImprimir.classList.add('d-none')
    buttonnuevaSolicitud.classList.add('d-none')
    buttoneliminar.classList.add('d-none')
    pcaracteressolicitud.textContent = 'Maximo 1000 caracteres'

    alert('La solicitud ha sido eliminada correctamete.', divDataActivo, form, 'alert-success')
})

buttonCancelarEliminar.addEventListener('click', () => {
    divConfirmarCodigoInterno.classList.add('d-none')
})

async function consultarACtivo(valor) {


    if (valor === '') {
        resetactivo()
        return
    }
    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(valor)
    if (!onlyNumbers) {
        resetactivo()
        return
    }
    const id = parseInt(valor)

    activo = await activoSolicitudes(id)
    if (!activo) {
        resetactivo()
        return
    }
    inputCodigoInterno.value = activo.siglas.trim() + activo.consecutivo_interno
    inputModeloActivo.value = activo.modelo.trim();
    inputAreaActivo.value = activo.area.trim()
    inputNombreActivo.value = activo.nombreActivo.trim()
    inputSerieActivo.value = activo.serie.trim()
    inputUbicacionActivo.value = activo.ubicacion.trim()
    inputMarcaActivo.value = activo.marca.trim()
    inputProcesoActivo.value = activo.proceso
    inputEstadoActivo.value = activo.estado.trim()
    if (activo.nombre_1 === '') {
        inputResponsable.value = `${activo.nombre.trim()} ${activo.apellido.trim()} ${activo.apellido_1.trim()}`
    } else {
        inputResponsable.value = `${activo.nombre.trim()} ${activo.nombre_1.trim()} ${activo.apellido.trim()} ${activo.apellido_1.trim()}`
    }
    inputdescripcionSolicitud.readOnly = false

}

const resetactivo = () => {

    alert('El activo que intenta buscar no existe', divDataActivo, form, 'alert-danger')

    inputCodigoInterno.value = ""
    inputModeloActivo.value = ''
    inputAreaActivo.value = ''
    inputNombreActivo.value = ''
    inputSerieActivo.value = ''
    inputUbicacionActivo.value = ''
    inputMarcaActivo.value = ''
    inputProcesoActivo.value = ''
    inputEstadoActivo.value = ''
    inputResponsable.value = ''
    inputdescripcionSolicitud.readOnly = true

}