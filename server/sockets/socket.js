const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {
    console.log('Usuario conectado ');

    client.on('disconnect', () => {
        console.log('Usuario desconectado');
    });

    // Enviar último ticket
    client.emit('estadoActual', {
        ultimo: ticketControl.obtenerUltimoTicket(),
        ultimosCuatro: ticketControl.obtenerUltimosCuatro()
    });

    // Escuchar Tickets
    client.on('siguienteTicket', (data, callback) => {
        const siguiente = ticketControl.siguienteTicket();

        console.log(siguiente);

        callback(siguiente);
    });

    // Atender Tickets
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return {
                err: true,
                mensaje: 'El escritorio es necesario'
            };
        }

        const atenderTicket = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimosCuatro', {
            ultimosCuatro: ticketControl.obtenerUltimosCuatro()
        });

        callback(atenderTicket);
    });
});
