const {createWindow} = require('./createWindow')
const {width,height} = require('../main')

function ventanaAdministracion (){
    const w= 700
    const h= 700
    const administracion = createWindow(w,h,'Administracion','src/view/administracion.html', false, false);
    administracion.show

}

module.exports={ventanaAdministracion}