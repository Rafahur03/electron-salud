const { ipcRenderer } = require('electron/renderer')
const { cargarlistado, actualizarListado } = require('../../helper/mostarListado')

const tbody = document.querySelector('tbody')
const search = document.querySelector('#inputFiltro')
let v


document.addEventListener('DOMContentLoaded', async () => {
   await cargarlistado(tbody)  
})

ipcRenderer.on('activoActualizado', (e, activo)=>{
   const idtr =`#act${activo.id}` 
   const tr = document.querySelector(idtr)
   actualizarListado(tr, activo)
})

tbody.addEventListener('click', e=>{
   if(e.path[0].innerText === 'Editar'){
      const activoId= e.path[0].id
      ipcRenderer.send('editarActivo', activoId)
      return
   }

   if(e.path[0].innerText === 'Eliminar'){
      const activoId= e.path[0].id
      eliminarActivo(activoId)
      return
   }
})

tbody.addEventListener('dblclick', e =>{
   const id = e.path[1].id
   const activoId = id.replace('act', '')
   ipcRenderer.send('activoId', activoId)
})

search.addEventListener('keyup', e => {
   const criterio = e.target.value.toLowerCase();
   const tabletr = tbody.querySelectorAll('tr')
   tabletr.forEach(tr => {
      const tabletd = tr.querySelectorAll('td')
      v=0
      tabletd.forEach(td => {
         if (td.innerText.toLowerCase().indexOf(criterio) > -1) {
            v = v + 1
         }
      });

      if (v === 0) {
         tr.classList.add('d-none')
      }else{
         tr.classList.remove('d-none')
      }
   });

})

