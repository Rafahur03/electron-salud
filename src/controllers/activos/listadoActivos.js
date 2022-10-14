const { ipcRenderer } = require('electron/renderer')
const { cargarlistado, crudActivo } = require('../../helper/mostarListado')

const tbody = document.querySelector('tbody')
const search = document.querySelector('#inputFiltro')
let v


document.addEventListener('DOMContentLoaded', async () => {
   await cargarlistado(tbody)  
})

ipcRenderer.on('crudActivo', (e, data)=>{
   if(data.accion === 'crear'){
      crudActivo(tbody, data)

   }else{
      const idtr =`#act${data.id}` 
      const tr = document.querySelector(idtr)
      crudActivo(tr, data)
      }
})

tbody.addEventListener('dblclick', e =>{
   const id = e.path[1].id
   const openMenu ='ventanaIngresoActivo'
   const activoId = id.replace('act','')
   ipcRenderer.send('openMenu',openMenu)
   ipcRenderer.send('activoId', activoId)
})

search.addEventListener('keyup', e => {
   const criterio = e.target.value.toLowerCase();
   const tabletr = tbody.querySelectorAll('tr')

   tabletr.forEach(tr => {
      if (tr.innerText.toLowerCase().indexOf(criterio) === -1) {
         tr.classList.add('d-none') 
      }else{
         tr.classList.remove('d-none')
      
      }

   });

})

