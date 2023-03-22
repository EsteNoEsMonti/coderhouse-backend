// @ts-ignore
const serverSocket = io('http://localhost:8080/')

const templateProducts = `
{{#if thereAreProducts }}
<ul>
    {{#each products}}
    <ul>
      <li>id: {{this.id}}</li>
      <li>title: {{this.title}}</li>
      <li>description: {{this.description}}</li>
      <li>code: {{this.code}}</li>
      <li>price: {{this.price}}</li>
      <li>status: {{this.status}}</li>
      <li>stock: {{this.stock}}</li>
      <li>category: {{this.category}}</li>
    </ul>
    {{/each}}
</ul>
{{else}}
<p>There aren't products 😔</p>
{{/if}}
`
const armarHtmlMensajes = Handlebars.compile(templateProducts)

serverSocket.on('productList', products => {
  const divProducts = document.querySelector('#products')
  if (divProducts) {
      divProducts.innerHTML = armarHtmlMensajes({ products, thereAreProducts: products.length > 0 })
  }
})