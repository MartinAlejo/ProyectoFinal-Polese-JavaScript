// Elimina el carrito del local storage, y remueve todas las facturas del Html. Luego, carga
// un aviso al Html de que el carrito esta vacio
function vaciarCarrito() {
  localStorage.removeItem("carrito");

  let contadorCarrito = document.getElementById("contador-carrito");

  contadorCarrito.innerText = 0;

  let detallesDeLaVenta = document.getElementById("detalles-de-la-venta");
  detallesDeLaVenta.innerHTML = "";

  calcularTotalAlHTML();

  let containerBotoneraConTotal = document.getElementById("botonera-con-total");
  containerBotoneraConTotal.remove();

  cargarSeguirComprandoHTML();
}

// Finaliza la compra del carrito, vaciandolo en el proceso
function finalizarCompra() {
  Swal.fire({
    title: 'Compra realizada',
    text: 'Gracias por tu compra',
    icon: 'success',
    showConfirmButton: false
  });

  vaciarCarrito();
}

// Abre un modal donde se pide confirmacion para vaciar el carrito
function pedirConfirmacionVaciarCarrito() {
  Swal.fire({
    title: 'Borrar carrito',
    text: "¿Estás seguro que querés borrar todos los productos de tu carrito?",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Aceptar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      vaciarCarrito();
    }
  })
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

// Remueve una venta del carrito y del Html. Si resulta que luego de remover una venta el carrito esta
// vacio, tambien carga un aviso en el Html al usuario
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

  if (!carritoParseado || carritoParseado.ventas.length === 0) {
    let containerBotoneraConTotal = document.getElementById("botonera-con-total");
    containerBotoneraConTotal.remove();
    
    cargarSeguirComprandoHTML();
  }
}

// Agrega los botones de vaciar carrito, finalizar compra, y el total de la compra
function agregarBotonesYTotalAlHTML() {
  let mainRow = document.getElementById("main-carrito-row");

  let contenedor = document.createElement("div");
  contenedor.id = "botonera-con-total";

  contenedor.classList.add("col-12", "p-5", "ms-0", "d-flex", "flex-column", "flex-lg-row", "align-items-center", "align-items-lg-baseline");

  contenedor.innerHTML = `
  <button class="btn btn-secondary ms-lg-5" id="btn-vaciar-carrito">Vaciar carrito</button>
  <p class="text my-4 my-lg-0 ms-lg-auto me-lg-5" id="total"><b>Total: </b>$0</p>
  <button class="btn btn-secondary me-lg-5" id="btn-finalizar-compra">Comprar</button>
  `;

  mainRow.appendChild(contenedor);

}

// Carga las ventas del carrito almacenado en el storage al Html
function cargarVentasAlHTML() {
  let detallesDeLaVenta = document.getElementById("detalles-de-la-venta");
  
  let carritoParseado = JSON.parse(localStorage.getItem("carrito"));

  if (!carritoParseado) {
    return;
  }

  for (venta of carritoParseado.ventas) {
    let categoriaDeProducto = venta.producto.categoria;
    let carpetaImgs;

    if (categoriaDeProducto === "dulce") {
      carpetaImgs = "../assets/images/productos_dulces";
    }
    else {
      carpetaImgs = "../assets/images/productos_salados"
    }

    let record = document.createElement("div");

    record.classList.add("card", "d-flex", "flex-column", "flex-lg-row", "justify-content-center", "align-items-center", "bg-light", "rounded-pill", "m-0", "p-3", "my-3");

    record.innerHTML = `
    <div class="col-12 col-lg-2 my-3 my-lg-0 ms-lg-5 d-flex align-items-center justify-content-center justify-content-lg-start">
      <img src="${carpetaImgs}/${venta.producto.nombreDeArchivo}" class="card-img-carrito text m-0 p-0 rounded-circle"/>
    </div>
    <div class="col-12 col-lg-2 my-3 my-lg-0 ms-lg-4 d-flex align-items-center justify-content-center justify-content-lg-start">
      <p class="text m-0 p-0"><b>${venta.producto.titulo}</b></p>
    </div>
    <div class="col-12 col-lg-2 my-3 my-lg-0 d-flex align-items-center justify-content-center justify-content-lg-start">
      <p class="text m-0 p-0">Precio unitario: $${venta.producto.precio}</p>
    </div>
    <div class="col-12 col-lg-2 my-3 my-lg-0 d-flex align-items-center justify-content-center justify-content-lg-start">
      <p class="text m-0 p-0">Cantidad: ${venta.cantidad}</p>
    </div>
    <div class="col-12 col-lg-2 my-3 my-lg-0 d-flex align-items-center justify-content-center justify-content-lg-start">
      <p class="text m-0 p-0">Subtotal: $${venta.producto.precio * venta.cantidad}</p>
    </div>
    <div class="col-12 col-lg-1 my-3 my-lg-0 d-flex align-items-center justify-content-center">
      <p class="text m-0"> <i onclick="removerVenta(this.id)" type="button" class="btn-remover-producto btn p-0 m-0 text-muted bi bi-trash3-fill" id="remover-${venta.producto.nombre}"></i> </p>
    </div>
    `;

    detallesDeLaVenta.appendChild(record);
  }

  calcularTotalAlHTML();
}

// Carga al Html un mensaje al usuario de que el carrito esta vacio, y un boton para seguir comprando
function cargarSeguirComprandoHTML() {
  let mainRow = document.getElementById("main-carrito-row");

  let contenedor = document.createElement("div");

  contenedor.classList.add("col-12", "p-5", "ms-0", "d-flex", "flex-column", "align-items-center");

  contenedor.innerHTML = `
  <p>No hay elementos en el carrito</p>
  <a href="../pages/productos_dulces.html" class="btn btn-secondary mt-4">Seguir comprando</a>
  `;

  mainRow.appendChild(contenedor);
}

// Construye el HTML de la pagina a partir del carrito, y agrega los eventos pertinentes
function construirHTML() {
  let carritoParseado = JSON.parse(localStorage.getItem("carrito"));

  if (!carritoParseado || carritoParseado.ventas.length === 0) {
    cargarSeguirComprandoHTML();
    return;
  }

  agregarBotonesYTotalAlHTML();
  cargarVentasAlHTML();

  btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
  btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

  btnVaciarCarrito.addEventListener("click",pedirConfirmacionVaciarCarrito);
  btnFinalizarCompra.addEventListener("click",finalizarCompra);
}


function main() {
  construirHTML();
}

main();



