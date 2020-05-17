class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio;
    }

    actualizarEscritorio(escritorio) {
        this.escritorio = escritorio;
    }
}

module.exports = Ticket;
