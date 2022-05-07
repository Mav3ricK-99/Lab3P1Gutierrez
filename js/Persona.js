class Persona {

    constructor(id, dni, apellido, nombre) {
        
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.apellido = apellido;

    }

    toString() {
        console.log("PERSONA");
        console.log("   ID: " + this.id);
        console.log("   DNI: " + this.dni);
        console.log("   APELLIDO: " + this.apellido);
        console.log("   NOMBRE: " + this.nombre);
    } 
  }
