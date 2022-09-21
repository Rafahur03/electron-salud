const {app, screen, ipcMain} = require('electron')
const {createWindow} = require('./helper/createWindow')
const { default: electronReload } = require('electron-reload');
require('dotenv').config()
require('electron-reload')(__dirname);

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
let login
let main
let width
let height

app.whenReady().then(() => {
    width = screen.getAllDisplays()[0].size.width;
    height = screen.getAllDisplays()[0].size.height;
    login = createWindow(width,height,'Login', 'src/index.html', false, false);
    login.show();
})

app.on('window-all-closed', () => {
    app.quit();
})

ipcMain.on('userData',(e,userData)=>{
    main = createWindow(width,height,'Menu', 'src/view/inicio.html', true, false);
    main.show();
    login.close();
    main.webContents.send('userData',userData)
    main.on('close', ()=>{
        app.quit();
    })   

})

ipcMain.on('openMenu',(e,openMenu)=>{
    const h =height * .9
    const w =width * .9
    
    switch (openMenu){

        case 'ventanaAdministracion':
            const ventanaAdministracion = createWindow(w, h, 'Administracion', 'src/view/administracion/administracion.html', false, false);
            ventanaAdministracion.show();
            ventanaAdministracion.on('close', ()=>{
                ventanaAdministracion.close();
            })   
        break;

        case 'ventanaActivos':
            const ventanaActivos = createWindow(w, h, 'activos', 'src/view/activos/activos.html', false, false);
            ventanaActivos.show();
            ventanaActivos.on('close', ()=>{
                ventanaActivos.close();
            }) 
        break;

        case 'ventanaSolicitud':
            const ventanaSolicitud = createWindow(w, h, 'Solictudes', 'src/view/solicitudes/solicitudes.html', false, false);
            ventanaSolicitud.show();
            ventanaSolicitud.on('close', ()=>{
                ventanaSolicitud.close();
            }) 
        break;

        case 'ventanaReporte':
            const ventanaReporte = createWindow(w, h, 'Reportes', 'src/view/reportes/reportes.html', false, false);
            ventanaReporte.show();
            ventanaReporte.on('close', ()=>{
                ventanaReporte.close();
            }) 
         break;

        case 'ventanaEncuesta':
            const ventanaEncuesta = createWindow(w, h, 'Encuestas', 'src/view/encuestas/encuestas.html', false, false);
            ventanaEncuesta.show();
            ventanaEncuesta.on('close', ()=>{
                ventanaEncuesta.close();
            }) 
        break;

        case 'ventanaEstadistica':
            const ventanaEstadistica = createWindow(w, h, 'Estadisticas', 'src/view/estadisticas/estadisticas.html', false, false);
            ventanaEstadistica.show();
            ventanaEstadistica.on('close', ()=>{
                ventanaEstadistica.close();
            }) 
        break;

        case 'ventanaListadoActivos':
            const ventanaListadoActivos = createWindow(width, height, 'listado de activos', 'src/view/activos/listadoActivos.html', false, false);
            ventanaListadoActivos.show();
            ventanaListadoActivos.on('close', ()=>{
                ventanaListadoActivos.close();
            }) 
        break;

        case 'VentanaIngresoActivo':
            const VentanaIngresoActivo = createWindow(w, h, 'Estadisticas', 'src/view/estadisticas/estadisticas.html', false, false);
            VentanaIngresoActivo.show();
            VentanaIngresoActivo.on('close', ()=>{
                VentanaIngresoActivo.close();
            }) 
        break;

        default:
        break;
    }
})
