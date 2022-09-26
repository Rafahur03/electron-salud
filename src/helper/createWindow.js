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

const createWindowchild = (width, height, title , view, fullscreen, resizable, parent) => {
    const win = new BrowserWindow({
        width,
        height,
        show: false,
        title,
        fullscreen,
        resizable,
        minimizable: false,
        modal: true,
        parent,
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