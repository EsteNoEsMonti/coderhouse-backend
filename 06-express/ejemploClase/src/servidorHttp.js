import http from 'http'

function getQueryParams(url) {
    const queryParamsText = url.split('?')[1]
    if (queryParamsText) {
        const queryParams = queryParamsText.split('&').map(par => par.split('='))
        return Object.fromEntries(queryParams)
    } else {
        return {}
    }
}

function getUrlParams(url, nombresPosicionesParams) {
    const urlParamsText = url.split('?')[0]
    const urlParams = urlParamsText.split('/')
    const result = {}
    for (const nombre in nombresPosicionesParams) { // for in recorre objetos por su clave
      // result en el campo nombre va a valer urlParams en la posicion nombrePosicionesParams sub nombre campo
        result[nombre] = urlParams[nombresPosicionesParams[nombre]]
    }
    return result
}

const server = http.createServer((peticion, respuesta) => {
    console.log(peticion.method)
    console.log(peticion.url)

    const queryParams = getQueryParams(peticion.url)
    console.log('queryParams -> ', queryParams)

    const urlParams = getUrlParams(peticion.url, { nroUsuario: 2 })
    console.log('urlParams -> ', urlParams)

    respuesta.end()
})

server.listen(8080)