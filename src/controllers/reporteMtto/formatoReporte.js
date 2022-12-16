const { activoSolicitudes,
    consultarSolicitud,
    crearReporte,
    consultarReporte,
    consultarReporteBySolicitudid,
    actualizarReporte } = require('../../bd/bd')
const { cargarOptionActivosSolicitud,
    cargarOptionSolcitudes,
    cargarOptionrReporte } = require('../../helper/mostarListado')
const { letterUppercase } = require('../../helper/upperCase')
const { alert } = require('../../helper/alert')
const { maxCaracteres } = require('../../helper/maxCarracteres')

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
const inputidReporte = document.querySelector('#idReporte')
const inputTipoMantenimiento = document.querySelector('#tipoMantenimiento')
const inputCostoMo = document.querySelector('#costoMo')
const inputCostoMp = document.querySelector('#costoMp')
const inputProvedorMtto = document.querySelector('#provedorMtto')
const inputRecibidoConforme = document.querySelector('#recibidoConforme')
const inputFechaReporte = document.querySelector('#fechaReporte')
const inputDiligenciaReporte = document.querySelector('#diligenciaReporte')
// textarea
const descripcionHallazgos = document.querySelector('#descripcionHallazgos')
const descripcionReporte = document.querySelector('#descripcionReporte')
const recomendaciones = document.querySelector('#recomendaciones')
// div
const form = document.querySelector('form')
const divDataActivo = document.querySelector('.dataActivo')
// lits 
const listActivos = document.querySelector('#listActivos')
const listSolicitudes = document.querySelector('#listSolicitudes')
const listReporte = document.querySelector('#listReporte')
const listTipoMtto = document.querySelector('#listTipoMtto')
const listEstadoSolicitud = document.querySelector('#listestadoSolicitud')
const listProvedorMtto = document.querySelector('#listProvedorMtto')
const listRecibidoConforme = document.querySelector('#listRecibidoConforme')

//buton 
const buttonCrear = document.querySelector('.crear')
const buttonActualizar = document.querySelector('.actualizar')
const buttonPrint = document.querySelector('.print')

//parrafos
const caracteresHallazgos = document.querySelector('#caracteresHallazgos')
const caracteresReporte = document.querySelector('#caracteresReporte')
const caracteresRecomendacion = document.querySelector('#caracteresRecomendacion')

//variables

let activo
let solicitud
let idActivoanterior
let idSolictudAnterior
let idReporteAnterior
let tipoMtto
let estadoSolicitud

document.addEventListener('DOMContentLoaded', async () => {

    const config = JSON.parse(localStorage.getItem('configActivos'))

    estadoSolicitud = config[9]
    estadoSolicitud.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.id + ' ' + item.estado.trim()
            option.textContent = item.estado.trim()
            listEstadoSolicitud.appendChild(option)
        }
    })

    tipoMtto = config[10]
    tipoMtto.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.id + ' ' + item.tipoMtto.trim()
            option.textContent = item.tipoMtto.trim()
            listTipoMtto.appendChild(option)
        }
    })
    const proveedores = config[4]
    proveedores.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.id + ' ' + item.razon_social.trim()
            option.textContent = item.razon_social.trim()
            listProvedorMtto.appendChild(option)
        }
    })

    const usuarios = config[7]
    usuarios.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.textContent = item.id
            option.value
            if (item.nombre_1 === '') {
                option.value = `${item.id} ${item.nombre.trim()} ${item.apellido.trim()} ${item.apellido_1.trim()}`
            } else {
                option.value = `${item.id} ${item.nombre.trim()} ${item.nombre_1.trim()} ${item.apellido.trim()} ${item.apellido_1.trim()}`
            }
            listRecibidoConforme.appendChild(option)
        }
    })

    await cargarOptionActivosSolicitud(listActivos)
    await cargarOptionSolcitudes(listSolicitudes)
    await cargarOptionrReporte(listReporte)
})

buttonCrear.addEventListener('click', async () => {
    const reporte = datos('crear')
    const idReporte = await crearReporte(reporte)
    alert('reporte guardado correctamente', divDataActivo, form, 'alert-success')
    cargarReporte(idReporte.id)
})

buttonActualizar.addEventListener('click', async () => {
    const reporte = datos('crear')
    const idReporte = await actualizarReporte(reporte)
    alert('reporte Actualizado correctamente', divDataActivo, form, 'alert-success')
    cargarReporte(idReporte)
})

