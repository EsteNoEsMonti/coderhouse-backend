// import { randomUUID } from 'crypto'

// @ts-ignore
const serverSocket = io('http://localhost:8080/')

const btnSubmit = document.querySelector('#btnSubmit')

if (btnSubmit) {
    btnSubmit.addEventListener('click', evento => {
        const inputTitle = document.querySelector('#inputTitle')
        const inputDescription = document.querySelector('#inputDescription')
        const inputCode = document.querySelector('#inputCode')
        const inputPrice = document.querySelector('#inputPrice')
        const inputStatus = document.querySelector('#inputStatus')
        const inputStock = document.querySelector('#inputStock')
        const inputCategory = document.querySelector('#inputCategory')

        if (!(inputTitle instanceof HTMLInputElement) ||
            !(inputDescription instanceof HTMLInputElement) ||
            !(inputCode instanceof HTMLInputElement) ||
            !(inputPrice instanceof HTMLInputElement) ||
            !(inputStatus instanceof HTMLInputElement) ||
            !(inputStock instanceof HTMLInputElement) ||
            !(inputCategory instanceof HTMLInputElement)) return

        const title = inputTitle.value
        const description = inputDescription.value
        const code = inputCode.value
        const price = inputPrice.value
        const status = inputStatus.value
        const stock = inputStock.value
        const category = inputCategory.value

        if (!(title) ||
            !(description) ||
            !(code) ||
            !(price) ||
            !(status) ||
            !(stock) ||
            !(category)) return

        const product = {
            id: `my-uid-${Math.floor(Math.random() * 999999999999999999)}`,
            title,
            description,
            code,
            price,
            status,
            stock,
            category
        }

        // serverSocket.emit('nuevoMensaje', { timestamp: Date.now(), autor, mensaje })
        serverSocket.emit('newRealTimeProduct', product)
    })
}

const btnDelete = document.querySelector('#btnDelete')

if (btnDelete) {
    btnDelete.addEventListener('click', evento => {
        const inputId = document.querySelector('#inputId')

        if (!(inputId instanceof HTMLInputElement)) return

        const id = inputId.value

        if (!id) return

        serverSocket.emit('deleteRealTimeProduct', id)
    })
}

const templateRealTimeProducts = `
{{#if thereAreProducts }}
    {{#each products}}
    <ul>
      <li><b>id:</b> {{this.id}}</li>
      <li><b>title:</b> {{this.title}}</li>
      <li><b>description:</b> {{this.description}}</li>
      <li><b>code:</b> {{this.code}}</li>
      <li><b>price:</b> {{this.price}}</li>
      <li><b>status:</b> {{this.status}}</li>
      <li><b>stock:</b> {{this.stock}}</li>
      <li><b>category:</b> {{this.category}}</li>
      <hr/>
    </ul>
    {{/each}}
{{else}}
<p>There aren't products 😔</p>
{{/if}}
`
// @ts-ignore
const createHtmlRealTimeProducts = Handlebars.compile(templateRealTimeProducts)

serverSocket.on('productList', products => {
    const divProducts = document.querySelector('#products')
    if (divProducts) {
        divProducts.innerHTML = createHtmlRealTimeProducts({ products, thereAreProducts: products.length > 0 })
    }
})

serverSocket.on('uploadRealTimeProducts', products => {
    const divProducts = document.querySelector('#products')
    if (divProducts) {
        divProducts.innerHTML = createHtmlRealTimeProducts({ products, thereAreProducts: products.length > 0 })
    }
})