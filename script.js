// Variables para controlar el video de YouTube del audio de fondo
let player;
const btnVolumenYT = document.getElementById("btn-volumen-yt");
const iconoVolumenYT = document.getElementById("icono-volumen-yt");
let isMuted = false; // Estado inicial del sonido

// Función que se llama cuando la API de YouTube está lista
function onYouTubeIframeAPIReady() {
    player = new YT.Player('yt-audio', {
        events: {
            'onReady': onPlayerReady // Cuando el reproductor esté listo
        }
    });
}

// Función que se llama cuando el reproductor está listo
function onPlayerReady(event) {
    event.target.setVolume(50); // Establecer volumen inicial en 50%
    
    // Asignar evento al botón de volumen solo cuando el reproductor esté listo
    btnVolumenYT.addEventListener("click", function() {
        if (isMuted) {
            // Si está silenciado, activamos el volumen
            player.unMute();
            iconoVolumenYT.classList.remove("fa-volume-mute");
            iconoVolumenYT.classList.add("fa-volume-up");
            isMuted = false; // Cambiamos el estado
        } else {
            // Si no está silenciado, silenciamos el audio
            player.mute();
            iconoVolumenYT.classList.remove("fa-volume-up");
            iconoVolumenYT.classList.add("fa-volume-mute");
            isMuted = true; // Cambiamos el estado
        }
    });
}

// --- FUNCIONALIDAD DE RESERVAS ---
// Obtener referencias a los elementos del calendario y los mensajes de reserva
const botonReservar = document.getElementById("btn-reservar");
const calendario = document.getElementById("calendario-reservas");
const mensajeError = document.getElementById("mensaje-error");
const mensajeExito = document.getElementById("mensaje-exito");

// Validar la fecha de reserva (solo permite reservar el 17 de noviembre de 2024)
botonReservar.addEventListener("click", function() {
    const fechaSeleccionada = calendario.value;

    if (fechaSeleccionada === "2024-11-17") {
        mensajeError.style.display = "none";  // Ocultar mensaje de error
        mensajeExito.style.display = "block"; // Mostrar mensaje de éxito
    } else {
        mensajeError.style.display = "block";  // Mostrar mensaje de error
        mensajeExito.style.display = "none";   // Ocultar mensaje de éxito
    }
});

// --- CONTADOR REGRESIVO ---
// Configurar la fecha del evento
const fechaEvento = new Date("November 17, 2024 00:00:00").getTime();

function actualizarContador() {
    const ahora = new Date().getTime();
    const diferencia = fechaEvento - ahora;

    // Cálculo de días, horas, minutos y segundos
    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

    // Mostrar los resultados en los elementos correspondientes
    document.getElementById("dias").innerHTML = dias;
    document.getElementById("horas").innerHTML = horas;
    document.getElementById("minutos").innerHTML = minutos;
    document.getElementById("segundos").innerHTML = segundos;

    // Si se llega a la fecha del evento
    if (diferencia < 0) {
        clearInterval(intervaloContador);
        document.getElementById("timer").innerHTML = "¡La aventura ha comenzado!";
    }
}

// Actualizar el contador cada segundo
const intervaloContador = setInterval(actualizarContador, 1000);
