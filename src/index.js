const { ipcRenderer } = require('electron')
const { alert } = require('./helper/alert')
const {usuario, config} = require('./bd/bd')

const form = document.querySelector('form')
const user = document.querySelector('#user')
const password = document.querySelector('#password')
const divform = document.querySelector('.form')

window.addEventListener('DOMContentLoaded', e => {
    localStorage.clear()
    user.value=1102849823
    password.value=123456
})  



form.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (user.value === "") {
        alert('Debe ingresar un usuario', divform, form)
        return
    }
    if (password.value === "") {
        alert('Debe ingresar su password', divform, form)
        return
    }
    if (password.value.length <= 5) {
        alert('El password ingresado es muy corto', divform, form)
        return
    }

    const userData= await usuario(user.value)
     console.log(userData)
    if (userData.password !== password.value){
        alert('Password incorrecta', divform, form)
    }

    delete userData.password
    
    localStorage.setItem( 'userData', JSON.stringify(userData))  
    ipcRenderer.send( 'userData', userData )

    user.value = ""
    password.value = ""
})