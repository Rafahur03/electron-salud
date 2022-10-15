function cargarCarrusel(imageUrl, carouselIndicators, carouselInner){

       
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
        divIcon.onclick = e =>{eliminarImg(e)}
        carouselIndicators.appendChild(button)
        div.appendChild(img)
        divIcon.appendChild(icon)
        div.appendChild(divIcon)
        carouselInner.appendChild(div)     
    })
  
}
const eliminarImg =e=>{
    console.log(e.target)
    }
module.exports = {cargarCarrusel}