function mostrarLista (arr = []) {
  if (arr.length === 0) { 
    console.log('lista vacia 🤔')
  } else {
    // arr.map((item, i) => {
    //   return (console.log('item', i, ' -> ', item))
    // })
    // return (console.log('largo lista = ', arr.length))
    for (const elemento of arr) {
      console.log(elemento)
    }
    console.log('largo lista = ', arr.length)
  }
}

mostrarLista([])
mostrarLista([101, 202, 303, 404, 505])
//caso extra, toma valor default
mostrarLista()

