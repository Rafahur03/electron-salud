function alert(msg, parent, child, type){
   const div= document.createElement('div')
   div.classList.add('alert', type, 'text-uppercase', 'fw-bold', 'text-center');
   div.textContent = msg
   parent.insertBefore(div, child)

   setTimeout(() => { parent.removeChild(div) }, 5000)
}

module.exports ={alert}