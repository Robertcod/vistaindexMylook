let efectoVanta = VANTA.NET({
  el: "#bienvenidaIzquierda",  //  Selecciona el elemento donde se aplicará el efecto
  backgroundColor: 0xa68160, //  Color de fondo
  mouseControls: true, //  Permite interacción con el mouse
  touchControls: true, //  Habilita control táctil
  gyroControls: false, //  Desactiva giroscopio
  minHeight: window.innerHeight, //  Ajusta la altura mínima
  minWidth: window.innerWidth, //  Ajusta el ancho mínimo
  scale: 1.00,
  scaleMobile: 1.00,
  color: 0xfffff0, //  Color de la animación
  points: 9.00, //  Cantidad de puntos en la animación
  maxDistance: 12.00 // ↔Distancia máxima entre puntos
});

// Detectar cambios en la resolución sin perder las propiedades anteriores
window.addEventListener("resize", function () {
  if (efectoVanta) efectoVanta.destroy(); // Elimina la instancia anterior para evitar errores
  efectoVanta = VANTA.NET({
    el: "#bienvenidaIzquierda",
    backgroundColor: 0xa68160, 
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: window.innerHeight,
    minWidth: window.innerWidth,
    scale: 1.00,
    scaleMobile: 1.00,
    color: 0xfffff0,
    points: 9.00,
    maxDistance: 12.00
  });
});

//  Lista de imágenes para el fondo dinámico
const imagenes = [
  "https://img.freepik.com/foto-gratis/joven-peluqueria-corte-pelo_1303-26254.jpg?t=st=1740666578~exp=1740670178~hmac=3d77e5f8c1b60da910d3bfa147db3c59bae2d3600836ca296b793d25bb1fcda9&w=1060",
  "https://img.freepik.com/foto-gratis/maquilladora-preparando-modelo-sesion-fotos_23-2149305147.jpg?t=st=1740666362~exp=1740669962~hmac=d5f3694d2ffd6d3b8398efd3ae090069be25a82bd1bea8c448916bdd5d136e07&w=1060",
  "https://img.freepik.com/foto-gratis/hombre-guapo-barberia-afeitado-barba_1303-26258.jpg?t=st=1740666553~exp=1740670153~hmac=408dc6aa2b5c08858d7ae6da0b0942fe87eca648aa1f01abd079239a92ed68a7&w=1060",
];

// Precarga las imágenes antes de usarlas para evitar retrasos
const imagenesPrecargadas = imagenes.map(src => {
  const img = new Image();
  img.src = src;
  return img;
});

let index = 0;
const contenedor = document.querySelector(".bienvenidaDerecha");

function cambiarImagen() {
  contenedor.style.backgroundImage = `url(${imagenesPrecargadas[index].src})`; // Cambia la imagen de fondo
  index = (index + 1) % imagenes.length; // Cicla entre las imágenes disponibles
}

// Cambiar imagen cada 5 segundos
setInterval(cambiarImagen, 5000);

cambiarImagen(); // Llamado inicial para mostrar la primera imagen