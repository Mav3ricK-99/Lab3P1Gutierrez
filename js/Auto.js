class Auto extends Vehiculo{

    constructor(id, fabricante, modelo, añoLanzamiento, cantidadPuertas) {
        
        super(id, fabricante, modelo, añoLanzamiento);
        this.cantidadPuertas = parseInt(cantidadPuertas);

    }

    toString() {
        super.toString();
        console.log(". . . Auto")
        console.log("       CANTIDAD DE PUERTAS: " + this.cantidadPuertas);
    } 
}