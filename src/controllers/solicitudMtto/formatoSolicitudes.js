const { activoSolicitudes, guardarSolicitudSoporte, eliminarSolicitud } = require('../../bd/bd')
const { cargarOptionActivosSolicitud } = require('../../helper/mostarListado')
const { letterUppercase } = require('../../helper/upperCase')

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
let valueParrafo

document.addEventListener('DOMContentLoaded', async () => {
    await cargarOptionActivosSolicitud(listActivos)
})

inputCodigoInterno.addEventListener('keyup', (e) => {

    if (activo) {
        if (primercodigo === inputCodigoInterno.value.trim()) {
            return
        }
        primercodigo = inputCodigoInterno.value.trim()
    } else {
        primercodigo = inputCodigoInterno.value.trim()

    }
    letterUppercase(e)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        consultarACtivo()
        clearTimeout(timeout)
    }, 1500)

})

inputdescripcionSolicitud.addEventListener('keyup', e => {
    const largo = e.target.value.length

    if (largo === 0) {
        pcaracteressolicitud.textContent = 'Maximo 1000 caracteres'
        return
    }

    if (largo === 1000) {
        valueParrafo = e.target.value
        pcaracteressolicitud.textContent = 'Quedan 0 caracteres de 1000'
        return
    }

    if (largo < 1000) {
        pcaracteressolicitud.textContent = `Quedan ${1000 - e.target.value.length} caracteres de 1000`
        return
    }

    if (largo > 1000) {
        inputdescripcionSolicitud.value = valueParrafo
    }
})

inputCodigoInterno.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        consultarACtivo()
    }
})

buttonCrear.addEventListener('click', async () => {

    if (inputdescripcionSolicitud.value.trim() == '') {
        alert('Debe ingresar una solicitud', divDataActivo, form, 'alert-danger')
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
    if(!res.id){
        alert('No se pudo guardar su solicitud favor intentelo mas tarde', divDataActivo, form, 'alert-danger')
        return
    }
    imputFechaSolicitud.classList.remove('d-none')
    imputUsuarioSolicitud.classList.remove('d-none')
    labelFechaSolicitud.classList.remove('d-none')
    labelUsuarioSolicitud.classList.remove('d-none')
    imputFechaSolicitud.value = solicitud.fecha_solicitud
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

})

buttonnuevaSolicitud.addEventListener('click', () => {
    form.reset()
    divIdSolicitud.classList.add('d-none')
    imputFechaSolicitud.classList.add('d-none')
    imputUsuarioSolicitud.classList.add('d-none')
    labelFechaSolicitud.classList.add('d-none')
    labelUsuarioSolicitud.classList.add('d-none')
    pcaracteressolicitud.textContent = 'Maximo 1000 caracteres'

})

buttoneliminar.addEventListener('click', () => {
    divConfirmarCodigoInterno.classList.remove('d-none')
})

buttonConfirmarEliminar.addEventListener('click', async () => {

    const id = inputIdSolicitud.value

    if (!inputConfirmarCodigoInterno) {
        return
    }
    if (inputConfirmarCodigoInterno.value ==='') {
  
        return
    }

    if (id !== inputConfirmarCodigoInterno.value.trim()) {
        alert('el id ingresado no corresponde a id de la solicictud', divDataActivo, form, 'alert-danger')
        return
    }
    const res = await eliminarSolicitud(id)
    if(res!== 1){
        alert('No se pudo eliminar la solictud contacte con soporte', divDataActivo, form, 'alert-danger')
        return
    }
    console.log((res))
    form.reset()
    divIdSolicitud.classList.add('d-none')
    imputFechaSolicitud.classList.add('d-none')
    imputUsuarioSolicitud.classList.add('d-none')
    labelFechaSolicitud.classList.add('d-none')
    labelUsuarioSolicitud.classList.add('d-none')
    divConfirmarCodigoInterno.classList.add('d-none')
    buttonCrear.classList.add('d-none')
    buttonImprimir.classList.remove('d-none')
    buttonnuevaSolicitud.classList.remove('d-none')
    buttoneliminar.classList.remove('d-none')
    pcaracteressolicitud.textContent = 'Maximo 1000 caracteres'

    alert('La solicitud ha sido eliminada correctamete.', divDataActivo, form, 'alert-success')
})

buttonCancelarEliminar.addEventListener('click', () => {
    divConfirmarCodigoInterno.classList.add('d-none')
})

async function consultarACtivo() {
    if (inputCodigoInterno.value) {
        let codigo = inputCodigoInterno.value.trim()

        if (codigo === '') {
            inputdescripcionSolicitud.readOnly = true
            return
        }
        codigo = codigo.match(/[a-z]+|[^a-z]+/gi).join(" ").replace(/\s+/g, " ").split(' ')

        const config = JSON.parse(localStorage.getItem('configActivos'))
        const clasificacionActivos = config[0]
        const index = clasificacionActivos.findIndex(item => item.siglas.trim() === codigo[0])
        if (index === -1) {
            resetactivo()
            return
        }
        let data = {}
        data.clasificacion = clasificacionActivos[index].id

        if (!codigo[1]) {
            resetactivo()
            return
        }

        if (codigo[1].length < 4 || codigo[1].length > 4) {
            resetactivo()
            return
        }

        data.codigoInterno = codigo[1]
        // consulta a la base de datos

        activo = await activoSolicitudes(data)
        if (!activo) {
            resetactivo()
            return
        }

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
}

const resetactivo = () => {

    alert('El activo que intenta buscar no existe', divDataActivo, form, 'alert-danger')
    inputdescripcionSolicitud.readOnly = true
    if (inputNombreActivo) {
        inputModeloActivo.value = ''
        inputAreaActivo.value = ''
        inputNombreActivo.value = ''
        inputSerieActivo.value = ''
        inputUbicacionActivo.value = ''
        inputMarcaActivo.value = ''
        inputProcesoActivo.value = ''
        inputEstadoActivo.value = ''
        inputResponsable.value = ''
    }
}