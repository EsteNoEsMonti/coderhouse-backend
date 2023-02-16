class TicketManagerLucas {
  static precioBaseDeGanancia = 0.15
  eventos

  constructor() {
    this.eventos = []
  }

  getEventos() {
    return this.eventos
  }

  agregarEvento(evento) {
    // cargos por servicio
    // evento.precio = evento.precio + evento.precio * TicketManagerLucas.precioBaseDeGanancia
    evento.precio += evento.precio * TicketManagerLucas.precioBaseDeGanancia

    // id de evento (el mismo del array)
    // evento.id = this.eventos.length
    if (this.eventos.length === 0) {
      evento.id = 0
    } else {
      evento.id = this.eventos[this.eventos.length - 1].id + 1;
    }

    // pusheo el evento al array
    this.eventos.push(evento)
  }

  agregarUsuario(idEvento, idUsuario) {
    const evento = this.eventos.find(evento => evento.id === idEvento)
    if (!evento) {
      throw new Error("Evento no encontrado")
    }

    const usuario = evento.participantes.includes(idUsuario)
    if (usuario) {
      throw new Error("Participante ya registrado en este evento")
    }
    evento.participantes.push(idUsuario)
  }

  ponerEventoEnGira(idEvento, nuevaLocalidad, nuevaFecha) {
    const evento = this.eventos.find(evento => evento.id === idEvento)
    if (!evento) {
      throw new Error("Evento no encontrado")
    }

    const nuevoEvento = {
      ...evento,
      fecha: nuevaFecha,
      lugar: nuevaLocalidad,
      id: this.eventos[this.eventos.length - 1].id + 1,
      participantes: []
    }
    this.eventos.push(nuevoEvento)
  }
}

class EventoLucas {
  constructor(
    nombre,
    lugar,
    precio,
    capacidad = 50,
    fecha = new Date(),
    participantes = []
  ) {
    this.nombre = nombre
    this.lugar = lugar
    this.precio = precio
    this.capacidad = capacidad
    this.fecha = fecha
    this.participantes = participantes
  }
}

const ticketManager = new TicketManagerLucas()

console.log('ticketManager.agregarEvento -> ', ticketManager.agregarEvento(new EventoLucas('Nombre evento', 'Lugar evento', 39000, 250000)));
console.log('ticketManager.agregarEvento -> ', ticketManager.agregarEvento(new EventoLucas('Nombre evento 2', 'Lugar evento 2', 39000, 250000)));
console.log('ticketManager.agregarEvento -> ', ticketManager.agregarUsuario(0, 0));
console.log('ticketManager.agregarEvento -> ', ticketManager.agregarUsuario(0, 1));
console.log('ticketManager.agregarEvento -> ', ticketManager.agregarUsuario(0, 2));
console.log('ticketManager.agregarEvento -> ', ticketManager.agregarUsuario(0, 3));
// console.log('ticketManager.agregarEvento -> ', ticketManager.agregarUsuario(0, 0)); // Error: Participante ya registrado en este evento
console.log('ticketManager.ponerEventoEnGira()) -> ', ticketManager.ponerEventoEnGira(0, 'Lugar de evento ARG', new Date('2023-08-09')));
console.log('ticketManager.getEventos()) -> ', ticketManager.getEventos());
