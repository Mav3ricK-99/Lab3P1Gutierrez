class Vehiculo {

    constructor(id, fabricante, modelo, añoLanzamiento) {
        
        this.id = id;
        this.fabricante = fabricante;
        this.modelo = modelo;
        this.añoLanzamiento = parseInt(añoLanzamiento);

    }

    setId(id) {
        this.id = id;
    }

    toString() {
        console.log("VEHICULO");
        console.log("   ID: " + this.id);
        console.log("   FABRICANTE: " + this.fabricante);
        console.log("   MODELO: " + this.modelo);
        console.log("   ANIO LANZAMIENTO: " + this.añoLanzamiento);
    }

    toJSONString(conId) {

        let vehiculoRetorno = Object.assign({}, this)
        if (!conId) {
            delete vehiculoRetorno["id"];
        }

        return JSON.stringify(vehiculoRetorno);
    } 
  }
