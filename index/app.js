VANTA.NET({
    el: "#bienvenidaIzquierda",  // Asegúrate de que el ID es correcto
    backgroundColor: 0xa68160, // Usa tu color primario en Vanta.js
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.00,
    minWidth: 200.00,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xfffff0,
    points: 9.00,
    maxDistance: 4.00
});

const imagenes = [
  "/imagenes/PELUQUERIA.jpg",
  "/imagenes/MAQUILLAJE.jpg",
  "/imagenes/BARBA.jpg",
];

// Precarga las imágenes antes de usarlas
const imagenesPrecargadas = imagenes.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

let index = 0;
const contenedor = document.querySelector(".bienvenidaDerecha");

function cambiarImagen() {
  contenedor.style.backgroundImage = `url(${imagenesPrecargadas[index].src})`;
  index = (index + 1) % imagenes.length;
}

// Cambiar imagen cada 5 segundos
setInterval(cambiarImagen, 5000);

cambiarImagen();