///////////////////////////////////////

inputidactivo.addEventListener('keyup', (e) => {
    letterUppercase(e)
    const regex = /^[0-9]*$/
    const onlyNumbers = regex.test(e.target.value.trim())
    if (e.target.value.trim() == '' || !onlyNumbers) {
        resetReporte()
        resetSolictud()
        resetActivo()
    }

    if (e.key !== 'Enter') return
    if (activo) {
        if (idActivoanterior === inputidactivo.value.trim()) {
            return
        }
        idActivoanterior = inputidactivo.value.trim()
    } else {
        idActivoanterior = inputidactivo.value.trim()

    }

    cargarActivo(idActivoanterior)
})

inputIdSolicitud.addEventListener('keyup', (e) => {
    letterUppercase(e)
    const regex = /^[0-9]*$/
    const onlyNumbers = regex.test(e.target.value.trim())
    if (e.target.value.trim() == '' || !onlyNumbers) {
        resetSolictud()
        resetReporte()
    }

    if (e.key !== 'Enter') return

    if (solicitud) {
        if (idSolictudAnterior === inputIdSolicitud.value.trim()) {
            return
        }
        idSolictudAnterior = inputIdSolicitud.value.trim()
    } else {
        idSolictudAnterior = inputIdSolicitud.value.trim()

    }

    cargarSolicitud(idSolictudAnterior)
})

inputidReporte.addEventListener('keyup', (e) => {
    letterUppercase(e)
    const regex = /^[0-9]*$/
    const onlyNumbers = regex.test(e.target.value.trim())
    if (e.target.value.trim() == '' || !onlyNumbers) {
        resetSolictud()
        resetReporte()
    }

    if (e.key !== 'Enter') return
    if (solicitud) {
        if (idReporteAnterior === inputidReporte.value.trim()) {
            return
        }
        idReporteAnterior = inputidReporte.value.trim()
    } else {
        idReporteAnterior = inputidReporte.value.trim()

    }

    cargarReporte(idReporteAnterior)
})

descripcionHallazgos.addEventListener('keyup', (e) => {
    maxCaracteres(e, caracteresHallazgos, 1000 )

})

descripcionReporte.addEventListener('keyup', (e) => {
    maxCaracteres(e, caracteresReporte, 1000 )

})

recomendaciones.addEventListener('keyup', (e) => {
    maxCaracteres(e, caracteresRecomendacion, 1000)

})
////////////////////////////////////

