const { cargarOpcionesEncuestas } = require('../../helper/mostarListado')
const { letterUppercase } = require('../../helper/upperCase')
const { alert } = require('../../helper/alert')
const { consultarListadoreporte, guardarEncuesta } = require('../../bd/bd')


// input 

const inputIdSolicitud = document.querySelector('#idSolicitud')
const inputIdReporte = document.querySelector('#idReporte')
const inputCodigoInterno = document.querySelector('#codigoInterno')
const inpuNnombreActivo = document.querySelector('#nombreActivo')
const inputFechaSolicitud = document.querySelector('#fechaSolicitud')
const inputFechaReporte = document.querySelector('#fechaReporte')
const inputEstado = document.querySelector('#estado')

// form 
const form = document.querySelector('form')

// div
const dataEncuesta = document.querySelector('.dataEncuesta')
// list

const listSolicitud = document.querySelector('#listSolicitud')
const listReporte = document.querySelector('#listReporte')

// button 

const buttonEnviar = document.querySelector('.enviar')

//select
const SelectPregunta1 = document.querySelector('#pregunta1')
const SelectPregunta2 = document.querySelector('#pregunta2')
const SelectPregunta3 = document.querySelector('#pregunta3')
const SelectPregunta4 = document.querySelector('#pregunta4')
const SelectPregunta5 = document.querySelector('#pregunta5')

// text area
const ComentarioPregunta1 = document.querySelector('#comentarioPregunta1')
const ComentarioPregunta2 = document.querySelector('#comentarioPregunta2')
const ComentarioPregunta4 = document.querySelector('#comentarioPregunta4')
const ComentarioPregunta5 = document.querySelector('#comentarioPregunta5')

let solicitud
let reporte
let datos

document.addEventListener('DOMContentLoaded', () => {
    cargarOpcionesEncuestas(listSolicitud, listReporte)
})

inputIdSolicitud.addEventListener('keyup', (e) => {
    letterUppercase(e)
    const regex = /^[0-9]*$/
    const onlyNumbers = regex.test(e.target.value.trim())
    if (e.target.value.trim() == '' || !onlyNumbers) {
        resetForm('solicitud')
    }

    if (e.key !== 'Enter') return
    if (solicitud) {
        if (solicitud === inputIdSolicitud.value.trim()) {
            return
        }
        solicitud = inputIdSolicitud.value.trim()
    } else {
        solicitud = inputIdSolicitud.value.trim()

    }

    cargarForm(solicitud, 'solicitud')
})

inputIdReporte.addEventListener('keyup', (e) => {
    letterUppercase(e)
    const regex = /^[0-9]*$/
    const onlyNumbers = regex.test(e.target.value.trim())
    if (e.target.value.trim() == '' || !onlyNumbers) {
        resetForm()
    }

    if (e.key !== 'Enter') return
    if (reporte) {
        if (reporte === inputIdReporte.value.trim()) {
            return
        }
        reporte = inputIdReporte.value.trim()
    } else {
        reporte = inputIdReporte.value.trim()

    }

    cargarForm(reporte)
})

SelectPregunta3.addEventListener('change', e => {
    if (e.target.value == 1) {
        SelectPregunta4.disabled = false
        return
    }
    SelectPregunta4.disabled = true
    SelectPregunta4.value = 0

})

buttonEnviar.addEventListener('click', async () => {
    const datos = dataForm()
    console.log(datos)
    const resp = await guardarEncuesta(datos)
    if(resp ==='err'){
        alert('No se pudo guardar la encuesta', dataEncuesta, form, 'alert-danger')
        return
    }
    alert('Encuestra recibida Gracias por sus comentarios', dataEncuesta, form, 'alert-success')
    setTimeout(() => { 
        inputIdSolicitud.value = ''
        resetForm() 
    }, 1500)
})

