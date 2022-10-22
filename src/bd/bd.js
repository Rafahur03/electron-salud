const sql = require('mssql')
require('dotenv').config()

const config = {
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.NAME_DB,
    server: process.env.HOST_DB,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
    }
}

const db = async () => {
    try {
        const pool = await sql.connect(config);
        return pool;
    } catch (error) {
        console.error(error);
    }
};

const usuario = async id => {
    const pool = await db()
    const resultado = await pool.query(`select id, nombre, nombre_1, apellido, apellido_1, password from Usuarios where numero_id = ${id}`)
    return (resultado.recordset[0])
}

const dataConfActivo = async () => {
    const pool = await db()
    const resultado = await pool.query(
        `SELECT * FROM clasificacion_activos
        SELECT * FROM marca_activos
        SELECT * FROM procesos
        SELECT * FROM areas
        SELECT id, nombre_comercial, razon_social, nit, estado FROM proveedores
        SELECT * FROM tipo_activo
        SELECT * FROM estados
        SELECT id, nombre, nombre_1, apellido, apellido_1 FROM usuarios
        SELECT * FROM frecuencia_Mtto`
    )
    return (resultado.recordsets)
}

const listadoActivos = async () => {
    const pool = await db()
    const resultado = await pool.query(`
        SELECT la.id, ca.siglas, la.consecutivo_interno, la.nombre AS nombreActivo, ma.marca, la.modelo, la.serie, la.ubicacion, us.nombre, us.nombre_1, us.apellido, us.apellido_1, es.estado
            FROM listado_activos la
        INNER JOIN clasificacion_activos ca
            on la.clasificacion_id =ca.id
        INNER JOIN marca_activos ma
            on la.marca_id = ma.id
        INNER JOIN usuarios us
            on la.usuario_id = us.id
        INNER JOIN estados es
            on la.estado_id = es.id`)

    return (resultado.recordset)
}

const showActivo = async (id) => {
    const pool = await db()
    const resultado = await pool.query(`SELECT la.id, ca.siglas, la.consecutivo_interno, la.nombre as nombreActivo, ma.marca, la.modelo, la.serie, p.proceso, a.area, 
    la.ubicacion, us.nombre, us.nombre_1, us.apellido, us.apellido_1, es.estado, pro.razon_social, pro.nombre_comercial, pro.nit, la.numero_factura, la.valor, la.fecha_compra, 
    la.vencimiento_garantia, fr.frecuencia, la.descripcion, la.recomendaciones_Mtto, la.obervacion, ti.tipo_activo, la.url_img
    FROM listado_activos la
        INNER JOIN clasificacion_activos ca
        on la.clasificacion_id =ca.id
        INNER JOIN marca_activos ma
        on la.marca_id =ma.id
        INNER JOIN procesos p
        on la.proceso_id =p.id
        INNER JOIN areas a
        on la.area_id =a.id
        INNER JOIN usuarios us
        on la.usuario_id =us.id
        INNER JOIN estados es
        on la.estado_id =es.id
        INNER JOIN proveedores pro
        on la.proveedor_id =pro.id
        INNER JOIN frecuencia_Mtto fr
        on la.frecuencia_id =fr.id
        INNER JOIN tipo_activo ti
        on la.tipo_activo_id =ti.id
    WHERE la.id='${id}'`)

    return (resultado.recordset[0])
}

const actualizarListado = async (id) => {
    const pool = await db()
    const resultado = await pool.query(`SELECT la.id, ca.siglas, la.consecutivo_interno, la.nombre AS nombreActivo, ma.marca, la.modelo, la.serie, la.ubicacion, us.nombre, us.nombre_1, us. apellido, us.apellido_1, es.estado
        FROM listado_activos la
    INNER JOIN clasificacion_activos ca
        on la.clasificacion_id =ca.id
    INNER JOIN marca_activos ma
        on la.marca_id = ma.id
    INNER JOIN usuarios us
        on la.usuario_id = us.id
    INNER JOIN estados es
    on la.estado_id = es.id  
        WHERE la.id = '${id}'`)

    return (resultado.recordset[0])
}

const actualizarActivo = async (activo) => {
    try {
        const pool = await db()
        const resultado = await pool.query(`UPDATE listado_activos SET clasificacion_id ='${activo.clasificacion_id}', consecutivo_interno='${activo.consecutivo_interno}',nombre='${activo.nombre}', marca_id='${activo.marca_id}', modelo='${activo.modelo}',serie='${activo.serie}', proceso_id='${activo.proceso_id}', area_id='${activo.area_id}', ubicacion='${activo.ubicacion}', usuario_id='${activo.usuario_id}', estado_id='${activo.estado_id}', proveedor_id='${activo.proveedor_id}', numero_factura='${activo.numero_factura}',valor='${activo.valor}',fecha_compra='${activo.fecha_compra}', vencimiento_garantia='${activo.vencimiento_garantia}', frecuencia_id='${activo.frecuencia_id}', descripcion='${activo.descripcion}', recomendaciones_Mtto='${activo.recomendaciones_Mtto}', obervacion='${activo.obervacion}', tipo_activo_id='${activo.tipo_activo_id}'
    WHERE id ='${activo.id}'`)
        return (resultado.rowsAffected[0])
    } catch (error) {
        return (error)
    }
}

