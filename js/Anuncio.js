class Anuncio {

    constructor(titulo, tipoVenta, descripcion, precio, id_vehiculo = null) {
        
        if(id_vehiculo == null){
            let props = localStorage.getItem("vehiculos");
            if(!props){
                this.id_vehiculo = 0;
            }else{
                this.id_vehiculo = JSON.parse(props).length;
            }
        }else{
            this.id_vehiculo = id_vehiculo;
        }
        this.titulo = titulo;
        this.tipoVenta = tipoVenta;
        this.descripcion = descripcion;
        this.precio = precio;

    }

  }
