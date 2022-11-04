const{listadoActivos,
     actualizarListado,
      consultarSolicitudesActivo,
      consultarReporteMantenimiento} = require('../bd/bd')

async function cargarlistado(parent){

    const listado = await listadoActivos()
    listado.forEach(activo => {
        if(activo.estado.trim() !=='Eliminado'){
        //falta if para no mostrar los eliminados
            const items = document.createElement('tr')
            items.id = `act${activo.id}`
            items.classList.add('text-center')
            items.innerHTML=`
                <td>${activo.siglas.trim()}${activo.consecutivo_interno.trim()}</td>
                <td>${activo.nombreActivo.trim()}</td>
                <td>${activo.marca.trim()}</td>
                <td>${activo.modelo.trim()}</td>
                <td>${activo.serie.trim()}</td> 
                <td>${activo.ubicacion.trim()}</td>
                <td>${activo.nombre.trim()} ${activo.nombre_1.trim()} ${activo.apellido.trim()} ${activo.apellido_1.trim()}</td>
                <td>${activo.estado.trim()}</td>
            `       
            parent.appendChild(items)
        }
    });
}

async function resultadosActivos(parent){

    const listado = await listadoActivos()

    listado.forEach(activo => {

        if(activo.estado.trim() !=='Eliminado'){
            const items = document.createElement('div')
            items.id = `act${activo.id}`
            items.classList.add('bd-highlight', 'd-block', 'm-1', 'infoActivo')
            items.innerHTML=`
                <div class="p-2 d-inline bd-highlight">${activo.siglas.trim()}${activo.consecutivo_interno.trim()}</div>
                <div class="p-2 d-inline bd-highlight">${activo.nombreActivo.trim()}</div>
                <div class="p-2 d-inline bd-highlight">${activo.marca.trim()}</div>
                <div class="p-2 d-inline bd-highlight">${activo.modelo.trim()}</div>
                <div class="p-2 d-inline bd-highlight">${activo.serie.trim()}</div>
                <div class="p-2 d-inline bd-highlight">${activo.ubicacion.trim()}</div>
                <div class="p-2 d-inline bd-highlight">${activo.nombre.trim()} ${activo.nombre_1.trim()} ${activo.apellido.trim()} ${activo.apellido_1.trim()}</div>
                <div class="p-2 d-inline bd-highlight">${activo.estado.trim()}</div>
            `     
            parent.appendChild(items)
        }

    });
}

async function crudActivo (parent, activo){

    switch (activo.accion){
        case 'actualizar':
            const actualizarActivo = await actualizarListado(activo.id)
            parent.innerHTML= `
            <td>${actualizarActivo.siglas.trim()}${actualizarActivo.consecutivo_interno.trim()}</td>
            <td>${actualizarActivo.nombreActivo.trim()}</td>
            <td>${actualizarActivo.marca.trim()}</td>
            <td>${actualizarActivo.modelo.trim()}</td>
            <td>${actualizarActivo.serie.trim()}</td> 
            <td>${actualizarActivo.ubicacion.trim()}</td>
            <td>${actualizarActivo.nombre.trim()} ${actualizarActivo.nombre_1.trim()} ${actualizarActivo.apellido.trim()} ${actualizarActivo.apellido_1.trim()}</td>
            <td>${actualizarActivo.estado.trim()}</td>
            `     
        break;

        case 'eliminar':
            parent.remove()      
        break;

        case 'crear':
            const newActivo = showActivo(activo.id)
            const items = document.createElement('tr')
            items.id = `act${newActivo.id}`
            items.classList.add('text-center')
            items.innerHTML=`
            <td>${newActivo.siglas.trim()}${newActivo.consecutivo_interno.trim()}</td>
            <td>${newActivo.nombreActivo.trim()}</td>
            <td>${newActivo.marca.trim()}</td>
            <td>${newActivo.modelo.trim()}</td>
            <td>${newActivo.serie.trim()}</td> 
            <td>${newActivo.ubicacion.trim()}</td>
            <td>${newActivo.nombre.trim()} ${newActivo.nombre_1.trim()} ${newActivo.apellido.trim()} ${newActivo.apellido_1.trim()}</td>
            <td>${newActivo.estado.trim()}</td>
            `     
            parent.appendChild(items)     
        break;

        default:    
        break;
    }

}

async function cargarOptionActivosSolicitud(parent){

    const listado = await listadoActivos()

    listado.forEach(activo => {

        if(activo.estado.trim() !=='Eliminado' && activo.estado.trim() !=='Dado de baja'){
            const item = document.createElement('option')
            item.classList.add('bd-highlight', 'd-block', 'm-1')
            item.value =  activo.id
            item.textContent = `${activo.siglas.trim()}${activo.consecutivo_interno.trim()} - ${activo.nombreActivo.trim()} - ${activo.marca.trim()} - ${activo.modelo.trim()} - ${activo.serie.trim()} - ${activo.ubicacion.trim()} - ${activo.nombre.trim()} ${activo.nombre_1.trim()} ${activo.apellido.trim()} ${activo.apellido_1.trim()} - ${activo.estado.trim()}`
            parent.appendChild(item)
        }

    });
}

async function cargarOptionSolcitudes(parent, id){
    let listado
    if(id){
        listado = await consultarSolicitudesActivo(id)   
    }else{
        listado = await consultarSolicitudesActivo()
    }
    
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    listado.forEach(solicitud => {

        if(solicitud.estado.trim() !=='Eliminada'){
            const item = document.createElement('option')
            item.classList.add('bd-highlight', 'd-block', 'm-1')
            item.value =  solicitud.id
            item.textContent = `${solicitud.siglas.trim()}${solicitud.consecutivo_interno} - ${solicitud.nombre.trim()} ${solicitud.nombre_1.trim()} ${solicitud.apellido.trim()} ${solicitud.apellido_1.trim()} - ${solicitud.estado.trim()}`
            parent.appendChild(item)
        }

    });
}

async function cargarOptionrReporte(parent, id){
    let listado
    if(id){
        listado = await consultarReporteMantenimiento(id)   
    }else{
        listado = await consultarReporteMantenimiento()
    }
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
      }
    listado.forEach(reporte => {
       
            const item = document.createElement('option')
            item.classList.add('bd-highlight', 'd-block', 'm-1')
            item.value =  reporte.id
            item.textContent = `${reporte.siglas.trim()}${reporte.consecutivo_interno} ${reporte.nombre.trim()} ${reporte.tipoMtto.trim()} ${reporte.fechareporte.toLocaleString('en-GB')} ${reporte.razon_social} ${reporte.usuarioReporte}   `
            parent.appendChild(item)
        

    });
}
   
module.exports ={
    cargarlistado,
    crudActivo,
    resultadosActivos,
    cargarOptionActivosSolicitud,
    cargarOptionSolcitudes,
    cargarOptionrReporte
} 