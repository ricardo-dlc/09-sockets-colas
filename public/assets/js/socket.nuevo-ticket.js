const socket = io();

const label = $('#lblNuevoTicket');

// Escuchar información
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Se ha perdido la conexión con el servidor');
});

// Obtener último ticket
socket.on('estadoActual', (data) => {
    label.text(data.ultimo);
});

// Actualizar último ticket
$('button').on('click', () => {
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});
