function alert(msg,parent, child){
   const div= document.createElement('div')
   div.classList.add('alert', 'alert-warning', 'text-uppercase', 'fw-bold', 'text-center');
   div.textContent = msg
   parent.insertBefore(div, child)

   setTimeout(() => { parent.removeChild(div) }, 5000)
}

module.exports ={ alert}