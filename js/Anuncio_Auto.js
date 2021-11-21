class Anuncio_Auto extends Anuncio{

    constructor(titulo, tipoVenta, descripcion, precio, cantPuertas, kilometraje, potencia) {
        
        super(titulo, tipoVenta, descripcion, precio);
        this.cantPuertas = cantPuertas;
        this.kilometraje = kilometraje;
        this.potencia = potencia;

    }

  }
