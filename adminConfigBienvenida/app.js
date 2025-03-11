document.addEventListener("DOMContentLoaded", function () {


    // Función para manejar el envío del formulario
    function handleFormSubmit(form, nextFormId) {
        let nombreAdmin = document.getElementById("sessionNombreAdmin").value;
        let apellidoAdmin = document.getElementById("sessionApellidoAdmin").value;

        if (nombreAdmin && apellidoAdmin) {
            document.querySelector(".inputLider").value = nombreAdmin + " " + apellidoAdmin;
        }
        form.addEventListener("submit", async function (e) {
            e.preventDefault(); // Evita el envío tradicional del formulario

            // Validar campos antes de enviar
            if (!validateForm(form)) return;

            try {
                const response = await fetch(form.action, {
                    method: form.method,
                    body: new FormData(form),
                });

                if (!response.ok) {
                    const errorMessage = `Error ${response.status}: ${response.statusText}`;
                    console.error(errorMessage);
                    alert(`Hubo un error al enviar los datos. ${errorMessage}`);
                    return;
                }

                let responseData;
                try {
                    responseData = await response.json();

                    if (responseData.error) {
                        console.error("Error del servidor:", responseData.error);
                        alert(`Error del servidor: ${responseData.error}`);
                        return;
                    }

                    // Si el formulario 1 es el que se envió, actualiza los valores de sesión en el frontend
                    if (form.id === "form1") {
                        console.log("Datos recibidos del servidor:", responseData);

                        document.getElementById("sessionNombreAdmin").value = responseData.nombreAdmin;
                        document.getElementById("sessionApellidoAdmin").value = responseData.apellidoAdmin;
                        document.querySelector("input[name='id_usuario']").value = responseData.id_usuario;


                        const nombreSidebar = document.querySelector(".mensajeBienvenida h1"); // Selecciona el <h1>
                        if (nombreSidebar) {
                            nombreSidebar.textContent = `${responseData.nombreAdmin} ${responseData.apellidoAdmin}`;
                        }

                        // ACTUALIZAR EL NOMBRE EN EL ASIDE MÓVIL
                        const nombreSidebarMovil = document.querySelector("#myAside .mensajeBienvenida h1");
                        if (nombreSidebarMovil) {
                            nombreSidebarMovil.textContent = `${responseData.nombreAdmin} ${responseData.apellidoAdmin}`;
                        }

                        // Actualizar form2
                        document.querySelector(".inputLider").value = responseData.nombreAdmin + " " + responseData.apellidoAdmin;
                    }

                } catch (jsonError) {
                    console.warn("No se pudo convertir la respuesta a JSON.");
                }

                // Pasar al siguiente formulario
                form.classList.remove("active");
                form.style.display = "none";

                const nextForm = document.getElementById(nextFormId);
                if (nextForm) {
                    console.log(`Mostrando ${nextFormId}`);
                    nextForm.classList.add("active");
                    nextForm.style.display = "grid"; // Forzar visibilidad
                }
            } catch (error) {
                console.error("Error de red:", error);
                alert("Hubo un error de red.");
            }
        });
    }

    // Función para validar campos requeridos
    function validateForm(form) {
        const inputs = form.querySelectorAll("input, textarea");
        for (const input of inputs) {
            if (input.required && !input.value.trim()) {
                alert(`Por favor, completa el campo: ${input.name}`);
                return false;
            }
        }
        return true;
    }

    // Manejar los formularios secuenciales
    const form1 = document.getElementById("form1");
    if (form1) handleFormSubmit(form1, "form2");

    const form2 = document.getElementById("form2");
    if (form2) handleFormSubmit(form2, "form3");

    const form3 = document.getElementById("form3");
    if (form3) {
        form3.addEventListener("submit", async function (e) {
            e.preventDefault(); // Evitar el envío tradicional del formulario

            // Validar campos antes de enviar
            if (!validateForm(form3)) return;

            try {
                const response = await fetch(form3.action, {
                    method: form3.method,
                    body: new FormData(form3),
                });

                if (!response.ok) {
                    const errorMessage = `Error ${response.status}: ${response.statusText}`;
                    console.error(errorMessage);
                    alert(`Hubo un error al enviar los datos. ${errorMessage}`);
                    return;
                }

                let responseData;
                try {
                    responseData = await response.json();
                    if (responseData.error) {
                        console.error("Error del servidor:", responseData.error);
                        alert(`Error del servidor: ${responseData.error}`);
                        return;
                    }
                } catch (jsonError) {
                    console.warn("No se pudo convertir la respuesta a JSON.");
                }
                window.location.href = "http://127.0.0.1:8000/admin/index";

            } catch (error) {
                console.error("Error de red o al procesar la solicitud:", error);
                alert("Hubo un error de red o un problema inesperado. Revisa la consola para más detalles.");
            }
        });
    }
});


document.getElementById('fileInput').addEventListener('change', function (event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
        const previewImage = document.getElementById('previsualizacionImagen');
        previewImage.src = e.target.result;
    };

    if (file) {
        reader.readAsDataURL(file);
    }
});

document.getElementById('inputImagenFondo').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Establecemos la nueva imagen de fondo
            document.getElementById('imagenFondo').src = e.target.result;
        };

        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
});

document.getElementById('inputLogo').addEventListener('change', function (event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            // Establecemos la nueva imagen del logo
            document.getElementById('logo').src = e.target.result;
        };

        reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
});

// hola
const openButton = document.getElementById('openButton');
const myAside = document.getElementById('myAside');

// Evento para abrir o cerrar el aside flotante
openButton.addEventListener('click', () => {
    myAside.classList.toggle('open');
});
