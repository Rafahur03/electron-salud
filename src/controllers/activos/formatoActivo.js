const { ipcRenderer } = require('electron')
const { dataConfActivo,
    showActivo,
    actualizarActivo,
    crearActivo,
    eliminarActivo,
    usuario } = require('../../bd/bd')
const { alert } = require('../../helper/alert')

const body = document.querySelector('body')
// botones

const buttonCrear = document.querySelector('.crear')
const buttonActualizar = document.querySelector('.actualizar')
const buttonImprimir = document.querySelector('.print')
const buttonSolicitar = document.querySelector('.solicitar')
const buttonEliminar = document.querySelector('.eliminar')
const img = document.querySelector('#imgActivo')
//formulario 
const form = document.querySelector('form')

const inputClasificacionActivos = document.querySelector('#clasificacionActivo')
const inputIdactivo = document.querySelector('#codigoInterno')
const inputNombreActivo = document.querySelector('#nombreActivo')
const inputMarcaActivo = document.querySelector('#marcaActivo')
const inputModeloActivo = document.querySelector('#modeloActivo')
const inputSerieActivo = document.querySelector('#serieActivo')
const inputProcesoActivo = document.querySelector('#procesoActivo')
const inputAreaActivo = document.querySelector('#areaActivo')
const inputUbicacionActivo = document.querySelector('#ubicacionActivo')
const inputResponsableActivo = document.querySelector('#responsableActivo')
const inputEstadoActivo = document.querySelector('#estadoActivo')
const inputProveedorActivo = document.querySelector('#proveedorActivo')
const inputFacturaActivo = document.querySelector('#facturaActivo')
const inputValorActivo = document.querySelector('#valorActivo')
const inputFechaCompra = document.querySelector('#fechaCompra')
const inputGarantiaActivo = document.querySelector('#garantiaActivo')
const inputFrecuenciaMtto = document.querySelector('#frecuenciaMtto')
const inputDescripcionActivo = document.querySelector('#descripcionActivo')
const inputRecomendacionActivo = document.querySelector('#recomendacionActivo')
const inputObservacionActivo = document.querySelector('#observacionActivo')
const inputTipoActivo = document.querySelector('#tipoActivo')

//label

const labelClasificacionActivo = document.querySelector('.clasificacionActivo')
const labelCodigoInterno = document.querySelector('.codigoInterno')

// imput solo se muestran al editar
const inputIngresoActivo = document.querySelector('#ingresoActivo')
const inputUltimoMtto = document.querySelector('#ultimoMtto')
const inputProximoMtto = document.querySelector('#proximoMtto')
const inputNitProveedor = document.querySelector('#nitProveedor')
//div solo se muestran al editar
const divhistorialMantenimiento = document.querySelector('.historialMantenimiento')
const divNitProveedor = document.querySelector('.nitProveedor')
const divIngresoActivo = document.querySelector('.ingresoActivo')
const divUltimoMtto = document.querySelector('.ultimoMtto')
const divProximoMtto = document.querySelector('.proximoMtto')
const divDataActivo = document.querySelector('.dataActivo')

const tbody = document.querySelector('tbody')
// Datalist
const listClasificacionActivo = document.querySelector('#listClasificacionActivo')
const listMarcas = document.querySelector('#listMarcas')
const listProceso = document.querySelector('#listProceso')
const listaAreas = document.querySelector('#listaAreas')
const listaEstado = document.querySelector('#listaEstado')
const listaProveedores = document.querySelector('#listaProveedores')
const listaTipoActivo = document.querySelector("#listaTipoActivo")
const listaUsuario = document.querySelector('#listaUsuario')
const listaFrecuencia = document.querySelector('#listaFrecuencia')

//dataconfg
let clasificacionActivos
let marca
let procesos
let areas
let proveedores
let tipoActivos
let estadoActivo
let usuarios
let frecuenciaMtto
// desde menu crear activo

