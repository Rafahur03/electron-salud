
const { app, screen, ipcMain, BrowserWindow, ipcRendererInternal} = require('electron')
const { createWindow, createWindowchild } = require('./helper/createWindow')
const { default: electronReload } = require('electron-reload');
require('dotenv').config()
require('electron-reload')(__dirname);

const window = new Map()
process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let login
let main
let width
let height

// crea la ventana de login 
app.whenReady().then(() => {
    width = screen.getAllDisplays()[0].size.width;
    height = screen.getAllDisplays()[0].size.height;
    login = createWindow(width, height, 'Login', 'src/index.html', false, false);
    login.show();
})

// cuando no existen  ventanas cierra la app
app.on('window-all-closed', () => {
    app.quit();
})

// cuando se hace un inicio de sesion correcto cierra login- inicia la pantalla menu y envia los datos del use a la vista 
ipcMain.on('userData', (e, userData) => {
    main = createWindow(width, height, 'Menu', 'src/view/inicio.html', false, false);
    main.show();
    login.close()
    
    main.webContents.on('dom-ready', ()=>{
        main.webContents.send('userData', userData)
    })

    main.on('close', () => {
        app.quit();
    })

})


//////////////// maneja la creacion de ventanas del menu inicio/////////////////////////////////
ipcMain.on('openMenu', (e, openMenu) => {
    const h = height * .9
    const w = width * .9

    switch (openMenu) {

        case 'ventanaAdministracion':
            let  ventanaAdministracion
            if(!window.has(ventanaAdministracion)){
                ventanaAdministracion = createWindow(w, h, 'Administracion', 'src/view/administracion/administracion.html', false, false);
                window.set('ventanaAdministracion' ,ventanaAdministracion)
            }
            ventanaAdministracion.show();
           
            ventanaAdministracion.on('close', () => {
                ventanaAdministracion.close();
            })
            break;

        case 'ventanaActivos':
            let  ventanaActivos
            if(!window.has(ventanaActivos)){
                ventanaActivos = createWindow(w, h, 'activos', 'src/view/activos/activos.html', false, false)
                window.set('ventanaActivos' ,ventanaActivos)
            }
            
            ventanaActivos.show();
            ventanaActivos.on('close', () => {
                e.preventDefault();
                ventanaActivos.hide();
            })
            break;

        case 'ventanaSolicitud':
            let ventanaSolicitud
            if(!window.has(ventanaSolicitud)){
                ventanaSolicitud = createWindow(w, h, 'Solictudes', 'src/view/solicitudesMtto/solicitudes.html', false, false);
                window.set('ventanaSolicitud' ,ventanaSolicitud)
            }  
            
            ventanaSolicitud.show();
            ventanaSolicitud.on('close', () => {
                ventanaSolicitud.close();
            })
            break;

        case 'ventanaReporte':
            let ventanaReporte
            if(!window.has(ventanaReporte)){
                ventanaReporte = createWindow(w, h, 'Reportes', 'src/view/reportes/reportes.html', false, false);
                window.set('ventanaReporte' ,ventanaReporte)
            }  
            
            ventanaReporte.show();
            ventanaReporte.on('close', () => {
                ventanaReporte.close();
            })
            
            break;

        case 'ventanaEncuesta':
         
            let ventanaEncuesta
            if(!window.has(ventanaEncuesta)){
                ventanaEncuesta = createWindow(w, h, 'Encuesta', 'src/view/encuestas/encuestas.html', false, false);
                window.set('ventanaEncuesta' ,ventanaEncuesta)
            }  
            
            ventanaEncuesta.show();
            ventanaEncuesta.on('close', () => {
                ventanaEncuesta.close();
            })
            break;

        case 'ventanaEstadistica':
            const ventanaEstadistica = createWindow(w, h, 'Estadisticas', 'src/view/estadisticas/estadisticas.html', false, false);
            window.set('ventanaEstadistica' ,ventanaEstadistica)
            ventanaEstadistica.show();
            ventanaEstadistica.on('close', () => {
                ventanaEstadistica.close();
            })
            break;

        case 'ventanaListadoActivos':
            let  ventanaListadoActivos
            if(!window.has(ventanaListadoActivos)){
                ventanaListadoActivos = createWindow(width, height, 'listado de activos', 'src/view/activos/listadoActivos.html', false, false);
                window.set('ventanaListadoActivos' ,ventanaListadoActivos)
            }
            ventanaListadoActivos.show();
            
            
            ipcMain.on('crudActivo',( e, data)=>{
                ventanaListadoActivos.webContents.send('crudActivo', data)
            })

            ventanaListadoActivos.on('close', (e) => {
                e.preventDefault();
                ventanaListadoActivos.hide()
            })
            break;

        case 'ventanaIngresoActivo':
            let ventanaIngresoActivo
            if(!window.has(ventanaIngresoActivo)){
                ventanaIngresoActivo = createWindow(width, height, 'Datos activos', 'src/view/activos/formatoActivo.html', false, false);
                window.set('ventanaIngresoActivo' ,ventanaIngresoActivo)
            }
             ventanaIngresoActivo.show();

            ventanaIngresoActivo.on('close', (e) => {
                ventanaIngresoActivo.hide();
                e.preventDefault()
            })

            break;

        default:
            break;
    }
})

