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

const listadoActivos = async () => {
    const pool = await db()
    const resultado = await pool.query(`SELECT id, id_equipo, Nombre_activo, Marca, modelo, serie, ubicacion, responsable, estado FROM listado_activos`)
    return (resultado.recordset)
}

const showActivo = async (id) => {
    const pool = await db()
    const resultado = await pool.query(`SELECT id, id_equipo, Nombre_activo, Marca, modelo, serie, ubicacion, responsable, estado, tipo_Activo FROM listado_activos WHERE id = ${id}`)
    return (resultado.recordset[0])
}

const actualizarActivo = async (activo) => {
    const pool = await db()
    const resultado = await pool.query(`UPDATE listado_activos SET Nombre_activo = '${activo.nombre}',Marca = '${activo.marca}', modelo = '${activo.modelo}', serie = '${activo.serie}', ubicacion = '${activo.ubicacion}', estado = '${activo.estado}', tipo_Activo = '${activo.tipo}', responsable = '${activo.responsable}' WHERE id ='${activo.id}'`)
    return (resultado.rowsAffected[0])
}

const crearActivo = async (activo) => {
    const pool = await db()

    try {
        const resultado = await pool.query(`INSERT INTO  listado_activos (id_equipo, Nombre_activo, Marca, modelo, serie, ubicacion, estado, tipo_Activo, responsable) VALUES ('PRUEBA9', '${activo.nombre}', '${activo.marca}', '${activo.modelo}', '${activo.serie}', '${activo.ubicacion}', '${activo.estado}', '${activo.tipo}','${activo.responsable}')`)

        if (resultado.rowsAffected[0] === 0) {
            return resultado.rowsAffected[0]
        }

        const newActivo = await pool.query(`SELECT id, id_equipo, Nombre_activo, Marca, modelo, serie, ubicacion, responsable, estado, tipo_Activo FROM listado_activos WHERE id_equipo = 'PRUEBA9'`)
        return (newActivo.recordset[0])

    } catch (error) {
        return('err')
    }
}

const eliminarActivo = async (activo) => {
    const pool = await db()
    const resultado = await pool.query(`DELETE FROM listado_activos WHERE id='${activo.id}'`)
    return (resultado)
}

module.exports = {
    usuario,
    listadoActivos,
    showActivo,
    actualizarActivo,
    crearActivo,
    eliminarActivo
}