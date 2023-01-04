class Carrito {

  constructor(ventas = []) {
    this.ventas = ventas; // Es un array de objetos "Venta"
  }

  // Agrega la venta al carrito, devuelve true si se pudo agregar correctamente
  // En caso de ya existir una venta del mismo producto, se incrementa la cantidad de la venta
  agregarVenta(venta) {

    if (this.existeVenta(venta.producto.nombre)) {
      let ventaYaExistente = this.buscarVenta(venta.producto.nombre);
      
      ventaYaExistente.incrementarCantidad(venta.cantidad);
    }
    else {
      this.ventas.push(venta);
    }
    
    return true

  }

  // Dado el nombre de un producto, devuelve true si existe una venta con dicho producto
  // En caso de no existir la venta, devuelve false
  existeVenta(nombreDeProducto) {
    return this.ventas.some((venta) => venta.producto.nombre === nombreDeProducto.toLowerCase())
  }

  // Dado el nombre de un producto, devuelve la venta de dicho producto
  // En caso de no existir la venta, devuelve undefined
  buscarVenta(nombreDeProducto) {
    return this.ventas.find((venta) => venta.producto.nombre === nombreDeProducto.toLowerCase());
  }

}