document.addEventListener('DOMContentLoaded', async () => {
    const config = JSON.parse(localStorage.getItem('configActivos'))
    clasificacionActivos = config[0]
    marca = config[1]
    procesos = config[2]
    areas = config[3]
    proveedores = config[4]
    tipoActivos = config[5]
    estadoActivo = config[6]
    usuarios = config[7]
    frecuenciaMtto =config[8]

    clasificacionActivos.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.nombre.trim()
            option.textContent = item.siglas.trim()
            listClasificacionActivo.appendChild(option)
        }
    })
    marca.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.marca.trim()
            option.textContent = item.id
            listMarcas.appendChild(option)
        }
    })
    procesos.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.proceso.trim()
            option.textContent = item.id
            listProceso.appendChild(option)
        }
    })
    areas.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.area.trim()
            option.textContent = item.id
            listaAreas.appendChild(option)
        }
    })
    estadoActivo.forEach(item => {
        if (item.id !== 3) {
            const option = document.createElement('option')
            option.value = item.estado.trim()
            option.textContent = item.id
            listaEstado.appendChild(option)
        }
    })
    proveedores.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = `${item.razon_social.trim()} - ${item.nit.trim()} - ${item.nombre_comercial.trim()} `
            option.textContent = item.id
            listaProveedores.appendChild(option)
        }
    })
    tipoActivos.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.tipo_activo.trim()
            option.textContent = item.id
            listaTipoActivo.appendChild(option)
        }
    })
    usuarios.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.textContent = item.id
            option.value
            if (item.nombre_1 === '') {
                option.value = `${item.nombre.trim()} ${item.apellido.trim()} ${item.apellido_1.trim()}`
            } else {
                option.value = `${item.nombre.trim()} ${item.nombre_1.trim()} ${item.apellido.trim()} ${item.apellido_1.trim()}`
            }
            listaUsuario.appendChild(option)
        }
    })
    
    frecuenciaMtto.forEach(item => {
        if (item.estado !== 3) {
            const option = document.createElement('option')
            option.value = item.frecuencia.trim()
            option.textContent = item.id
            listaFrecuencia.appendChild(option)
        }
    })

})

inputProveedorActivo.addEventListener('change',(e)=>{
   const nit= e.target.value.split(' - ')[1]
   typeof nit

   if(typeof nit === 'undefined'){
    inputNitProveedor.value=''
    return
   }
   
   inputNitProveedor.value = nit
})


// crear un nuevo activo
buttonCrear.addEventListener('click', async (e) => {
    const activo = datos()
    if(!activo){
       return
    }

    const newActivo = await crearActivo(activo)
    if (newActivo === 0 || newActivo =='err') {
        alert('No fue posible guardar los datos, intentelo mas tarde', body, divDataActivo, 'alert-danger')
        return
    }
    inputClasificacionActivos.classList.add('d-none')
    inputIdactivo.classList.remove('d-none')
    form.id = `act${newActivo.id}`
    
    inputIdactivo.value = newActivo.siglas.trim() + newActivo.consecutivo_interno

    buttonCrear.classList.add('d-none')
    buttonActualizar.classList.remove('d-none')
    buttonImprimir.classList.remove('d-none')
    buttonSolicitar.classList.remove('d-none')
    buttonEliminar.classList.remove('d-none')
    const data = {
        id:newActivo.id,
        accion:'crear'
    }
    console.log(data)
    ipcRenderer.send('crudActivo', data)
    alert('Activo creado correctamente', body, divDataActivo, 'alert-success')
    if (newActivo.estado.trim() === 'Activo') {
        inputEstadoActivo.classList.add('text-success')
    } else {
        inputEstadoActivo.classList.add('text-danger')
    }


})

// actualiza los datos del activos seleccionado 
buttonActualizar.addEventListener('click', async () => {
    const activo = datos()

    if(!activo){
        return
     }
    const resp = await actualizarActivo(activo)

    if (resp === 0) {
        alert('No se pudo cargar los datos correctamente', body, divDataActivo, 'alert-danger')
        return
    }
    const data = {
        id:activo.id,
        accion:'actualizar'
    }
    ipcRenderer.send('crudActivo', data)
    alert('Activo actualizado correctamente', body, divDataActivo, 'alert-success')
})

// elimina un activo escogido del listado 
buttonEliminar.addEventListener('click', (e) => {
    const activo = datos()
    ipcRenderer.send('eliminarActivo', activo)
})

