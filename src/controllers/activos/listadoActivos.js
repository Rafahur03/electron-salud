const { ipcRenderer } = require('electron/renderer')
const { cargarlistado } = require('../../helper/mostarListado')

const tbody = document.querySelector('tbody')
const search = document.querySelector('#inputFiltro')
let tabletr
let v


document.addEventListener('DOMContentLoaded', async () => {
   await cargarlistado(tbody)
   tabletr = tbody.querySelectorAll('tr')
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
   const activoId= e.path[1].id
   console.log(activoId)
   ipcRenderer.send('activoId', activoId)
})

search.addEventListener('keyup', e => {
   const criterio = e.target.value.toLowerCase();
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

