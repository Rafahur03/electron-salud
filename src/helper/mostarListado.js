const{listadoActivos} = require('../bd/bd')

async function cargarlistado(parent){

    const listado = await listadoActivos()

    listado.forEach(activo => {

        const items = document.createElement('tr')
        items.id = `act${activo.id}`
        items.classList.add('text-center')
        items.innerHTML=`
            <td>${activo.id_equipo}</td>
            <td>${activo.Nombre_activo}</td>
            <td>${activo.Marca}</td>
            <td>${activo.modelo}</td>
            <td>${activo.serie}</td>
            <td>${activo.ubicacion}</td>
            <td>${activo.responsable}</td>
            <td>${activo.estado}</td>
        `     
        parent.appendChild(items)

    });
}

function actualizarListado(parent, activo){
    parent.innerHTML=`
        <td>${activo.id_equipo}</td>
        <td>${activo.nombre}</td>
        <td>${activo.marca}</td>
        <td>${activo.modelo}</td>
        <td>${activo.serie}</td>
        <td>${activo.ubicacion}</td>
        <td>${activo.responsable}</td>
        <td>${activo.estado}</td>
    `     
}
module.exports ={ cargarlistado, actualizarListado } 