ipcRenderer.on('confirmarEliminar', async (e, dataActivo) => {
    const id = parseInt(dataActivo.id)
    const resp = await eliminarActivo(id)
    if (resp === 0) {
        alert('No se pudo eliminar el activo, intentalo mas tarde', body, divDataActivo, 'alert-danger')
        return
    }
    ipcRenderer.send('activoEliminado')
    dataActivo.accion = 'eliminar'
    ipcRenderer.send('crudActivo', dataActivo)
    alert('Activo Eliminado correctamente correctamente', body, divDataActivo, 'alert-success')
    setTimeout(() => {
        form.id = ""
        idactivo.value = ""
        nombreActivo.value = ""
        modeloActivo.value = ""
        marcaActivo.value = ""
        serieActivo.value = ""
        procesoActivo.value = ""
        areaActivo.value = ""
        ubicacionActivo.value = ""
        estadoActivo.value = ""
        fechaCompra.value = ""
        proveedorActivo.value = ""
        nitProveedor.value = ""
        facturaActivo.value = ""
        valorActivo.value = ""
        garantiaActivo.value = ""
        frecuenciaMtto.value = ""
        ultimoMtto.value = ""
        proximoMtto.value = ""
        ingresoActivo.value = ""
        descripcionActivo.value = ""
        recomendacionActivo.value = ""
        observacionActivo.value = ""
        responsableActivo.value = ""
        tipoActivo.value = ""
        tbody.value = ""
    }, 3000)
})

// desde listado activo

// muestra los datos del activo seleccionado del listdo
ipcRenderer.on('activoId', async (e, activoId) => {
    inputIdactivo.classList.remove('d-none')
    labelCodigoInterno.classList.remove('d-none')
    labelClasificacionActivo.classList.add('d-none')
    inputClasificacionActivos.classList.add('d-none')   
    buttonCrear.classList.add('d-none')
    buttonActualizar.classList.remove('d-none')
    buttonImprimir.classList.remove('d-none')
    buttonSolicitar.classList.remove('d-none')
    buttonEliminar.classList.remove('d-none')
    divhistorialMantenimiento.classList.remove('d-none')

    const activo = await showActivo(activoId)

    form.id= `act${activo.id}`
    inputIdactivo.value = activo.siglas.trim() + activo.consecutivo_interno
    inputNombreActivo.value = activo.nombreActivo.trim()
    inputMarcaActivo.value = activo.marca.trim()
    inputModeloActivo.value = activo.modelo.trim()
    inputSerieActivo.value = activo.serie.trim()
    inputProcesoActivo.value = activo.proceso.trim()
    inputAreaActivo.value = activo.area.trim()
    inputUbicacionActivo.value = activo.ubicacion.trim()
    
    if (activo.nombre_1 === '') {
        inputResponsableActivo.value = `${activo.nombre.trim()} ${activo.apellido.trim()} ${activo.apellido_1.trim()}`
    } else {
        inputResponsableActivo.value = `${activo.nombre.trim()} ${activo.nombre_1.trim()} ${activo.apellido.trim()} ${activo.apellido_1.trim()}`
    }
   
    inputEstadoActivo.value = activo.estado.trim()
    inputProveedorActivo.value =  `${activo.razon_social.trim()} - ${activo.nit.trim()} - ${activo.nombre_comercial.trim()} `
    inputNitProveedor.value = activo.nit.trim()
    inputFacturaActivo.value = activo.numero_factura.trim()
    inputValorActivo.value = activo.valor
    inputFechaCompra.value = activo.fecha_compra.toISOString().slice(0, 10)
    inputGarantiaActivo.value = activo.vencimiento_garantia.toISOString().slice(0, 10)
    inputFrecuenciaMtto.value = activo.frecuencia.trim()
    inputDescripcionActivo.value = activo.descripcion.trim()
    inputRecomendacionActivo.value = activo.recomendaciones_Mtto.trim()
    inputObservacionActivo.value = activo.obervacion.trim()
    inputTipoActivo.value = activo.tipo_activo.trim()

    if (inputEstadoActivo.value === 'Activo') {
        inputEstadoActivo.classList.remove('text-danger')
        inputEstadoActivo.classList.add('text-success')
    } else {
        inputEstadoActivo.classList.add('text-danger')
        estadinputEstadoActivooActivo.classList.remove('text-success')
    }

})

// solcitar mtto

buttonSolicitar.addEventListener('click', () => {
    console.log('clik')
    const activo = datos()
    ipcRenderer.send('ventanaSolicitudMtto', activo)

})

