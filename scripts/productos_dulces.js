// Construye los cards en el HTML que contendran a los productos
function construirCardsHTML() {
  for (producto of PRODUCTOS) {
    let contenedor = document.createElement("div");
    contenedor.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "py-4");
    contenedor.setAttribute("data-aos","zoom-in");

    contenedor.innerHTML = ` 
    <div class="card text-center h-100 shadowBox">
      <img src="../assets/images/productos_dulces/${producto.nombreDeArchivo}" class="card-img-top" alt="${producto.titulo}" data-bs-toggle="modal" data-bs-target="#modal-${producto.nombre}">
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
function consturirModalsHTML() {
  for (producto of PRODUCTOS) {
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
          <img src="../assets/images/productos_dulces/${producto.nombreDeArchivo}" alt="" class="img-fluid">
        </div>
      </div>
    </div>
    `;

    let padre = document.getElementById("main-div");
    padre.appendChild(contenedor);
  }
}

// Construye la pagina HTML a partir de los "PRODUCTOS"
function consturirHTML() {
  construirCardsHTML();
  consturirModalsHTML();
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

// Carga el carrito del storage, o inicializa uno vacio en caso de no haberlo
function cargarCarrito() {
  let carrito = localStorage.getItem("carrito");

  if (!carrito) {
    return new Carrito(); // No hay carrito guardado en el localStorage
  }

  carritoParseado = JSON.parse(carrito);

  return reconstruirCarrito(carritoParseado);
}

// Dado un carrito parseado, lo reconstruye y devuelve
function reconstruirCarrito(carritoParseado) {
  let carrito = new Carrito();

  for(venta of carritoParseado.ventas) {
    let ventaRestaurada = SISTEMA_DE_VENTAS.venderProducto(venta.producto.nombre, venta.cantidad); // De esta manera, facilmente se actualiza el stock al restaurar

    if (!ventaRestaurada) {
      continue; // Hubo un problema al intentar restaurar esta venta, no se restaura (se saltea)
    }

    carrito.agregarVenta(ventaRestaurada);
  }

  return carrito;
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
// Si se pudo agregar al carrito devuelve true, sino, devuelve false
function agregarAlCarrito(evento) {
  let target = evento.target;
  let nombreDeProducto = obtenerNombreDeProducto(target.id);

  let venta = SISTEMA_DE_VENTAS.venderProducto(nombreDeProducto, 1);

  if (!venta) {
    alert("No queda mas stock de " + target.parentElement.querySelector("h5").innerText); // No hay stock
    return false;
  }

  CARRITO.agregarVenta(venta);

  sumarVentaEnElContadorDelCarrito(venta);

  console.log(CARRITO);

  guardarCarritoEnStorage();
}

////////////////////////////////////// MAIN /////////////////////////////////////////////////

const PRODUCTOS = [
  new Producto("magdalena",2,"Super esponjosas, de vainilla o chocolate y rellenas con dulce de leche.","productos_dulces_cupcake.webp","Magdalenas","dulce"),
  new Producto("medialuna",3,"De manteca. Suaves y esponjosas, bañadas con riquísima almíbar.","productos_dulces_medialuna_de_manteca.webp","Medialunas","dulce"),
  new Producto("brownie",5,"Suavecitos, húmedos, chocolatosos y súper deliciosos.","productos_dulces_brownie.webp","Brownies","dulce"),
  new Producto("churro",4,"Crocantes, rellenos de dulce de leche artesanal. También bañados en chocolate.","productos_dulces_churro.webp","Churros","dulce"),
  new Producto("budin",8,"Riquísimos, con mucho gusto a limón, tiernos y húmedos. También hay de chocolate.","productos_dulces_budin.webp","Budines","dulce"),
  new Producto("cookie",3,"Deliciosas cookies de vainilla con chips de chocolate, de sabor irresistible.","productos_dulces_cookie.webp","Cookies","dulce"),
  new Producto("dona",5,"Super esponjosas, con baño de chocolate o frutilla y rellenas con dulce de leche.","productos_dulces_donut.webp","Donas","dulce"),
  new Producto("cheesecake",10,"Cremosos y suaves, con una base de vainilla o chocolate y bañados con dulce de frutilla o maracuya.","productos_dulces_cheesecake.webp","Cheesecakes","dulce"),
  new Producto("pandulce",5,"De textura suave y esponjosa, rellenos con frutos secos y fruta abrillantada.","productos_dulces_pan_dulce.webp","Panes dulces","dulce"),
  new Producto("tartadericota",8,"Exquisitas, contundentes y dulces, rellenas con la ricota casera mas rica.","productos_dulces_tarta_de_ricota.webp","Tartas de ricota","dulce"),
  new Producto("torta",12,"Super cremosas, con corazón de bizcocho esponjoso y rellenas de frutas.","productos_dulces_torta.webp","Tortas","dulce"),
  new Producto("pastafrola",12,"Riquísimas, rellenas con membrillo y espolvoreadas con coco rallado.","productos_dulces_pastafrola.webp","Pastafrolas","dulce")
]

const STOCK_DE_PRODUCTOS = 10;

const SISTEMA_DE_VENTAS = new SistemaDeVentas(generarStockDeProductos(STOCK_DE_PRODUCTOS)); // El stock inicial de los productos del sistema sera "STOCK_DE_PRODUCTOS"

const CARRITO = cargarCarrito();

function main() {
  consturirHTML();

  guardarCarritoEnStorage(CARRITO);

  let botonesDeAgregarAlCarrito = document.getElementsByClassName("btnAgregarAlCarrito")

  for (btn of botonesDeAgregarAlCarrito) {
    btn.addEventListener("click",(evento) => agregarAlCarrito(evento));
  }
  

  console.log(CARRITO);
}

main()