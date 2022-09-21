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
    main = createWindow(width,height,'', 'src/view/inicio.html', true, false);
    main.show();
    login.close();
    main.webContents.send('userData',userData)
})

ipcMain.on('openMenu',(e,openMenu)=>{
    const h =height * .8
    const w =width * .8

    if(openMenu==='ventanaAdministracion'){
        const ventanaAdministracion = createWindow(w, h, 'Administracion', 'src/view/administracion.html', false, false);
        ventanaAdministracion.show();
    }

    if(openMenu==='ventanaActivos'){
        const ventanaAdministracion = createWindow(w, h, 'activos', 'src/view/activos.html', false, false);
        ventanaAdministracion.show();
    }
})
