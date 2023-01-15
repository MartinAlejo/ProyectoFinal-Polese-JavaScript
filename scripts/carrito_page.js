
// Elimina el carrito del local storage, y remueve todas las facturas del Html
function vaciarCarrito() {
  localStorage.removeItem("carrito");

  let contadorCarrito = document.getElementById("contador-carrito");

  contadorCarrito.innerText = 0;

  let detallesDeLaVenta = document.getElementById("detalles-de-la-venta");
  detallesDeLaVenta.innerHTML = "";

  calcularTotalAlHTML();
}

// Calcula y muestra el total a facturar
function calcularTotalAlHTML() {
  let elementoTotal = document.getElementById("total");
  
  let carritoParseado = JSON.parse(localStorage.getItem("carrito"));

  total = 0;

  if (!carritoParseado) {
    elementoTotal.innerHTML = `<b>Total:</b> $${total}`;
    return;
  }

  for (venta of carritoParseado.ventas) {
    total += parseInt(venta.producto.precio * venta.cantidad);
  }

  elementoTotal.innerHTML = `<b>Total:</b> $${total}`;
}

// Remueve una venta del carrito y del HTML
function removerVenta(btnID) {
  let carritoParseado = JSON.parse(localStorage.getItem("carrito"));

  let nombreDeProducto = btnID.split("-").pop();

  let venta = carritoParseado.ventas.find((venta) => venta.producto.nombre === nombreDeProducto);

  let indiceDeVentaABorrar = carritoParseado.ventas.indexOf(venta);
  carritoParseado.ventas.splice(indiceDeVentaABorrar,1);

  localStorage.setItem("carrito",JSON.stringify(carritoParseado));

  let detallesDeLaVenta = document.getElementById("detalles-de-la-venta");
  detallesDeLaVenta.innerHTML = "";

  cargarVentasAlHTML();

  mostrarContadorDelCarrito();
}


// Carga las ventas del carrito almacenado en el storage al Html
function cargarVentasAlHTML() {
  let detallesDeLaVenta = document.getElementById("detalles-de-la-venta");
  
  let carritoParseado = JSON.parse(localStorage.getItem("carrito"));

  if (!carritoParseado) {
    return;
  }

  for (venta of carritoParseado.ventas) {
    let record = document.createElement("tr");

    record.innerHTML = `
    <th class=pt-3>${venta.producto.titulo}</th>
    <td class=pt-3>${venta.producto.precio}</td>
    <td class=pt-3>${venta.cantidad}</td>
    <td class=pt-3>${venta.producto.precio * venta.cantidad}</td>
    <td> <button onclick="removerVenta(this.id)" type="button" class="btn btn-danger" id="remover-${venta.producto.nombre}">Remover</button> </td>
    `;

    detallesDeLaVenta.appendChild(record);
  }

  calcularTotalAlHTML();
}

function main() {
  cargarVentasAlHTML();

  btnVaciarCarrito = document.getElementById("btn-confirmar-vaciar-carrito");

  btnVaciarCarrito.addEventListener("click",vaciarCarrito);
}

main();



