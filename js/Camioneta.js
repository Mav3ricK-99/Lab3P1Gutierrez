class Camioneta extends Vehiculo{

    constructor(id, fabricante, modelo, añoLanzamiento, transmision4x4) {
        
        super(id, fabricante, modelo, añoLanzamiento);
        this.transmision4x4 = transmision4x4;

    }

    toString() {
        super.toString();
        console.log(". . . Camioneta")
        console.log("       TRANSIMISION 4x4: " + this.transmision4x4);
    }
    
}