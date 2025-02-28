/* LOGICA PARA EL INDEX DE CONFIGURACION DE PERFIL DEL APARTADO DEL ADMINISTRADOR */
document.addEventListener('DOMContentLoaded', () => {
    // Manejo de imagen de perfil
    document.getElementById('fileInput').addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                document.getElementById('profileImage').src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });

    const forms = document.querySelectorAll('form');
    const buttons = document.querySelectorAll('.optionNav');

    function showSection(formClass) {
        forms.forEach(form => form.style.display = 'none');
        const targetForm = document.querySelector(formClass);
        if (targetForm) targetForm.style.display = 'block';
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const target = button.getAttribute('data-target');
            if (target === '.cerrarSesion') {
                console.log('Cerrando sesión...');
                return;
            }
            showSection(target);
        });
    });

    // Mostrar formulario por defecto
    document.getElementById('seccionDefault').style.display = 'block';
});