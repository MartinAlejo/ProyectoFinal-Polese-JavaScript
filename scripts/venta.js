class Venta {

  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  // Incrementa la cantidad de la venta
  incrementarCantidad(cantidad) {
    this.cantidad += cantidad;
  }

  // Devuelve el total de la venta
  obtenerTotal() {
    return this.producto.precio * this.cantidad;
  }

}