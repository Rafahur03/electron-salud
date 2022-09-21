const{listadoActivos} = require('../bd/bd')

async function cargarlistado(parent){

    const listado = await listadoActivos()

    listado.forEach(activo => {

        const items = document.createElement('tr')
        items.setAttribute('id', activo.id)
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
            <td><button type="button" class="btn btn-warning">Editar</button></td>
            <td><button type="button" class="btn btn-danger">Eliminar</button></td>

        `

       
        parent.appendChild(items)

    });
}

module.exports ={ cargarlistado }