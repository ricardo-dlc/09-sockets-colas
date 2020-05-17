const socket = io();

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');

const labelTicket = $('#lblTicket');

// Escuchar información
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Se ha perdido la conexión con el servidor');
});

$('#lblEscritorio').text(`Escritorio ${escritorio}`);

$('button').on('click', () => {
    // labelTicket.text('Probando');
    socket.emit('atenderTicket', {
        escritorio
    }, (res) => {
        if (res.numero) {
            labelTicket.text(`Ticket #${res.numero}`);
        } else {
            labelTicket.text(res);
        }
    });
});
