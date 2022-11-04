const maxCaracteres = (e, parent, maxCaracteres) => {
    const largo = e.target.value.length
    console.log(largo)

    if (largo === 0) {
        parent.textContent = `Maximo ${maxCaracteres} caracteres`
        return
    }

    if (largo < maxCaracteres) {
        resto = maxCaracteres - e.target.value.length
        parent.textContent = `Quedan ${resto} caracteres de ${maxCaracteres}`
        return
    }

    if (largo >= maxCaracteres) {
        const parrafo = e.target.value
        e.target.value = parrafo.substring(0,1000)
        parent.textContent = `Quedan 0 caracteres de ${maxCaracteres}`
    }
}

module.exports={maxCaracteres}