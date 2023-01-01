class Stock {

  constructor(producto, cantidad) {
    this.producto = producto;
    this.cantidad = cantidad;
  }

  // Se reduce el stock. Devuelve true si se pudo reducir, false en caso contrario
  reducir(cantidad) {
    if (isNaN(cantidad) || cantidad < 0) {
      return false;
    } 

    if ((this.cantidad - cantidad) < 0) {
      return false;
    }

    this.cantidad -= cantidad;

    return true;
  }

  // Se incrementa el stock. Devuelve true si se pudo aumentar, false en caso contrario
  incrementar(cantidad) {
    if (isNaN(cantidad) || cantidad < 0) {
      return false;
    }

    this.cantidad += cantidad;

    return true;
  }

}