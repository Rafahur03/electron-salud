function alert(msg, parent, child, type){
   const alertexits = parent.querySelector('.alert')

   if(alertexits){
      if(alertexits.classList.contains( type )){
         return;
      }
   }
   const div= document.createElement('div')
   div.classList.add('alert', type, 'text-uppercase', 'fw-bold', 'text-center');
   div.textContent = msg
   parent.insertBefore(div, child)

   setTimeout(() => { parent.removeChild(div) }, 5000)
}

module.exports ={alert}