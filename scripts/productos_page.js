////////////////////////////////////// CONSTANTES GLOBALES /////////////////////////////////////////////////

const PRODUCTOS = [];

const STOCK_DE_PRODUCTOS = 10;

const SISTEMA_DE_VENTAS = new SistemaDeVentas(); // El stock inicial de los productos del sistema sera "STOCK_DE_PRODUCTOS"

const CARRITO = new Carrito();

/////////////////////////////////////////// FUNCIONES //////////////////////////////////////////////////////

// Construye los cards en el HTML que contendran a los productos
function construirCardsHTML(carpetaImgs, categoria) {
  for (producto of PRODUCTOS) {
    if (producto.categoria != categoria) {
      continue; // El producto no coincide con la categoria buscada. Se saltea
    }

    let contenedor = document.createElement("div");
    contenedor.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "py-4");
    contenedor.setAttribute("data-aos","zoom-in");

    contenedor.innerHTML = ` 
    <div class="card text-center h-100 shadowBox">
      <img src="${carpetaImgs}/${producto.nombreDeArchivo}" class="card-img-top" alt="${producto.titulo}" data-bs-toggle="modal" data-bs-target="#modal-${producto.nombre}">
      <div class="card-body p-1 d-flex flex-column">
        <h5 class="card-title pt-2 pb-1 mb-0">${producto.titulo}</h5>
        <p class="card-text text-start p-2">${producto.descripcion}</p>
        <p class="card-text text-end mt-auto align-self-center">Precio: $${producto.precio}</p>
        <button class="btnAgregarAlCarrito btn btn-secondary align-self-center mb-2" id="btn-agregar-${producto.nombre}">Agregar al carrito</button>
      </div>
    </div>
    `;

    let padre = document.getElementById("main-div");
    padre.appendChild(contenedor);
  }
}

// Construye los modals en el HTML que se abriran al clickear la imagen de los productos
function consturirModalsHTML(carpetaImgs, categoria) {
  for (producto of PRODUCTOS) {
    if (producto.categoria != categoria) {
      continue; // El producto no coincide con la categoria buscada. Se saltea
    }

    let contenedor = document.createElement("div");
    contenedor.classList.add("modal","fade");
    contenedor.setAttribute("id","modal-"+producto.nombre);
    contenedor.setAttribute("tabindex","-1");
    contenedor.setAttribute("aria-labelledby","exampleModalLabel");
    contenedor.setAttribute("aria-hidden","true");

    contenedor.innerHTML = ` 
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-body">
          <img src="${carpetaImgs}/${producto.nombreDeArchivo}" alt="" class="img-fluid">
        </div>
      </div>
    </div>
    `;

    let padre = document.getElementById("main-div");
    padre.appendChild(contenedor);
  }
}

// Construye la pagina HTML a partir de los "PRODUCTOS", segun la categoría que corresponda
function consturirHTML(carpetaImgs, categoria) {
  construirCardsHTML(carpetaImgs, categoria);
  consturirModalsHTML(carpetaImgs, categoria);
}

// Obtiene los productos que estan almacenados en un archivo .json
async function obtenerProductos() {
  let response = await fetch("../data/productos.json");
  let productos_json = await response.json();

  for (p of productos_json) {
    let producto = new Producto(p.nombre, p.precio, p.descripcion, p.nombreDeArchivo, p.titulo, p.categoria);
    PRODUCTOS.push(producto);
  }
}

// Dada una cantidad, devuelve un array de stocks para inicializar el sistema de ventas
function generarStockDeProductos(cantidad) {
  let stocks = [];

  for (let producto of PRODUCTOS) {
    let stock = new Stock(producto, cantidad);
    stocks.push(stock);
  }

  return stocks;
}

// Obtiene un array con las ventas del carrito del storage, o se inicializa uno vacio en caso de no haber
function obtenerVentasCarrito() {
  let carrito = localStorage.getItem("carrito");

  if (!carrito) {
    return []; // No hay carrito guardado en el localStorage
  }

  carritoParseado = JSON.parse(carrito);

  return reconstruirVentasCarrito(carritoParseado);
}

// Dado un carrito parseado, reconstruye sus ventas y las devuelve
function reconstruirVentasCarrito(carritoParseado) {
  let carrito_aux = new Carrito();

  for(venta of carritoParseado.ventas) {
    let ventaRestaurada = SISTEMA_DE_VENTAS.venderProducto(venta.producto.nombre, venta.cantidad); // De esta manera, facilmente se actualiza el stock al restaurar

    if (!ventaRestaurada) {
      continue; // Hubo un problema al intentar restaurar esta venta, no se restaura (se saltea)
    }

    carrito_aux.agregarVenta(ventaRestaurada);
  }

  return carrito_aux.ventas;
}

// Guarda el carrito en el storage
function guardarCarritoEnStorage() {
  localStorage.setItem("carrito", JSON.stringify(CARRITO));
}

// Dado el ID de un boton que agrega el producto al carrito, devuelve el nombre del producto
// Se asume que el ID esta separado por "-" y que el string despues del ultimo "-" es el nombre del producto
// Ejemplo: btn-loquesea-...-nombreDeProducto
function obtenerNombreDeProducto(btnID) {
  return btnID.split("-").pop();
}

// Incrementa el contador del carrito
function sumarVentaEnElContadorDelCarrito(venta) {
  let contadorCarrito = document.getElementById("contador-carrito");

  contadorCarrito.innerText = parseInt(contadorCarrito.innerText) + venta.cantidad;
}


// Genera una venta y la agrega al carrito (actualizando a su vez el storage)
// Si se pudo agregar al carrito devuelve true, sino, muestra mensaje de que no hay stock y devuelve false
function agregarAlCarrito(evento) {
  let target = evento.target;
  let nombreDeProducto = obtenerNombreDeProducto(target.id);

  let venta = SISTEMA_DE_VENTAS.venderProducto(nombreDeProducto, 1);

  let tituloDeProducto = target.parentElement.querySelector("h5").innerText;

  if (!venta) {
    // No hay stock
    Swal.fire({
      title: 'Sin stock',
      text: 'No queda más stock de ' + tituloDeProducto,
      icon: 'error',
      showConfirmButton: false
    })
    return false;
  }

  CARRITO.agregarVenta(venta);

  sumarVentaEnElContadorDelCarrito(venta);

  guardarCarritoEnStorage();
}
