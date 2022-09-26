const { ipcRenderer } = require('electron')
const { showActivo, actualizarActivo, crearActivo, eliminarActivo } = require('../../bd/bd')

const buttonCrear = document.querySelector('.crear')
const buttonActualizar = document.querySelector('.actualizar')
const buttonImprimir = document.querySelector('.print')
const buttonSolicitar = document.querySelector('.solicitar')
const buttonEliminar = document.querySelector('.eliminar')
const form = document.querySelector('form')

const idactivo = document.querySelector('#codigoInterno')
const nombreActivo = document.querySelector('#nombreActivo')
const modeloActivo = document.querySelector('#modeloActivo')
const marcaActivo = document.querySelector('#marcaActivo')
const serieActivo = document.querySelector('#serieActivo')
const procesoActivo = document.querySelector('#procesoActivo')
const areaActivo = document.querySelector('#areaActivo')
const ubicacionActivo = document.querySelector('#ubicacionActivo')
const estadoActivo = document.querySelector('#estadoActivo')
const fechaCompra = document.querySelector('#fechaCompra')
const proveedorActivo = document.querySelector('#proveedorActivo')
const nitProveedor = document.querySelector('#nitProveedor')
const facturaActivo = document.querySelector('#facturaActivo')
const valorActivo = document.querySelector('#valorActivo')
const garantiaActivo = document.querySelector('#garantiaActivo')
const frecuenciaMtto = document.querySelector('#frecuenciaMtto')
const ultimoMtto = document.querySelector('#ultimoMtto')
const proximoMtto = document.querySelector('#proximoMtto')
const ingresoActivo = document.querySelector('#ingresoActivo')
const descripcionActivo = document.querySelector('#descripcionActivo')
const recomendacionActivo = document.querySelector('#recomendacionActivo')
const observacionActivo = document.querySelector('#observacionActivo')
const responsableActivo = document.querySelector('#responsableActivo')
const tipoActivo = document.querySelector('#tipoActivo')
const tbody = document.querySelector('tbody')



ipcRenderer.on('crear', (e, crear) => {
    buttonCrear.classList.remove('d-none')
    buttonActualizar.classList.add('d-none')
    buttonImprimir.classList.add('d-none')
    buttonSolicitar.classList.add('d-none')
    buttonEliminar.classList.add('d-none')
})

ipcRenderer.on('activoId', async (e, activoId) => {

    const dataActivo = await showActivo(activoId)
    console.log(dataActivo)
    form.id = `act${dataActivo.id}`
    idactivo.value = dataActivo.id_equipo.trim()
    nombreActivo.value = dataActivo.Nombre_activo.trim()
    marcaActivo.value = dataActivo.Marca.trim()
    modeloActivo.value = dataActivo.modelo.trim()
    serieActivo.value = dataActivo.serie.trim()
    ubicacionActivo.value = dataActivo.ubicacion.trim()
    estadoActivo.value = dataActivo.estado.trim()
    responsableActivo.value = dataActivo.responsable
    tipoActivo.value = dataActivo.tipo_Activo
    buttonCrear.classList.add('d-none')
    buttonActualizar.classList.remove('d-none')
    buttonImprimir.classList.remove('d-none')
    buttonSolicitar.classList.remove('d-none')
    buttonEliminar.classList.remove('d-none')

    if (estadoActivo.value === 'Activo') {
        estadoActivo.classList.add('text-success')
    } else {
        estadoActivo.classList.add('text-danger')
    }

})


buttonCrear.addEventListener('click', async (e) => {
    const activo = datos()
    const resp = await crearActivo(activo)

    if(resp===0){
        return
    }

    form.id = `act${resp.id}`
    idactivo.value = resp.id_equipo.trim()
    buttonCrear.classList.add('d-none')
    buttonActualizar.classList.remove('d-none')
    buttonImprimir.classList.remove('d-none')
    buttonSolicitar.classList.remove('d-none')
    buttonEliminar.classList.remove('d-none')
})

buttonActualizar.addEventListener('click', async () => {
    const activo = datos()
    const resp =  await actualizarActivo(activo)
    if( resp===0){
        return
    }
    ipcRenderer.send('activoActualizado', activo)
})

buttonEliminar.addEventListener('click',( e )=>{
    const activo= datos()
    ipcRenderer.send('eliminarActivo', activo)
})

ipcRenderer.on('confirmarEliminar', async (e, dataActivo)=>{
    //const resp =  await eliminarActivo(dataActivo)
    console.log('resp')
})

const datos = () => {
    const id = form.id.replace('act', '')
    const activo = {
        id,
        id_equipo: idactivo.value,
        nombre: nombreActivo.value,
        marca: marcaActivo.value,
        modelo: modeloActivo.value,
        serie: serieActivo.value,
        ubicacion: ubicacionActivo.value,
        estado: estadoActivo.value,
        responsable: responsableActivo.value,
        tipo: tipoActivo.value
    }
    return activo
}