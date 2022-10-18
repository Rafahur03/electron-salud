function cargarCarrusel(imageUrl, eliminar, nodeindicador, nodeInner){

    while (nodeindicador.firstChild) {
        nodeindicador.removeChild(nodeindicador.firstChild);
      }

     while (nodeInner.firstChild) {
        nodeInner.removeChild(nodeInner.firstChild);
     }

     carruselImgActivo.ondblclick = ()=>{}
       
    imageUrl.forEach(( image, index ) =>{
        const button = document.createElement("button")
        const div = document.createElement("div")
        const divIcon = document.createElement("div")
        const img = document.createElement("img")
        const icon = document.createElement('i')
        
        button.type='button'
        button.setAttribute('data-bs-target', '#carruselImgActivo')
        button.setAttribute('data-bs-slide-to',`${index}`)
        div.classList.add('carousel-item')
        img.classList.add('d-block', 'w-100')
        img.src=image
        if(index === 0){
            button.setAttribute('aria-current', 'true')
            button.classList.add('active')
            div.classList.add('active')
        }
        icon.classList.add('bi', 'bi-trash3-fill', 'text-danger', 'text-center','eliminarImagen')
        icon.id=`img-${index}`
        divIcon.classList.add('d-flex', 'flex-column', 'align-items-center', 'justify-content-center')
        divIcon.onclick = e =>{eliminar(e)}
       
        div.appendChild(img)
        divIcon.appendChild(icon)
        div.appendChild(divIcon)

        nodeindicador.appendChild(button)
        nodeInner.appendChild(div)     
    })
  
}

function validarFormatImg(imagenes){
    const formatValidation= ['image/png', 'image/jpg', 'image/jpeg']
    let noimgUpload =[]
    let Imgunload =[]
    let j=0, k=0
  
    for(let i=0; i < imagenes.length; i++){
   
        if(!formatValidation.includes(imagenes[i].type)){
            noimgUpload.push(imagenes[i].name)
            k=k+1
            continue
        }
        Imgunload.push(imagenes[i].path)
           j=j+1    
    }   
    
    if(noimgUpload[0]=''){
        console.log(noimgUpload.length)
        let names=''
        noimgUpload.forEach(name =>{
            names= names +` ${name}, `
        })
        alert(`Los formatos de los archivos ${names} no son soportados `, body, divDataActivo, 'alert-danger')
    }

    if(Imgunload){
        if(Imgunload.length > 5){
            alert(`Solo puede cargar maximo 5 imagenes, solo se cargaran las primeras 5 imagenes cargadas`, body, divDataActivo, 'alert-danger')
        }
    }
    return(Imgunload)
}

module.exports = {cargarCarrusel, validarFormatImg}