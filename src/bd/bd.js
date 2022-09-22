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

const usuario = async id =>{
    const pool = await db()
    const resultado = await pool.query(`select id, nombre, nombre_1, apellido, apellido_1, password from Usuarios where numero_id = ${id}`)
    return (resultado.recordset[0])
}

const listadoActivos= async ()=>{
  const pool = await db()
  const resultado = await pool.query(`SELECT id, id_equipo, Nombre_activo, Marca, modelo, serie, ubicacion, responsable, estado FROM listado_activos`)
  return (resultado.recordset)
}

const activo = async (id)=>{
  const pool = await db()
  const resultado = await pool.query(`SELECT id, id_equipo, Nombre_activo, Marca, modelo, serie, ubicacion, responsable, estado FROM listado_activos WHERE id = ${id}`)
  return (resultado.recordset[0])
}

module.exports={
    usuario,
    listadoActivos,
    activo
}