const socket = io();

const lblTicket1 = $('#lblTicket1');
const lblTicket2 = $('#lblTicket2');
const lblTicket3 = $('#lblTicket3');
const lblTicket4 = $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

const lblTickets = [lblTicket1, lblTicket2, lblTicket3, lblTicket4];

const lblEscritorios = [lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4];

// Escuchar información
socket.on('connect', () => {
    console.log('Conectado al servidor');
});

socket.on('disconnect', () => {
    console.log('Se ha perdido la conexión con el servidor');
});

socket.on('estadoActual', (data) => {
    actualizarUltimos(data.ultimosCuatro);
});

socket.on('ultimosCuatro', (data) => {
    const audio = new Audio('assets/audio/new-ticket.mp3');
    console.log(data.ultimosCuatro);
    if (data.ultimosCuatro.length !== 0) {
        actualizarUltimos(data.ultimosCuatro);
        audio.play();
    }
});

function actualizarUltimos(ultimos) {
    for (let i = 0; i < ultimos.length; i++) {
        lblTickets[i].text(`Ticket ${ultimos[i].numero}`);
        lblEscritorios[i].text(`Escritorio ${ultimos[i].escritorio}`);
    }
}
