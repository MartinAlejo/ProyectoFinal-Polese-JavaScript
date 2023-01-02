class Producto {

  constructor(nombre, precio, descripcion = "", nombreDeArchivo = "", titulo = "", categoria = "") {
    this.nombre = nombre.toLowerCase();
    this.precio = precio;
    this.descripcion = descripcion;
    this.nombreDeArchivo = nombreDeArchivo;
    this.titulo = titulo;
    this.categoria = categoria;
  }

  // Modifica el precio de un producto. Devuelve true si se modifico correctamente, false en caso contrario
  modificarPrecio(nuevoPrecio) {

    if (isNaN(nuevoPrecio)) {
      return false;
    }

    this.precio = nuevoPrecio;

    return true;
  }

}