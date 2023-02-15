const Chart = require('chart.js/auto')

const { consultarEstadisticaOportunidad } = require('../../bd/bd.js')
const { dataOportunidad } = require('../../helper/dataIndicadorOportunidad.js')

const chartprincipal = document.querySelector('#principal')
const chartcomparativa = document.querySelector('#secundaria')
const checkComparar = document.querySelector('#checkComparar')
const chartCompare = document.querySelector('.chartCompare')
const comparativa = document.querySelector('.secundaria')
const principal = document.querySelector('.principal')
let principalChart

document.addEventListener('DOMContentLoaded', async () => {
    const data = await adquiriDatos()
     principalChart = chart(document.querySelector('#principal'), data)
     console.log(principalChart)
})

checkComparar.addEventListener('change', async e => {
         const data = await adquiriDatos()
        if(e.target.checked) {
            comparativa.classList.remove('d-none')
            chartCompare.classList.remove('d-none')
           const comparative = chart(chartcomparativa, data)
           console.log(comparative)
            return           
        }
        comparativa.classList.add('d-none')
        chartCompare.classList.add('d-none')
      
    }   
)

const chart = (canvas, data)=>{
    new Chart( canvas,{
        type: 'bar',
        data:{
            labels: data.labelgrafica,
            datasets:[{
                label: 'Oportunidad periodo',
                data: data.datagrafica
            }]
        },
        options: {
            maintainAspectRatio: true,
            responsive:true,
            layout: {   
                padding: 10
            },
           
        }
    })
}

const adquiriDatos = async ()=>{
    const oportunidad = await consultarEstadisticaOportunidad()
    const data = dataOportunidad(oportunidad)
    return(data)
}