const { alert } = require('../../helper/alert')
const{cargarCarrusel, validarFormatImg} = require('../../helper/cargarImagenActivoCarrusel')


const body = document.querySelector('body')
const divDataActivo = document.querySelector('.dataActivo')
const dragDropImgActivo = document.querySelector('#dragDropImgActivo')
const dragtext = document.querySelector('.dragtext')
const inputActivoImg = document.querySelector('#inputActivoImg')
const carouselIndicators = document.querySelector('.carousel-indicators')
const carouselInner = document.querySelector('.carousel-inner')
const carruselImgActivo = document.querySelector('#carruselImgActivo')
let  listImg 

document.addEventListener('DOMContentLoaded', () => {
    dragDropImgActivo.onclick = ()=>{abrirImputImagen()}
    inputActivoImg.onchange = (e)=>{creaAgregarImg(e)}
    
})


dragDropImgActivo.addEventListener('dragover', e => {
    dragtext.textContent = 'Suelta para cargar'
    dragDropImgActivo.classList.add('active')
    e.preventDefault()
})

dragDropImgActivo.addEventListener('dragleave', e => {
    dragtext.textContent = 'Arrastra y suelta'
    dragDropImgActivo.classList.remove('active')
    e.preventDefault()
})

dragDropImgActivo.addEventListener('drop', e => {
    const imagenes = e.dataTransfer.files
    listImg = validarFormatImg(imagenes)
    dragDropImgActivo.classList.add('d-none')
    carruselImgActivo.classList.remove('d-none')
    cargarCarrusel(listImg, eliminarImg, carouselIndicators, carouselInner)
    localStorage.setItem('listImageActivo', listImg )
    e.preventDefault()
})

carruselImgActivo.addEventListener('dblclick',()=>{
    inputActivoImg.click()
})

const abrirImputImagen = ()=>{
    inputActivoImg.click()
}

const creaAgregarImg =  e =>{
     const imagenes = e.target.files
    if(typeof listImg !== 'undefined'){
        if(listImg.length !==0 ){
            const newimag=validarFormatImg(imagenes)
            listImg = listImg.concat(newimag)
        }else{
            listImg = validarFormatImg(imagenes)
        }
    }else{
        listImg = validarFormatImg(imagenes)
    }
    
    dragDropImgActivo.classList.add('d-none')
    carruselImgActivo.classList.remove('d-none')
    cargarCarrusel(listImg, eliminarImg, carouselIndicators, carouselInner)
    localStorage.setItem('listImageActivo', listImg ) 
}

const eliminarImg = e =>{
   if(!e.target.id){
    return
   }
   const id = parseInt(e.target.id.split('-')[1].trim())
    const newListImg= listImg.filter((image, index)=>{
        if( index !== id){
            return(image)
        }
    })

    listImg = newListImg
    if(listImg.length === 0){
        dragDropImgActivo.classList.remove('d-none','active')
        
        carruselImgActivo.classList.add('d-none')
        return
    }
    
    cargarCarrusel(listImg, eliminarImg, carouselIndicators, carouselInner)
    localStorage.setItem('listImageActivo', listImg )
}