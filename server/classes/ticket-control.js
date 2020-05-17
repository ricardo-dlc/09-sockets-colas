const fs = require('fs');

const Ticket = require('./ticket');

const data = require('../data/data.json');

class TicketControl {
    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.tickets = [];
        this.ultimosCuatro = [];

        if (data.hoy === this.hoy) {
            console.log('Hoy');
            console.log(data);
            this.ultimo = data.ultimo;
            this.tickets = data.tickets;
            this.ultimosCuatro = data.ultimosCuatro;
        } else {
            console.log('Reiniciar');
            this.reiniciarConteo();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;

        const ticket = new Ticket(this.ultimo, null);
        this.tickets.push(ticket);

        this.grabarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    obtenerUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    obtenerUltimosCuatro() {
        return this.ultimosCuatro;
    }

    atenderTicket(escritorio) {
        console.log('Tickets');
        console.log(this.tickets);
        if (this.tickets.length === 0) {
            return 'No hay tickets';
        }

        const tickeInfo = this.tickets.shift();
        const ultimoTicket = new Ticket(tickeInfo.numero, escritorio);
        // console.log('Por atender');
        console.log(ultimoTicket);
        // ultimoTicket.actualizarEscritorio(escritorio);

        this.ultimosCuatro.unshift(ultimoTicket);

        if (this.ultimosCuatro.length > 4) {
            this.ultimosCuatro.splice(-1, 1);
        }
        console.log('Ultimos 4');
        console.log(this.ultimosCuatro);

        console.log('Restantes');
        console.log(this.tickets);

        this.grabarArchivo();

        return ultimoTicket;
    }

    reiniciarConteo() {
        this.ultimo = 0;
        this.tickets = [];
        this.ultimosCuatro = [];

        console.log('Se ha inciado el sistema');

        this.grabarArchivo();
    }

    grabarArchivo() {
        const jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            tickets: this.tickets,
            ultimosCuatro: this.ultimosCuatro
        };

        const jsonDataString = JSON.stringify(jsonData, null, 4);

        fs.writeFileSync('./server/data/data.json', jsonDataString);
        // console.log('Se ha inicializado el sistema');
    }
}

module.exports = {
    TicketControl
};