// abre la ventana crear activo para edicion de algun activo en especial.///////////////////////
ipcMain.on('activoId', (e, activoId) => {
    
    let ventanaIngresoActivo = window.get('ventanaIngresoActivo')
   
    ventanaIngresoActivo.show();

    ventanaIngresoActivo.webContents.on('dom-ready',()=>{
        ventanaIngresoActivo.webContents.send('activoId', activoId)
    })
     
 
})

// solictud de mantenimiento
ipcMain.on('ventanaSolicitudMtto', (e, activo)=>{
    let ventanaSolicitudMtto

    if(!window.get('ventanaSolicitudMtto')){   
        ventanaSolicitudMtto = createWindow(width, height, 'Nueva solictud', 'src/view/solicitudesMtto/formatoSolicitud.html', false, false);
        window.set('ventanaSolicitudMtto',ventanaSolicitudMtto )
    }{
        ventanaSolicitudMtto= window.get('ventanaSolicitudMtto')
    }
    ventanaSolicitudMtto.show();

    if(activo!==null){
        ventanaSolicitudMtto.webContents.on('dom-ready',()=>{
            ventanaSolicitudMtto.webContents.send('solictudMttoActivo', activo)
        })
    }

    ventanaSolicitudMtto.on('close', (e)=>{
        ventanaSolicitudMtto.hide()
        e.preventDefault()
    })
})

// consultar Mtto
ipcMain.on('ventanaConsultarMtto', (e)=>{
    let ventanaConsultarMtto
    if(!window.get('ventanaConsultarMtto')){
        ventanaConsultarMtto = createWindow(width, height, 'Consultar reporte de Mtto', 'src/view/solicitudesMtto/consultaReporte.html', false, false);
    }
    ventanaConsultarMtto.show();

    ventanaConsultarMtto.on('close', (e)=>{
        ventanaConsultarMtto.hide()
        e.preventDefault()
       
    })
})

ipcMain.on('realizarReporte', (e)=>{
    let realizarReporte
    if(!window.get('realizaReporte')){
        realizarReporte = createWindow(width, height, 'Consultar reporte de Mtto', 'src/view/reportes/formatoReporte.html', false, false);
        window.set('realizarReporte',realizarReporte )
    }
    realizarReporte.show();

    realizarReporte.on('close', (e)=>{
        realizarReporte.hide()
        e.preventDefault()   
    })
})

ipcMain.on('encuesta', (e)=>{

    const encuesta = createWindow(width, height, 'Encuesta', 'src/view/encuestas/formatoEncuesta.html', false, false);
    encuesta.show();
})

ipcMain.on('indicadorOportunidad', (e)=>{
    const indicadorOportunidad = createWindow(width, height, 'indicadorOportunidad', 'src/view/estadisticas/indicadorOportunidad.html', false, false);
 
    indicadorOportunidad.show();
})

ipcMain.on('indicadorFallas', (e)=>{

    const indicadorFallas = createWindow(width, height, 'indicadorFallas', 'src/view/estadisticas/indicadorFallas.html', false, false);

    indicadorFallas.show();

})

ipcMain.on('indicadorCostos', (e)=>{
  
    const indicadorCostos = createWindow(width, height, 'indicadorCostos', 'src/view/estadisticas/indicadorCostos.html', false, false);
    indicadorCostos.show();

})
