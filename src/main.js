const { app, screen, ipcMain, BrowserWindow, ipcRendererInternal} = require('electron')
const { createWindow, createWindowchild } = require('./helper/createWindow')
const { default: electronReload } = require('electron-reload');
require('dotenv').config()
require('electron-reload')(__dirname);

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
    main = createWindow(width, height, 'Menu', 'src/view/inicio.html', true, false);
    main.show();
    login.close();
    main.webContents.send('userData', userData)
    main.on('close', () => {
        app.quit();
    })

})


// maneja la creacion de ventanas del menu inicio
ipcMain.on('openMenu', (e, openMenu) => {
    const h = height * .9
    const w = width * .9

    switch (openMenu) {

        case 'ventanaAdministracion':
            const ventanaAdministracion = createWindow(w, h, 'Administracion', 'src/view/administracion/administracion.html', false, false);
            ventanaAdministracion.show();
            ventanaAdministracion.on('close', () => {
                ventanaAdministracion.close();
            })
            break;

        case 'ventanaActivos':
            const ventanaActivos = createWindow(w, h, 'activos', 'src/view/activos/activos.html', false, false);
            ventanaActivos.show();
            ventanaActivos.on('close', () => {
                ventanaActivos.close();
            })
            break;

        case 'ventanaSolicitud':
            const ventanaSolicitud = createWindow(w, h, 'Solictudes', 'src/view/solicitudes/solicitudes.html', false, false);
            ventanaSolicitud.show();
            ventanaSolicitud.on('close', () => {
                ventanaSolicitud.close();
            })
            break;

        case 'ventanaReporte':
            const ventanaReporte = createWindow(w, h, 'Reportes', 'src/view/reportes/reportes.html', false, false);
            ventanaReporte.show();
            ventanaReporte.on('close', () => {
                ventanaReporte.close();
            })
            break;

        case 'ventanaEncuesta':
            const ventanaEncuesta = createWindow(w, h, 'Encuestas', 'src/view/encuestas/encuestas.html', false, false);
            ventanaEncuesta.show();
            ventanaEncuesta.on('close', () => {
                ventanaEncuesta.close();
            })
            break;

        case 'ventanaEstadistica':
            const ventanaEstadistica = createWindow(w, h, 'Estadisticas', 'src/view/estadisticas/estadisticas.html', false, false);
            ventanaEstadistica.show();
            ventanaEstadistica.on('close', () => {
                ventanaEstadistica.close();
            })
            break;

        case 'ventanaListadoActivos':
            const ventanaListadoActivos = createWindow(width, height, 'listado de activos', 'src/view/activos/listadoActivos.html', false, false);
            ventanaListadoActivos.show();
            ipcMain.on('activoActualizado',( e, activo)=>{
                ventanaListadoActivos.webContents.send('activoActualizado', activo)
            })
            ventanaListadoActivos.on('close', () => {
                ventanaListadoActivos.close();
            })
            break;

        case 'ventanaIngresoActivo':
            let ventanaIngresoActivo = createWindow(width, height, 'Datos activos', 'src/view/activos/formatoActivo.html', false, false);
            ventanaIngresoActivo.show();
            ventanaIngresoActivo.webContents.on('dom-ready', ()=>{
                const crear = 'crear'
                ventanaIngresoActivo.webContents.send('crear', crear)
            })
            ventanaIngresoActivo.on('close', (e) => {
                ventanaIngresoActivo.close();
            })
            break;

        default:
            break;
    }
})

// abre la ventana crear activo para edicion de algun activo en especial.
ipcMain.on('activoId', (e, activoId) => {
    
    const editarActivo =  createWindow(width, height, 'Datos activos', 'src/view/activos/formatoActivo.html', false, false);
    editarActivo.show();
    editarActivo.webContents.on('dom-ready',()=>{
        editarActivo.webContents.send('activoId', activoId)
    })
   
    editarActivo.on('close', (e) => {
       editarActivo.hide();
       e.preventDefault();
       return false
       
    })    
 
    // habre ventana fija de confirmacion de eliminar activo
    ipcMain.on('eliminarActivo', (e, activo)=>{
        //const padre = BrowserWindow.getFocusedWindow()

        const  confirmarEliminarActivo =  createWindowchild(800, 800, 'Datos activos', 'src/view/activos/confirmarEliminarActivo.html', false, false, editarActivo);
        confirmarEliminarActivo.show();

        confirmarEliminarActivo.webContents.on('dom-ready',()=>{
            confirmarEliminarActivo.webContents.send('eliminarActivo', activo)
        })
        
        ipcMain.on('confirmarEliminar', (e, activo)=>{
            editarActivo.webContents.send('confirmarEliminar', activo)
        
        })  
    })

})