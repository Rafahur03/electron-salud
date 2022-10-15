const { alert } = require('../../helper/alert')
const {cargarCarrusel} = require('../../helper/mostrarCarrusel')

const body = document.querySelector('body')
const divDataActivo = document.querySelector('.dataActivo')
const dragDropImgActivo = document.querySelector('#dragDropImgActivo')
const dragtext = document.querySelector('.dragtext')
const inputActivoImg = document.querySelector('#inputActivoImg')
const carouselIndicators = document.querySelector('.carousel-indicators')
const carouselInner = document.querySelector('.carousel-inner')
const carruselImgActivo = document.querySelector('#carruselImgActivo')
const eliminarImagen = document.querySelector('.eliminarImagen')

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
    const listImg = validarFormat(imagenes)
    dragDropImgActivo.classList.add('d-none')
    carruselImgActivo.classList.remove('d-none')
    cargarCarrusel(listImg, carouselIndicators, carouselInner)
    e.preventDefault()
})

dragDropImgActivo.addEventListener('click', ()=>{
    inputActivoImg.click()
})

inputActivoImg.addEventListener('change', e=>{
    const imagenes = e.target.files
    const listImg = validarFormat(imagenes)
    dragDropImgActivo.classList.add('d-none')
    carruselImgActivo.classList.remove('d-none')
    cargarCarrusel(listImg, carouselIndicators, carouselInner)
})

const eliminarImg =e=>{
console.log(e.target)
}


function validarFormat(imagenes){
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