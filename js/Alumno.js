class Alumno extends Persona{

    constructor(id, dni, apellido, nombre, cursoLetra, cursoNumero) {
        
        super(id, dni, apellido, nombre);
        this.cursoLetra = cursoLetra[0];
        this.cursoNumero = cursoNumero;

    }

    toString() {
        super.toString();
        console.log(". . . Alumno")
        console.log("       CURSO LETRA: " + this.cursoLetra);
        console.log("       CURSO NUMERO: " + this.cursoNumero);
    } 
}