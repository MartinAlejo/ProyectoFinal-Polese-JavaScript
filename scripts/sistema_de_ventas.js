class SistemaDeVentas {

  constructor(stocks = []) {
    this.stocks = stocks; // Stocks es un array de "Stock"
  }

  // Se vende cantidad de veces un producto a un cliente. Se actualiza el stock y devuelve un objeto Venta 
  // si se pudo vender, false en caso contrario
  venderProducto(nombreDeProducto, cantidad) {
    for (let stock of this.stocks) {
      if (stock.producto.nombre !== nombreDeProducto.toLowerCase()) {
        continue;
      }

      let sePudoVender = stock.reducir(cantidad);

      if (sePudoVender) {
        return new Venta(stock.producto, cantidad);
      }

      return false; // No hay suficiente stock para realizar la venta
    }

    return false; // No se encontro el producto
  }

  // Se repone el stock de un producto cantidad de veces. Devuelve true si se pudo reponer el stock,
  // false en caso contrario
  reponerStock(nombreDeProducto, cantidad) {
    let stock = this.stocks.find((stock) => stock.producto.nombre === nombreDeProducto.toLowerCase());

    if (stock === undefined) {
      return false;
    }

    return stock.incrementar(cantidad);
  }

  // Verifica si existe un producto en el sistema de ventas. Devuelve true si existe, false
  // en caso contrario
  existeProducto(nombreDeProducto) {
    return this.stocks.some((stock) => stock.producto.nombre === nombreDeProducto.toLowerCase())
  }

  // Agrega un nuevo producto al sistema de ventas. Devuelve true si se pudo agregar
  // false en caso contrario
  agregarNuevoProducto(nombreDeProducto, precio, descripcion = "", nombreDeArchivo = "", titulo = "", categoria = "", cantidad) {
    if (precio < 0 || this.existeProducto(nombreDeProducto)) {
      return false;
    }

    let producto = new Producto(nombreDeProducto, precio, descripcion, nombreDeArchivo, titulo, categoria);

    this.stocks.push(new Stock(producto, cantidad));

    return true;
  }

  // Dado un producto, devuelve su stock. Si no se pudiese encontrar el stock de dicho producto
  // devuelve false
  obtenerStock(nombreDeProducto) {
    for (let stock of this.stocks) {
      if (stock.producto.nombre === nombreDeProducto.toLowerCase()) {
        return stock.cantidad;
      }
    }

    return false;
  }

  // Dado un producto, devuelve true si queda stock, false en caso contrario
  hayStock(nombreDeProducto) {
    let stockDisponible = this.obtenerStock(nombreDeProducto);

    return (stockDisponible > 0) ? true : false;
  }

  // Dada un producto y una cantidad, devuelve true si se puede realizar la venta, false en caso contrario
  sePuedeVender(nombreDeProducto, cantidad) {
    let stockDisponible = this.obtenerStock(nombreDeProducto);

    if ((stockDisponible - cantidad) < 0) {
      return false;
    }

    return true;
  }

}