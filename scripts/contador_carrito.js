// Muestra la cantidad de productos que hay en el carrito
function mostrarContadorDelCarrito() {
  let carritoParseado = JSON.parse(localStorage.getItem("carrito"));
  
  let contadorCarrito = document.getElementById("contador-carrito");

  let contador = 0;

  if (!carritoParseado) {
    contadorCarrito.innerText = contador;
    return;
  }

  carritoParseado.ventas.forEach((venta) => contador += venta.cantidad);

  contadorCarrito.innerText = contador;
}

function main() {
  mostrarContadorDelCarrito();
}

main();