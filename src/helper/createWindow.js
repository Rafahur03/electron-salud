const {BrowserWindow} = require('electron')

const createWindow = (width, height, title , view, fullscreen, resizable) => {
    const win = new BrowserWindow({
        width,
        height,
        show:false,
        title,
        fullscreen,
        resizable,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            devTools:true
        }
    })
    
    win.loadFile(view)
    return win   
}

const createWindowchild = (width, height, title , view, fullscreen, resizable) => {
    const win = new BrowserWindow({
        width,
        height,
        show: true,
        title,
        fullscreen,
        fullscreenable: false,
        resizable,
        minimizable: false,
        maximizable:false,
        alwaysOnTop: true,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
            devTools:true
        }
    })
    
    win.loadFile(view)
    return win   
}


module.exports ={createWindow, createWindowchild}