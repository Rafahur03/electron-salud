const { showActivo, guardarSolicitudSoporte } = require('../../bd/bd')
const { resultadosActivos } = require('../../helper/mostarListado')
const {alert} = require('../../helper/alert')

const buttonCrear = document.querySelector('.crear')
const buttonImprimir = document.querySelector('.print')
const tbody = document.querySelector('tbody')
const form = document.querySelector('form')
const divResultado = document.querySelector('.resultado')
const body = document.querySelector('body')
const divDataActivo = document.querySelector('dataActivo')

const idactivo = document.querySelector('#codigoInterno')
const nombreActivo = document.querySelector('#nombreActivo')
const modeloActivo = document.querySelector('#modeloActivo')
const marcaActivo = document.querySelector('#marcaActivo')
const serieActivo = document.querySelector('#serieActivo')
const procesoActivo = document.querySelector('#procesoActivo')
const areaActivo = document.querySelector('#areaActivo')
const ubicacionActivo = document.querySelector('#ubicacionActivo')
const estadoActivo = document.querySelector('#estadoActivo')
const fechaSolictud = document.querySelector('#fechaSolicitud')
const descripcionSolicitud = document.querySelector('#descripcionSolicitud')

buttonCrear.classList.remove('d-none')
buttonImprimir.classList.add('d-none')
const date = Date.now()
const now = new Date(date).toLocaleString()
fechaSolictud.value = now

document.addEventListener('DOMContentLoaded', async () => {
   await resultadosActivos(divResultado)
})

idactivo.addEventListener('focus', ()=>{
    divResultado.classList.remove('d-none')
})


divResultado.addEventListener('mousemove', ()=>{
    divResultado.classList.remove('d-none')
})



idactivo.addEventListener('keyup', e => {
    const criterio = e.target.value.toLowerCase();
    const activos = divResultado.querySelectorAll('.infoActivo')


     activos.forEach(activo => {
         if (activo.innerText.toLowerCase().indexOf(criterio) === -1) {
            activo.classList.add('d-none')
        } else {
            activo.classList.remove('d-none')
        }
    });
 })

divResultado.addEventListener('dblclick', async e => {
    let activoId  = e.path[1].id.replace('act','')
     if(!activoId){
         activoId  = e.path[0].id.replace('act','')
    }
    const activo = await showActivo(activoId)

    form.id = `act${activo.id}`
    idactivo.value = activo.id_equipo.trim()
    nombreActivo.value = activo.Nombre_activo.trim()
    marcaActivo.value = activo.Marca.trim()
    modeloActivo.value = activo.modelo.trim()
    serieActivo.value = activo.serie.trim()
    // procesoActivo
    // areaActivo
    ubicacionActivo.value = activo.ubicacion.trim()
    estadoActivo.value = activo.estado.trim()
    if(estadoActivo.value =='Activo'){
        estadoActivo.classList.add('bg-success')
    }else{
        estadoActivo.classList.add('bg-danger')
    }

     divResultado.classList.add('d-none')
})

buttonCrear.addEventListener('click', async ()=>{
   const  userData= localStorage.getItem('userData')

   if(!userData){
    alert('Debe iniciar sesionpara poder realizar su solicitud', body, divDataActivo, 'alert-danger' )
    return
    }

   if(nombreActivo.value ===''){
    alert('Debe seleccionar un activo valido', body, divDataActivo, 'alert-warning')
    return
   }
   if(descripcionSolicitud.value ===''){
    alert('Debe ingresar una descripcion valida', body, divDataActivo, 'alert-warning')
    return
   }
  
   const solicitud = {
        usuario: userData.id,
        idequipo:idactivo.value,
        descripcion: descripcionSolicitud.value,
        fechaSolictud: new Date(date).toLocaleDateString(),
        estado:'Abierto'
   }

   const idSolicitud= await guardarSolicitudSoporte(solicitud)
   alert(`Su solicitud ha sido creada correctamente con el ID ${idSolicitud.id} `, body, divDataActivo, 'alert-success')
})