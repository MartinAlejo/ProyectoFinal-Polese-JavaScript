async function main() {
  let carpetaImgs = "../assets/images/productos_dulces"; // Es la carpeta donde estan las imagenes

  await cargarProductos();

  SISTEMA_DE_VENTAS.stocks = generarStockDeProductos(STOCK_DE_PRODUCTOS);

  CARRITO.ventas = obtenerVentasCarrito();

  consturirHTML(carpetaImgs,"dulce");

  guardarCarritoEnStorage(CARRITO);

  let botonesDeAgregarAlCarrito = document.getElementsByClassName("btnAgregarAlCarrito")

  for (btn of botonesDeAgregarAlCarrito) {
    btn.addEventListener("click",(evento) => agregarAlCarrito(evento));
  }

  console.log(CARRITO);

}

main()