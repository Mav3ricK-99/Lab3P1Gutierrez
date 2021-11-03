class Anuncio_Auto extends Anuncio{

    constructor(titulo, tipoVenta, descripcion, precio, cantPuertas, kilometraje, potencia, id_vehiculo = null) {
        
        super(titulo, tipoVenta, descripcion, precio, id_vehiculo);
        this.cantPuertas = cantPuertas;
        this.kilometraje = kilometraje;
        this.potencia = potencia;

    }

  }
