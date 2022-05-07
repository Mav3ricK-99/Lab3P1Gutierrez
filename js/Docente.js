class Docente extends Persona{

    constructor(id, dni, apellido, nombre, materia, año) {
        
        super(id, dni, apellido, nombre);
        this.materia = materia;
        this.año = año;

    }

    toString() {
        super.toString();
        console.log(". . . Docente")
        console.log("       MATERIA: " + this.materia);
        console.log("       AÑO: " + this.año);
    } 
}