const cargarForm = async (id, donde) => {
    
    if (donde === 'solicitud') {
        datos = await consultarListadoreporte(id, 'solicitud')
        if (!datos) {
            alert('la solicitud que intenta buscar no fue encontrada o la encuesta ya fue realizada', dataEncuesta, form, 'alert-danger')
            resetForm('solicitud')
            return
        }
    } else {
        datos = await consultarListadoreporte(id)
        if (!datos) {
            alert('el reporte que intenta buscar no fue encontrado o la encuesta ya fue realizada', dataEncuesta, form, 'alert-danger')
            resetForm()
            return
        }
    }



    inputIdSolicitud.value = datos.solicitudid
    inputIdReporte.value = datos.reporteID
    inputCodigoInterno.value = datos.siglas.trim() + datos.consecutivo_interno
    inpuNnombreActivo.value = datos.nombre
    inputFechaSolicitud.value = datos.fecha_solicitud.toLocaleString('en-GB')
    inputFechaReporte.value = datos.fechareporte.toLocaleString('en-GB')
    inputEstado.value = datos.id_estado + ' ' + datos.estado.trim()

    if (datos.id_estado !== 3) {
        resetForm('solicitud')
        alert('La solicitud esta abierta o en proceso aun no puede realizar esta encuesta', dataEncuesta, form, 'alert-danger')
        return
    }
    SelectPregunta1.disabled = false
    SelectPregunta2.disabled = false
    SelectPregunta3.disabled = false
    SelectPregunta5.disabled = false
    buttonEnviar.disabled = false
    ComentarioPregunta1.readOnly = false
    ComentarioPregunta2.readOnly = false
    ComentarioPregunta4.readOnly = false
    ComentarioPregunta5.readOnly = false


}

const resetForm = (donde) => {

    if (donde === 'solicitud') {
        inputIdReporte.value = ''
    } else {
        inputIdSolicitud.value = ''
    }

    inputCodigoInterno.value = ''
    inpuNnombreActivo.value = ''
    inputFechaSolicitud.value = ''
    inputFechaReporte.value = ''
    inputEstado.value = ''
    SelectPregunta1.value = 0
    SelectPregunta2.value = 0
    SelectPregunta3.value = 0
    SelectPregunta4.value = 0
    SelectPregunta5.value = 0
    SelectPregunta1.disabled = true
    SelectPregunta2.disabled = true
    SelectPregunta3.disabled = true
    SelectPregunta4.disabled = true
    SelectPregunta5.disabled = true
    buttonEnviar.disabled = true
    ComentarioPregunta1.readOnly = true
    ComentarioPregunta2.readOnly = true
    ComentarioPregunta4.readOnly = true
    ComentarioPregunta5.readOnly = true
    ComentarioPregunta1.value =''
    ComentarioPregunta2.value =''
    ComentarioPregunta4.value =''
    ComentarioPregunta5.value =''
    solicitud = ''
    reporte = ''
    datos= ''
}

const dataForm = () => {


    if (SelectPregunta1.value == 0) {
        alert('Falta responder la pregunta 1', dataEncuesta, form, 'alert-danger')
        return
    }
    if(ComentarioPregunta1.value === ''){
        alert('Falta ingresar el comentario de la pregunta 1', dataEncuesta, form, 'alert-danger')
        return
    }

    if (SelectPregunta2.value == 0) {
        alert('Falta responder la pregunta 2', dataEncuesta, form, 'alert-danger')
        return
    }
    if(ComentarioPregunta2.value === ''){
        alert('Falta ingresar el comentario de la pregunta 2', dataEncuesta, form, 'alert-danger')
        return
    }

    if (SelectPregunta3.value == 0) {
        alert('Falta responder la pregunta 3', dataEncuesta, form, 'alert-danger')
        return
    } else {
        if (SelectPregunta3.value == 1) {
            if (SelectPregunta4.value == 0) {
                alert('Falta responder la pregunta 4', dataEncuesta, form, 'alert-danger')
                return
            }
            if(ComentarioPregunta4.value === ''){
                alert('Falta ingresar el comentario de la pregunta 4', dataEncuesta, form, 'alert-danger')
                return
            }
        }
    }
    


    if (SelectPregunta5.value == 0) {
        alert('Falta responder la pregunta 5', dataEncuesta, form, 'alert-danger')
        return
    }

    if(ComentarioPregunta5.value === ''){
        alert('FFalta ingresar el comentario de la pregunta 5', dataEncuesta, form, 'alert-danger')
        return
    }

   const  fecha = new Date().toISOString().slice(0, 10)

    const respuestas = {
        id_solicitud: datos.solicitudid, 
        pregunta1: SelectPregunta1.value,
        pregunta2: SelectPregunta2.value,
        pregunta3: SelectPregunta3.value,
        pregunta4: SelectPregunta4.value,
        pregunta5: SelectPregunta5.value,
        comentarioPregunta1: ComentarioPregunta1.value,
        comentarioPregunta2: ComentarioPregunta2.value,
        comentarioPregunta4: ComentarioPregunta4.value,
        comentarioPregunta5: ComentarioPregunta5.value,
        fecha
    }
    return (respuestas)
}