const crearActivo = async (activo) => {
    const pool = await db()

    try {
        const consecutivo = await pool.query(`SELECT TOP 1 consecutivo_interno FROM listado_activos WHERE clasificacion_id='${activo.clasificacion_id}' ORDER BY consecutivo_interno DESC`)
        console.log(activo.consecutivo_interno)
        const aumento = parseInt(consecutivo.recordset[0].consecutivo_interno) + 1
        activo.consecutivo_interno = aumento.toString().padStart(4, 0)
        console.log(activo.consecutivo_interno)
        const resultado = await pool.query(`INSERT INTO listado_activos (clasificacion_id, 
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
            create_by,
            tipo_activo_id,
            url_img
        )
        VALUES
        ('${activo.clasificacion_id}','${activo.consecutivo_interno}','${activo.nombre}','${activo.marca_id}','${activo.modelo}','${activo.serie}','${activo.proceso_id}','${activo.area_id}','${activo.ubicacion}','${activo.usuario_id}','${activo.estado_id}','${activo.proveedor_id}','${activo.numero_factura}','${activo.valor}','${activo.fecha_compra}','${activo.vencimiento_garantia}','${activo.frecuencia_id}','${activo.descripcion}','${activo.recomendaciones_Mtto}','${activo.obervacion}','${activo.create_by}','${activo.tipo_activo_id}','${activo.url_img}')
        
        SELECT IDENT_CURRENT('listado_activos') AS id`)

        const id = resultado.recordset[0].id

        const newActivo = await pool.query(`SELECT la.id, ca.siglas, la.consecutivo_interno, es.estado
                FROM listado_activos la
            INNER JOIN clasificacion_activos ca
                on la.clasificacion_id =ca.id
            INNER JOIN estados es
                on la.estado_id = es.id
                WHERE la.id = '${id}'`)

        return (newActivo.recordset[0])

    } catch (error) {
        console.log('err')
    }
}

const eliminarActivo = async (id) => {
    const pool = await db()
    const resultado = await pool.query(`UPDATE listado_activos SET estado_id = '3' WHERE id ='${id}'`)
    return (resultado)
}


// INGRESAR SOLICTUD 
const guardarSolicitudSoporte = async (solicitud) => {
    const pool = await db()


    const nuevaSolicitud = await pool.query(`INSERT INTO solicitudes_mtto(id_activo, id_usuario, fecha_solicitud, solicitud, img_solicitud)
    VALUES('${solicitud. id_activo}', '${solicitud.id_user}','${solicitud.fecha_solicitud}','${solicitud.solictud}','${solicitud.ima_solictud}')
    
    SELECT IDENT_CURRENT('solicitudes_mtto') AS id`)
    return (nuevaSolicitud.recordset[0])

}

/// busca activo para solicitudees

const activoSolicitudes = async (data) => {
    const pool = await db()
    const resultado = await pool.query(`SELECT la.id, ca.siglas, la.consecutivo_interno,la.nombre as nombreActivo , ma.marca, la.modelo, la.serie, pr.proceso, ar.area, la.ubicacion, us.nombre, us.nombre_1, us.apellido, us.apellido_1, es.estado, url_img
	FROM listado_activos la
    INNER JOIN clasificacion_activos ca
        on la.clasificacion_id =ca.id
    INNER JOIN marca_activos ma
        on la.marca_id = ma.id
    INNER JOIN estados es
        on la.estado_id = es.id
    INNER JOIN areas ar
        on la.area_id = ar.id
    INNER JOIN procesos pr
        on la.proceso_id = pr.id
    INNER JOIN usuarios us
        on la.usuario_id = us.id
    WHERE la.clasificacion_id ='${data.clasificacion}' AND la.consecutivo_interno = ${data.codigoInterno} AND la.estado_id = '1'`)
    return (resultado.recordset[0])
}

const eliminarSolicitud = async (id) => {
    const pool = await db()
    const resultado = await pool.query(`UPDATE solicitudes_mtto SET id_estado='4' WHERE id ='${id}'`)
    return (resultado.rowsAffected[0])
}

module.exports = {
    usuario,
    dataConfActivo,
    listadoActivos,
    showActivo,
    actualizarListado,
    actualizarActivo,
    crearActivo,
    eliminarActivo,
    guardarSolicitudSoporte,
    activoSolicitudes,
    eliminarSolicitud
}