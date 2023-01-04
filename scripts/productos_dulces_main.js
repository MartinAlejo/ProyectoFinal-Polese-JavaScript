function main() {
  let carpetaImgs = "../assets/images/productos_dulces"; // Es la carpeta donde estan las imagenes

  consturirHTML(carpetaImgs,"dulce");

  guardarCarritoEnStorage(CARRITO);

  let botonesDeAgregarAlCarrito = document.getElementsByClassName("btnAgregarAlCarrito")

  for (btn of botonesDeAgregarAlCarrito) {
    btn.addEventListener("click",(evento) => agregarAlCarrito(evento));
  }
  
  console.log(CARRITO);
}

main()