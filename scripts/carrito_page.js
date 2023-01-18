// Elimina el carrito del local storage, y remueve todas las facturas del Html
function vaciarCarrito() {
  localStorage.removeItem("carrito");

  let contadorCarrito = document.getElementById("contador-carrito");

  contadorCarrito.innerText = 0;

  let detallesDeLaVenta = document.getElementById("detalles-de-la-venta");
  detallesDeLaVenta.innerHTML = "";

  calcularTotalAlHTML();
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
    let categoriaDeProducto = venta.producto.categoria;
    let carpetaImgs;

    if (categoriaDeProducto === "dulce") {
      carpetaImgs = "../assets/images/productos_dulces";
    }
    else {
      carpetaImgs = "../assets/images/productos_salados"
    }

    let record = document.createElement("div");

    record.classList.add("card");
    record.classList.add("d-flex");
    record.classList.add("flex-lg-row");
    record.classList.add("flex-column");
    record.classList.add("justify-content-center");
    record.classList.add("align-items-center");
    record.classList.add("bg-light");
    record.classList.add("rounded-pill");
    record.classList.add("m-0");
    record.classList.add("p-3");
    record.classList.add("my-3");

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

function main() {
  cargarVentasAlHTML();

  btnVaciarCarrito = document.getElementById("btn-vaciar-carrito");
  btnFinalizarCompra = document.getElementById("btn-finalizar-compra");

  btnVaciarCarrito.addEventListener("click",pedirConfirmacionVaciarCarrito);
  btnFinalizarCompra.addEventListener("click",finalizarCompra);
}

main();



