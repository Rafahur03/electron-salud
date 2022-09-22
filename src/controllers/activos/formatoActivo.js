const { ipcRenderer } = require('electron')
const { activo } = require('../../bd/bd')

const buttonCrear = document.querySelector('.crear')
const buttonActualizar = document.querySelector('.actualizar')
const buttonImprimir = document.querySelector('.print')
const buttonSalir = document.querySelector('.salir')
const buttonEliminar = document.querySelector('.eliminar')

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
const tbody = document.querySelector('tbody')


ipcRenderer.on('activoId', async (e, activoId) => {

   const dataActivo = await activo(activoId)
   idactivo.value = dataActivo.id_equipo.trim()
   nombreActivo.value  = dataActivo.Nombre_activo.trim()
   marcaActivo.value = dataActivo.Marca.trim()
   modeloActivo.value = dataActivo.modelo.trim()
   serieActivo.value = dataActivo.serie.trim()
   ubicacionActivo.value = dataActivo.ubicacion.trim()
   estadoActivo.value = dataActivo.estado.trim()
   responsableActivo.value = dataActivo.responsable
   buttonCrear.classList.add('d-none')
})

estadoActivo.addEventListener('change',(e)=>{
  if(e.target.value ='Activo'){
   console.log(estadoActivo)
  }
})