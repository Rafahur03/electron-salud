const { listadoActivos, showActivo } = require('../../bd/bd')
const { resultadosActivos } = require('../../helper/mostarListado')

const codigoInterno = document.querySelector('#codigoInterno')
const nombreActivo = document.querySelector('#nombreActivo')
const marcaActivo = document.querySelector('#marcaActivo')
const modeloActivo = document.querySelector('#modeloActivo')
const serieActivo = document.querySelector('#serieActivo')
const procesoActivo = document.querySelector('#procesoActivo')
const areaActivo = document.querySelector('#areaActivo')
const ubicacionActivo = document.querySelector('#ubicacionActivo')
const estadoActivo = document.querySelector('#estadoActivo')
const idReporte = document.querySelector('#idReporte')
const fechaReporte = document.querySelector('#fechaReporte')
const idSolicitud = document.querySelector('#idSolicitud')
const fechaSolicitud = document.querySelector('#fechaSolicitud')
const fechaProximoMtto = document.querySelector('#fechaProximoMtto')
const tipoMantenimiento = document.querySelector('#tipoMantenimiento')
const tipoActivo = document.querySelector('#tipoActivo')
const descripcionSolicitud = document.querySelector('#descripcionSolicitud')
const descripcionHallazgos = document.querySelector('#descripcionHallazgos')
const descripcionReporte = document.querySelector('#descripcionReporte')
const recomendaciones = document.querySelector('#recomendaciones')
const CostoMo = document.querySelector('#CostoMo')
const costoMa = document.querySelector('#costoMa')
const ProvedorMtto = document.querySelector('#ProvedorMtto')
const diligenciaReporte = document.querySelector('#diligenciaReporte')
const recibidoConforme = document.querySelector('#recibidoConforme')
const reporteSolicitud = document.querySelector('.reporteSolicitud')
const form = document.querySelector('form')
let reportes
let solicitudes

codigoInterno.addEventListener('click', async () => {
     
    reporteSolicitud.classList.add('resultado')
    await resultadosActivos(reporteSolicitud)
    reporteSolicitud.classList.remove('reporte', 'solicitud', 'd-none')
    const resultado = document.querySelector('.resultado')

    resultado.addEventListener('dblclick',async (e) => {
        let activoId = e.path[1].id.replace('act', '')
        if (!activoId) {
            activoId = e.path[0].id.replace('act', '')
        }
        cargarDatosActivos (activoId)

        reporteSolicitud.classList.add('d-none')
    })

    codigoInterno.addEventListener('keyup', e => {
        const criterio = e.target.value.toLowerCase();
        const activos = reporteSolicitud.querySelectorAll('.infoActivo')
    
    
         activos.forEach(activo => {
             if (activo.innerText.toLowerCase().indexOf(criterio) === -1) {
                activo.classList.add('d-none')
            } else {
                activo.classList.remove('d-none')
            }
        });
     })
})




document.addEventListener('keydown', (e) => {
    if (e.keyCode == 27) {
        reporteSolicitud.classList.add('d-none')
    }
})

async function cargarDatosActivos (activoId){
    const activo = await showActivo(activoId)

        form.id = `act${activo.id}`
        codigoInterno.value = activo.id_equipo.trim()
        nombreActivo.value = activo.Nombre_activo.trim()
        marcaActivo.value = activo.Marca.trim()
        modeloActivo.value = activo.modelo.trim()
        serieActivo.value = activo.serie.trim()
        // procesoActivo
        // areaActivo
        ubicacionActivo.value = activo.ubicacion.trim()
        estadoActivo.value = activo.estado.trim()

        if (estadoActivo.value == 'Activo') {
            estadoActivo.classList.add('bg-success')
        } else {
            estadoActivo.classList.add('bg-danger')
        }
}