const cargarActivo = async (valor) => {
    if (valor === '') {
        resetReporte()
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
        resetReporte()
        return
    }
    const id = parseInt(valor)

    activo = await activoSolicitudes(id)
    if (!activo) {
        alert('El activo que intenta buscar no existe', divDataActivo, form, 'alert-danger')
        resetActivo()
        resetSolictud()
        resetReporte()
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
    await cargarOptionrReporte(listReporte)

}

const filtrarScolictudActivo = async (activo) => {
    if (!activo) {
        return
    }
    if (activo === '') {
        return
    }
    await cargarOptionSolcitudes(listSolicitudes, activo.id)
    await cargarOptionrReporte(listReporte, activo.id)
}

const cargarSolicitud = async (valor) => {
    if (valor === '') {
        resetSolictud()
        return
    }

    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(valor)
    if (!onlyNumbers) {
        resetSolictud()
        alert('El dato debe ser un id valido', divDataActivo, form, 'alert-danger')
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
    inputEstadoSolicitud.value = solicitud.idEstado + ' ' + solicitud.estado.trim()
    inputDescripcionSolicitud.value = solicitud.solicitud

    if (inputidactivo.value === solicitud.id_activo) {
        return
    }
    inputidactivo.value = solicitud.id_activo
    cargarActivo(solicitud.id_activo)

    if (solicitud.idEstado === 3) {
        inputCostoMo.readOnly = true
        inputCostoMp.readOnly = true
        inputProvedorMtto.readOnly = true
        inputRecibidoConforme.readOnly = true
        descripcionHallazgos.readOnly = true
        descripcionReporte.readOnly = true
        recomendaciones.readOnly = true
        inputEstadoSolicitud.readOnly = true
        inputTipoMantenimiento.readOnly = true
        buttonActualizar.classList.add('d-none')
        buttonPrint.classList.remove('d-none')
        buttonCrear.classList.add('d-none')
    }

    if (!inputDiligenciaReporte.value || inputDiligenciaReporte.value.trim() == '') {
        const reporte = await consultarReporteBySolicitudid(id)
        if (reporte.rowsAffected[0] === 0) {
            buttonActualizar.classList.add('d-none')
            buttonPrint.classList.add('d-none')
            buttonCrear.classList.remove('d-none')
            return
        }
        mostrarReporte(reporte.recordset[0])
        inputidReporte.value = reporte.recordset[0].id
    }

    if (solicitud.idEstado !== 3) {
        buttonActualizar.classList.remove('d-none')
        buttonPrint.classList.remove('d-none')
        buttonCrear.classList.add('d-none')

    }
}

const resetSolictud = async => {
    solicitud = ''
    inputIdSolicitud.value = ''
    inputFechaSolicitud.value = ''
    inputEstadoSolicitud.value = ''
    inputDescripcionSolicitud.value = ''
    inputEstadoSolicitud.readOnly = false
    resetReporte()
    buttonCrear.classList.add('d-none')
    buttonActualizar.classList.add('d-none')
    buttonPrint.classList.add('d-none')
}

const cargarReporte = async valor => {
    if (valor === '') {
        resetSolictud()
        return
    }

    const regex = /^[0-9]*$/;
    const onlyNumbers = regex.test(valor)
    if (!onlyNumbers) {
        resetSolictud()
        alert('El dato debe ser un id valido', divDataActivo, form, 'alert-danger')
        return
    }
    const id = parseInt(valor)
    const reporte = await consultarReporte(id)
    if (!reporte) {
        resetSolictud()
        alert('El reporte que intenta buscar no existe', divDataActivo, form, 'alert-danger')
        return
    }

    mostrarReporte(reporte)

}

const mostrarReporte = reporte => {

    inputIdSolicitud.value = reporte.solicitud_id
    inputTipoMantenimiento.value = reporte.tipoMtoo_id + ' ' + reporte.tipoMtto.trim()
    inputCostoMo.value = reporte.costo_mo
    inputCostoMp.value = reporte.costo_mp
    inputProvedorMtto.value = reporte.proveedor_id + ' ' + reporte.razon_social.trim()
    inputRecibidoConforme.value = reporte.usuario_idaprovado + ' ' + reporte.usuarioRecibido.trim()
    inputFechaReporte.value = reporte.fechareporte.toLocaleString('en-GB')
    inputDiligenciaReporte.value = reporte.usuario_idReporte + ' ' + reporte.usuarioReporte.trim()
    descripcionHallazgos.value = reporte.hallazgos.trim()
    descripcionReporte.value = reporte.reporte.trim()
    recomendaciones.value = reporte.recomendaciones.trim()
    cargarActivo(reporte.idactivo)
    cargarSolicitud(reporte.solicitud_id)
}

const resetReporte = () => {
    inputidReporte.value = ''
    inputTipoMantenimiento.value = ''
    inputCostoMo.value = ''
    inputCostoMp.value = ''
    inputProvedorMtto.value = ''
    inputRecibidoConforme.value = ''
    inputFechaReporte.value = ''
    inputDiligenciaReporte.value = ''
    descripcionHallazgos.value = ''
    descripcionReporte.value = ''
    recomendaciones.value = ''
    inputTipoMantenimiento.readOnly = false
    inputCostoMo.readOnly = false
    inputCostoMp.readOnly = false
    inputProvedorMtto.readOnly = false
    inputRecibidoConforme.readOnly = false
    descripcionHallazgos.readOnly = false
    descripcionReporte.readOnly = false
    recomendaciones.readOnly = false
}

const datos = (accion) => {
    const data = {}
    if (accion = 'actualizar') {
        data.id = inputidReporte.value.trim()
    } else {
        data.id = ''
    }

    if (!inputIdSolicitud || inputIdSolicitud.value.trim() == '') {
        alert('Debe seleccionar una solicitud valida', divDataActivo, form, 'alert-danger')
        return
    }

    const regex = /^[0-9]*$/;
    let onlyNumbers = regex.test(inputIdSolicitud.value.trim())
    if (!onlyNumbers) {
        alert('Debe seleccionar una solicitud valida', divDataActivo, form, 'alert-danger')
        return
    }
    data.solicitud_id = inputIdSolicitud.value.trim()

    if (inputEstadoSolicitud.value.trim() == '') {
        alert('Debe seleccionar una solicitud valida', divDataActivo, form, 'alert-danger')
        return
    }

    const estadoSolicitud = inputEstadoSolicitud.value.trim().split(' ')[0]
    onlyNumbers = regex.test(estadoSolicitud)
    if (!onlyNumbers) {
        alert('Debe seleccionar un estado de solicitud valido', divDataActivo, form, 'alert-danger')
        return
    }

    data.estado = estadoSolicitud

    if (inputTipoMantenimiento.value.trim() == '') {
        alert('Debe seleccionar un tipo de Mtto valido', divDataActivo, form, 'alert-danger')
        return
    }

    const tipoMtto = inputTipoMantenimiento.value.trim().split(' ')[0]
    onlyNumbers = regex.test(tipoMtto)
    if (!onlyNumbers) {
        alert('Debe seleccionar un tipo de Mtto valido', divDataActivo, form, 'alert-danger')
        return
    }

    data.tipoMtoo_id = tipoMtto

    if (inputCostoMo.value == '') {
        alert('Debe ingresar el costo de la mano de obra ', divDataActivo, form, 'alert-danger')
        return
    }

    data.costo_mo = inputCostoMo.value

    if (inputCostoMo.value == '') {
        alert('Debe ingresar el costo de la mano de los materiales ', divDataActivo, form, 'alert-danger')
        return
    }

    data.costo_mp = inputCostoMp.value

    if (inputProvedorMtto.value.trim() == '') {
        alert('Debe seleccionar un proveedor de Mantenimeinto valido', divDataActivo, form, 'alert-danger')
        return
    }

    const proveedor = inputProvedorMtto.value.trim().split(' ')[0]
    onlyNumbers = regex.test(proveedor)
    if (!onlyNumbers) {
        alert('Debe seleccionar un proveedor de Mantenimeinto valido', divDataActivo, form, 'alert-danger')
        return
    }

    data.proveedor_id = proveedor

    if (inputRecibidoConforme.value.trim() == '') {
        alert('Debe seleccionar un usuario de aceptacion valido', divDataActivo, form, 'alert-danger')
        return
    }

    const usuarioRecibido = inputRecibidoConforme.value.trim().split(' ')[0]
    onlyNumbers = regex.test(usuarioRecibido)
    if (!onlyNumbers) {
        alert('Debe seleccionar un usuario de aceptacion valido', divDataActivo, form, 'alert-danger')
        return
    }
    data.usuario_idaprovado = usuarioRecibido

    if (!descripcionHallazgos || descripcionHallazgos.value.trim() == '') {
        alert('Debe ingresar una descripcion de los Hallazgos', divDataActivo, form, 'alert-danger')
        return
    }

    if (descripcionHallazgos.value.trim().length > 1000) {
        alert('La descripcion de los Hallazgos no puede tener mas de 1000 caracteres', divDataActivo, form, 'alert-danger')
        return
    }

    data.hallazgos = descripcionHallazgos.value.trim()

    if (!descripcionReporte || descripcionReporte.value.trim() == '') {
        alert('Debe ingresar una descripcion de los Hallazgos', divDataActivo, form, 'alert-danger')
        return
    }

    if (descripcionReporte.value.trim().length > 1000) {
        alert('La descripcion de los Hallazgos no puede tener mas de 1000 caracteres', divDataActivo, form, 'alert-danger')
        return
    }

    data.reporte = descripcionReporte.value.trim()

    if (!recomendaciones || recomendaciones.value.trim() == '') {
        alert('Debe ingresar una descripcion de los Hallazgos', divDataActivo, form, 'alert-danger')
        return
    }

    if (recomendaciones.value.trim().length > 1000) {
        alert('La descripcion de los Hallazgos no puede tener mas de 1000 caracteres', divDataActivo, form, 'alert-danger')
        return
    }

    data.recomendaciones = recomendaciones.value.trim()
    const user = JSON.parse(localStorage.getItem('userData'))
    data.usuario_idReporte = user.id
    const date = Date.now()
    data.fechareporte = new Date(date).toISOString()

    return (data)

}