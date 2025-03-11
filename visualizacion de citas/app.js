function aplicarFiltro() {
    let fechaInput = document.getElementById("fechaFiltro").value;
    if (!fechaInput) {
        // Si no hay fecha, mostrar todas las filas y ocultar el mensaje
        document.querySelectorAll("#cuerpoCitas tr").forEach(fila => fila.style.display = "");
        document.getElementById("mensajeNoCitas").style.display = "none";
        return;
    }

    // Convertir fecha (YYYY-MM-DD) a formato (DD-MM-YYYY)
    let fechaFormateada = fechaInput.split("-").reverse().join("-");

    // Llamar a la función de filtrado
    filtrarCitasPorFecha(fechaFormateada);
}

function filtrarCitasPorFecha(fecha) {
    const filas = document.querySelectorAll("#cuerpoCitas tr:not(#mensajeNoCitas)");
    let hayResultados = false;

    filas.forEach(fila => {
        const fechaCita = fila.querySelector("td[data-label='FECHA']").textContent.trim();
        if (fechaCita === fecha) {
            fila.style.display = "";
            hayResultados = true;
        } else {
            fila.style.display = "none";
        }
    });

    // Mostrar mensaje si no hay resultados
    document.getElementById("mensajeNoCitas").style.display = hayResultados ? "none" : "";
}

// También filtrar cuando se cambie la fecha sin presionar el botón
document.getElementById("fechaFiltro").addEventListener("input", aplicarFiltro);
