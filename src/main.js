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
})

ipcMain.on('openMenu',(e,openMenu)=>{
    const h =height * .9
    const w =width * .9
 

    if(openMenu==='ventanaAdministracion'){
        const ventanaAdministracion = createWindow(w, h, 'Administracion', 'src/view/administracion.html', false, false);
        ventanaAdministracion.show();
    }

    if(openMenu==='ventanaActivos'){
        const ventanaActivos = createWindow(w, h, 'activos', 'src/view/activos.html', false, false);
        ventanaActivos.show();
    }

    if(openMenu==='ventanaSolicitud'){
        const ventanaSolicitud = createWindow(w, h, 'activos', 'src/view/solicitudes.html', false, false);
        ventanaSolicitud.show();
    }

    if(openMenu==='ventanaReporte'){
        const ventanaReporte = createWindow(w, h, 'activos', 'src/view/reportes.html', false, false);
        ventanaReporte.show();
    }

    if(openMenu==='ventanaEncuesta'){
        const ventanaEncuesta = createWindow(w, h, 'activos', 'src/view/encuestas.html', false, false);
        ventanaEncuesta.show();
    }

    if(openMenu==='ventanaEstadistica'){
        const ventanaEstadistica = createWindow(w, h, 'activos', 'src/view/estadisticas.html', false, false);
        ventanaEstadistica.show();
    }
})
