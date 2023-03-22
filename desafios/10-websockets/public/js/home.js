// @ts-ignore
const serverSocket = io('http://localhost:8080/')

const templateProducts = `
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
const createHtmlProducts = Handlebars.compile(templateProducts)

serverSocket.on('productList', products => {
    const divProducts = document.querySelector('#products')
    if (divProducts) {
        divProducts.innerHTML = createHtmlProducts({ products, thereAreProducts: products.length > 0 })
    }
})
