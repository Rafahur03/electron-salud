const {cargarlistado} = require('../../helper/mostarListado')

const container = document.querySelector('.container')
const tbody = document.querySelector('tbody')
const search = document.querySelector('#inputFiltro')
let tabletr


document.addEventListener('DOMContentLoaded', async ()=>{
    cargarlistado(tbody)
   
})


search.addEventListener('keydown',e=>{
    tabletr = tbody.querySelectorAll('tr td')
    let criterio = e.target.value.toLowerCase();

    console.log(tabletr)
    
})

