async function main() {
  let carpetaImgs = "../assets/images/productos_salados"; // Es la carpeta donde estan las imagenes

  await obtenerProductos();

  SISTEMA_DE_VENTAS.stocks = generarStockDeProductos(STOCK_DE_PRODUCTOS);

  CARRITO.ventas = obtenerVentasCarrito();

  consturirHTML(carpetaImgs,"salado");

  guardarCarritoEnStorage(CARRITO);

  let botonesDeAgregarAlCarrito = document.getElementsByClassName("btnAgregarAlCarrito")

  for (btn of botonesDeAgregarAlCarrito) {
    btn.addEventListener("click",(evento) => agregarAlCarrito(evento));
  }

}

main()