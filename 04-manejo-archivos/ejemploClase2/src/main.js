import fs from 'fs'

const ruta = './static/agenda.txt'

let agenda

function contameUnCuento() {
    console.log('habia una vez...truz')
}

function cargarAgenda() {
  const json = fs.readFileSync(ruta, 'utf-8')
  agenda = JSON.parse(json) // lo parseo, lo ocnvierto en json
}

function guardarAgenda() {
  // lo contratio
  const json = JSON.stringify(agenda, null, 2) // armo el json, para que sea formateado -> txt, null, 2 (es el indentado)
  fs.writeFileSync(ruta, json) // ahora lo escrivo, es la fn par aescribir de forma bloqueate - ruta, lo que quiero escribir
}

function mostrarAgenda() {
  console.log(agenda)
}

function agregarContacto(contacto) {
  agenda.push(contacto)
}

function eliminarEvidencia() {
  fs.rmSync(ruta,)
}

function operarConLaAgenda() {
  cargarAgenda()
  mostrarAgenda()
  agregarContacto({ "andres": "9834759827435" })
  mostrarAgenda()
  guardarAgenda()
}

operarConLaAgenda()
contameUnCuento()

// setTimeout(eliminarEvidencia, 5000)