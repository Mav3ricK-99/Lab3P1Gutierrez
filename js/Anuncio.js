class Anuncio {

    constructor(titulo, tipoVenta, descripcion, precio) {
        
        this.titulo = titulo;
        this.tipoVenta = tipoVenta;
        this.descripcion = descripcion;
        this.precio = precio;

    }

    static getPromedioPrecio(veh){

        let total = 0;
        veh.forEach(el => { total += el.precio })

        return total;
    }
  }
