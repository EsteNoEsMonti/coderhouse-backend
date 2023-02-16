class Contador {
  static cant = 0

  constructor(responsable) {
      this.responsable = responsable
      this.contador = 0
  }

  contar() {
      this.contador++
      Contador.cant++
  }

  getResponsable() {
      return this.responsable
  }

  getCuentaIndividual() {
      return this.contador
  }

  getCuentaGlobal() {
      return Contador.cant
  }
}

const c1 = new Contador('Lucas')
const c2 = new Contador('Luna')

c1.contar()
c1.contar()
c1.contar()

c2.contar()
c2.contar()
c2.contar()
c2.contar()
c2.contar()

console.log(c1.getResponsable())
console.log(c1.getCuentaIndividual())
console.log(c1.getCuentaGlobal())

console.log(c2.getResponsable())
console.log(c2.getCuentaIndividual())
console.log(c2.getCuentaGlobal())