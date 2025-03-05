document.addEventListener("DOMContentLoaded", function () {
    // Función para manejar el envío del formulario
    function handleFormSubmit(form, nextFormId) {
        form.addEventListener("submit", async function (e) {
            e.preventDefault(); // Evitar el envío tradicional del formulario

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

                // Intentar extraer mensaje de error si el servidor envía JSON
                let responseData;
                try {
                    responseData = await response.json();
                    if (responseData.error) {
                        console.error("Error del servidor:", responseData.error);
                        alert(`Error del servidor: ${responseData.error}`);
                        return;
                    }
                } catch (jsonError) {
                    console.warn("No se pudo convertir la respuesta a JSON. Puede que el servidor no haya respondido en este formato.");
                }

                // Si todo sale bien, pasar al siguiente formulario
                form.classList.remove("active");
                form.style.display = "none";

                const nextForm = document.getElementById(nextFormId);
                if (nextForm) {
                    nextForm.classList.add("active");
                    nextForm.style.display = "grid";
                }
            } catch (error) {
                console.error("Error de red o al procesar la solicitud:", error);
                alert("Hubo un error de red o un problema inesperado. Revisa la consola para más detalles.");
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

                alert("Datos guardados exitosamente.");
                window.location.href = "http://127.0.0.1:8000/admin/index"; // Redirige a otra página

            } catch (error) {
                console.error("Error de red o al procesar la solicitud:", error);
                alert("Hubo un error de red o un problema inesperado. Revisa la consola para más detalles.");
            }
        });
    }
});

document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
    
    reader.onload = function(e) {
      const previewImage = document.getElementById('previsualizacionImagen');
      previewImage.src = e.target.result;
    };
    
    if (file) {
      reader.readAsDataURL(file);
    }
  });

  document.getElementById('inputImagenFondo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        // Establecemos la nueva imagen de fondo
        document.getElementById('imagenFondo').src = e.target.result;
      };
      
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  });
  
  document.getElementById('inputLogo').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      
      reader.onload = function(e) {
        // Establecemos la nueva imagen del logo
        document.getElementById('logo').src = e.target.result;
      };
      
      reader.readAsDataURL(file); // Lee el archivo como una URL de datos
    }
  });
  