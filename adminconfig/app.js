function mostrarFormulario(actual) {
    // Oculta el formulario actual
    document.getElementById(`form${actual}`).classList.remove('active');
    
    // Muestra el siguiente formulario
    let siguiente = actual + 1;
    let formSiguiente = document.getElementById(`form${siguiente}`);
    if (formSiguiente) {
        formSiguiente.classList.add('active');
    }
}