const datos = () => {
    
    let id, clasificacion_id, consecutivo_interno, marca_id, proceso_id, area_id, usuario_id, estado_id, proveedor_id, frecuencia_id, tipo_activo_id, create_by, fecha_creacion, nombre, modelo, serie, ubicacion, numero_factura, valor, fecha_compra, vencimiento_garantia, descripcion, recomendaciones_Mtto, obervacion
  
    if (form.id) {
        id = parseInt(form.id.replace('act', ''))
    }

    if (inputClasificacionActivos.value) {  
        console.log(1)
        const index= clasificacionActivos.findIndex(item => item.nombre.trim() === inputClasificacionActivos.value.trim())
        if (index !== -1) {
            clasificacion_id = clasificacionActivos[index].id
            inputClasificacionActivos.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar una clasificacion del listado', body, divDataActivo, 'alert-danger')
            inputClasificacionActivos.classList.add('border-danger')
            return
        }
    }else{
        if (inputIdactivo.value) {
            let codigo = inputIdactivo.value.trim()
            codigo = codigo.match(/[a-z]+|[^a-z]+/gi).join(" ").replace(/\s+/g, " ").split(' ')
            consecutivo_interno = codigo[1]
    
            const index = clasificacionActivos.findIndex( item => item.siglas.trim() === codigo[0] )
            if (index !== -1) {
                clasificacion_id = clasificacionActivos[index].id
            }
        }else{
            alert('Debe seleccionar una clasificacion del listado', body, divDataActivo, 'alert-danger')
            inputClasificacionActivos.classList.add('border-danger')
            return
        }    
    }

    if (inputMarcaActivo.value) {
        const index = marca.findIndex(item => item.marca.trim() === inputMarcaActivo.value.trim())
         if (index !== -1) {
            marca_id = marca[index].id
            inputMarcaActivo.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar una marca del listado', body, divDataActivo, 'alert-danger')
            inputMarcaActivo.classList.add('border-danger')
            return
        }
    }else{
        alert('Debe seleccionar una marca del listado', body, divDataActivo, 'alert-danger')
        inputMarcaActivo.classList.add('border-danger')
        return
    }

    if (inputProcesoActivo.value) {
        const index = procesos.findIndex(item => item.proceso.trim() === inputProcesoActivo.value.trim() )
        if (index !== -1) {
            proceso_id = procesos[index].id
            inputProcesoActivo.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar un proceso del listado', body, divDataActivo, 'alert-danger')
            inputProcesoActivo.classList.add('border-danger')
            return
        }
    }else{
        alert('Debe seleccionar un proceso del listado', body, divDataActivo, 'alert-danger')
        inputProcesoActivo.classList.add('border-danger')
        return
    }

    if (inputAreaActivo.value) {
        const index = areas.findIndex( item => item.area.trim() === inputAreaActivo.value.trim() )
        if (index !== -1) {
            area_id = areas[index].id
            inputAreaActivo.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar un proceso del listado', body, divDataActivo, 'alert-danger')
            inputAreaActivo.classList.add('border-danger')
            return
        }
    }else{
        alert('Debe seleccionar un proceso del listado', body, divDataActivo, 'alert-danger')
        inputAreaActivo.classList.add('border-danger')
        return
    }

    if (inputResponsableActivo.value) {
        usuarios.forEach(item => {
            if (item.nombre_1 === '') {
                const nombre = `${item.nombre.trim()} ${item.apellido.trim()} ${item.apellido_1.trim()}`
                if (nombre === inputResponsableActivo.value.trim()) {
                    usuario_id = item.id 
                    inputResponsableActivo.classList.remove('border-danger')
                }
            } else {
                const nombre = `${item.nombre.trim()} ${item.nombre_1.trim()} ${item.apellido.trim()} ${item.apellido_1.trim()}`
                if (nombre === inputResponsableActivo.value.trim()) {
                    usuario_id = item.id
                    inputResponsableActivo.classList.remove('border-danger')
                }           
            }
        })
        if(!usuario_id){
            alert('Debe seleccionar un responsable del listado', body, divDataActivo, 'alert-danger')
            inputResponsableActivo.classList.add('border-danger')
        return
        }

    }else{
        alert('Debe seleccionar un responsable del listado', body, divDataActivo, 'alert-danger')
        inputResponsableActivo.classList.add('border-danger')
        return
    }

    if (inputEstadoActivo.value) {
        const index = estadoActivo.findIndex(item => item.estado.trim() === inputEstadoActivo.value.trim() )
        if (index !== -1) {
            estado_id = estadoActivo[index].id
            inputEstadoActivo.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar un estado del listado', body, divDataActivo, 'alert-danger')
            inputEstadoActivo.classList.add('border-danger')
            return
        }
    }else{
        alert('Debe seleccionar un estado del listado', body, divDataActivo, 'alert-danger')
        inputEstadoActivo.classList.add('border-danger')
        return
    }
    
    if (inputProveedorActivo.value) {
        const razonSocial = inputProveedorActivo.value.split(' - ')[0].trim()
        const index = proveedores.findIndex(item => item.razon_social.trim() === razonSocial)
        if (index !== -1) {
            proveedor_id = proveedores[index].id
            inputProveedorActivo.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar un proveedor del listado', body, divDataActivo, 'alert-danger')
            inputProveedorActivo.classList.add('border-danger')
            return
        }
    }else{
        alert('Debe seleccionar un proveedor del listado', body, divDataActivo, 'alert-danger')
        inputProveedorActivo.classList.add('border-danger')
        return
    }

    if (inputFrecuenciaMtto.value) {
        const index = frecuenciaMtto.findIndex(item => item.frecuencia.trim() === inputFrecuenciaMtto.value.trim() )
        if (index !== -1) {
            frecuencia_id = frecuenciaMtto[index].id
            inputFrecuenciaMtto.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar una frecuencia del listado', body, divDataActivo, 'alert-danger')
            inputFrecuenciaMtto.classList.add('border-danger')
            return
        }
    }else{
        alert('Debe seleccionar una frecuencia del listado', body, divDataActivo, 'alert-danger')
        inputFrecuenciaMtto.classList.add('border-danger')
        return
    }

    if (inputTipoActivo.value) {
        const index = tipoActivos.findIndex(item => item.tipo_activo.trim() === inputTipoActivo.value.trim() )
        if (index !== -1) {
            tipo_activo_id = tipoActivos[index].id
            inputTipoActivo.classList.remove('border-danger')
        }else{
            alert('Debe seleccionar un tipo de activi del listado', body, divDataActivo, 'alert-danger')
            inputTipoActivo.classList.add('border-danger')
            return
        }
    }else{
        alert('Debe seleccionar un tipo de actividad del listado', body, divDataActivo, 'alert-danger')
        inputTipoActivo.classList.add('border-danger')
        return
    }

    if (!id){
        const user = JSON.parse(localStorage.getItem('userData'))
        create_by = user.id
        fecha_creacion = new Date().toISOString().slice(0, 10)
    }

    if(inputNombreActivo.value){
        const validar = validarInput(inputNombreActivo, 60, 'nombre','obligatorio' )
        if(!validar){
            return
        }
        nombre= validar
    }else{
        alert('Debe ingresar un nombre', body, divDataActivo, 'alert-danger')
        inputNombreActivo.classList.add('border-danger')
        return
    }

    if(inputModeloActivo.value){
        const validar = validarInput(inputModeloActivo, 30, 'modelo')
        if(!validar){
            return
        }
        modelo= validar
    }else{
        alert('El campo modelo esta vacio si no lo conoce ingrese no registra', body, divDataActivo, 'alert-danger')
        inputModeloActivo.classList.add('border-danger')
        return
    }

    if(inputSerieActivo.value){
        const validar = validarInput(inputSerieActivo, 50, 'serie')
        if(!validar){
            return
        }
        serie= validar
    }else{
        alert('El campo serie esta vacio si no lo conoce ingrese no registra', body, divDataActivo, 'alert-danger')
        inputSerieActivo.classList.add('border-danger')
        return
    }

    if(inputUbicacionActivo.value){
        const validar = validarInput(inputUbicacionActivo, 50, 'ubicacion','obligatorio')
        if(!validar){
            return
        }
        ubicacion = validar
    }else{
        alert('El campo ubicacion es obligatorio', body, divDataActivo, 'alert-danger')
        inputUbicacionActivo.classList.add('border-danger')
        return
    }

    if(inputFacturaActivo.value){
        const validar = validarInput(inputFacturaActivo, 30, 'Numero de factura')
        if(!validar){
            return
        }
        numero_factura = validar
    }else{
        alert('El campo factura esta vacio si no lo conoce ingrese no registra', body, divDataActivo, 'alert-danger')
        inputFacturaActivo.classList.add('border-danger')
        return
    }

    if(inputValorActivo.value){
        const validar = validarInput(inputValorActivo, 15, 'valor')
        if(!validar){
            return
        }
        valor = validar
    }else{
        alert('El campo valor esta vacio si no lo conoce ingrese 0', body, divDataActivo, 'alert-danger')
        inputValorActivo.classList.add('border-danger')
        return
    }

    if(inputFechaCompra.value){
        const validar = validarInput(inputFechaCompra, 10, 'fecha de compra', 'obligatorio')
        if(!validar){
            return
        }
        fecha_compra = validar
    }else{
        alert('El campo fecha de compra es obligatorio', body, divDataActivo, 'alert-danger')
        inputFechaCompra.classList.add('border-danger')
        return
    }

    if(inputGarantiaActivo.value){
        const validar = validarInput(inputGarantiaActivo, 10, 'vencimiento de garantia', 'obligatorio')
        if(!validar){
            return
        }
        vencimiento_garantia = validar
    }else{
        alert('El campo vencimiento de garantia es obligatorio', body, divDataActivo, 'alert-danger')
        inputGarantiaActivo.classList.add('border-danger')
        return
    }

    if(inputDescripcionActivo.value){
        const validar = validarInput(inputDescripcionActivo, 1000, 'descripcion equipo')
        if(!validar){
            return
        }
        descripcion = validar
    }else{
        alert('El campo descripcion esta vacio si no lo conoce ingrese no registra', body, divDataActivo, 'alert-danger')
        inputDescripcionActivo.classList.add('border-danger')
        return
    }

    if(inputRecomendacionActivo.value){
        const validar = validarInput(inputRecomendacionActivo, 500, 'Recomendaciones de Mtto')
        if(!validar){
            return
        }
        recomendaciones_Mtto = validar
    }else{
        alert('El campo Recomendaciones de Mtto esta vacio si no lo conoce ingrese no registra', body, divDataActivo, 'alert-danger')
        inputRecomendacionActivo.classList.add('border-danger')
        return
    }

    if(inputObservacionActivo.value){
        const validar = validarInput(inputObservacionActivo, 500, 'observacion')
        if(!validar){
            return
        }
        obervacion = validar
    }else{
        alert('El campo observacion esta vacio si no lo conoce ingrese no registra', body, divDataActivo, 'alert-danger')
        inputObservacionActivo.classList.add('border-danger')
        return
    }

  
    const activo = {
        id,
        clasificacion_id,
        consecutivo_interno,
        nombre,
        marca_id,
        modelo,
        serie,
        proceso_id,
        area_id,
        ubicacion,
        usuario_id,
        estado_id,
        proveedor_id,
        numero_factura,
        valor,
        fecha_compra,
        vencimiento_garantia,
        frecuencia_id,
        descripcion,
        recomendaciones_Mtto,
        obervacion,
        tipo_activo_id,
        create_by,
        fecha_creacion,
        url_img:'No registra'
    }
    return activo
}

function validarInput(node, size, name, obligatorio ){
    if (node.value.trim() === ''){

        if(obligatorio){
            alert(`El campo ${name} es obligatorio`, body, divDataActivo, 'alert-danger')
            node.classList.add('border-danger')
            return
        }else{
        alert(`Si no cuenta con el campo ${name} escriba no registra `, body, divDataActivo, 'alert-danger')
        node.classList.add('border-danger')
            return
        }
    }

    if(node.value.trim().length > size){
        alert(`El campo modelo no puede superar ${size} caracteres`, body, divDataActivo, 'alert-danger')
        node.classList.add('border-danger')
        return
    }
    if(!obligatorio){
        if(node.value.trim().toLowerCase() == 'no registra'){
            node.classList.remove('border-danger')
            return('No Registra')
        }
    }
    node.classList.remove('border-danger')
    return(node.value.trim()) 
}