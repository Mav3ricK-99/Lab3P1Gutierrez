function enviarPersona(e) {

    e.preventDefault();
    
    if(!AdministrarValidaciones() || document.getElementById("propEliminar").value != ''){
        return false;
    }
    
    let dni = parseInt(document.getElementById('dni').value);
    let apellido = document.getElementById('apellido').value;
    let nombre = document.getElementById('nombre').value;
    let cursol = document.getElementById('cursoLetra').value;
    let curson = parseInt(document.getElementById('cursoNumero').value);
    let modalidad = document.getElementById('modalidad').value;

    let persona;
    switch(modalidad){

        case 'docente': {persona = new Docente(0, dni, apellido, nombre, cursol, curson)};break;
        case 'alumno': {persona = new Alumno(0, dni, apellido, nombre, cursol, curson)};break;
    }
    persona.toString();
    console.log(persona);

    agregarPersona(persona);

    document.getElementById("btnLimpiar").click();
    
    let primerElSeccTabla = document.getElementById("seccionTabla").children[0];
    if(primerElSeccTabla.tagName == "P"){
        primerElSeccTabla.remove();
    }
    refrescarTabla();
    document.getElementById("btnMostrarFormulario").click()

    return true;
}

function AdministrarValidaciones() {
    var campos = ['dni', 'apellido', 'nombre', 'cursoLetra', 'cursoNumero'];
    var camposNumericos = ['dni'];
    var flagVacios = false, flagValorInvalido = false, flagNoTransaccion = false;
    var camposVacios = [];
    var camposValorInvalido = [];
    
    campos.forEach(function (element) {
        if (!ValidarCamposVacios(element)) {
            flagVacios = true;
            camposVacios.push(element);
        }
    });
    
    camposNumericos.forEach((el) => {

        if (!ValidarCamposNumericos(el)) {
            flagValorInvalido = true;
            camposValorInvalido.push(el);
        }
    })

    if (!flagVacios && !flagValorInvalido && !flagNoTransaccion) {
        
        let divErrores = document.getElementById("errorSection");
        if(divErrores){
            document.getElementById("errorSection").remove();
        }

        return true;
    }else{
        AdministrarErrores(camposVacios, camposValorInvalido, flagNoTransaccion);
    }
    return false;
}

function AdministrarErrores(camposVacios, camposValorInvalido, flagNoTransaccion) {
 
    let divErrores = document.getElementById("errorSection");

    if(divErrores == undefined){
        divErrores = document.createElement("div");
        divErrores.id = "errorSection";
        document.getElementById("seccionFormulario").insertBefore(divErrores, document.getElementById("formularioBienesRaices"));
    }

    let listaVacios = GenerarListaCampos(camposVacios);
    if(camposValorInvalido.length > 0 || flagNoTransaccion == true){
        listaVacios.innerHTML += "<br>";
    }

    if(camposVacios.length > 0){
        divErrores.innerHTML = "Los siguientes campos del formulario se encuentran vacios";
        divErrores.appendChild(listaVacios);
    }
    
    let listaInvalidos = GenerarListaCampos(camposValorInvalido);
    if(camposValorInvalido.length > 0){
        divErrores.innerHTML += "Los siguientes campos del formulario tienen datos invalidos";
        divErrores.appendChild(listaInvalidos);
    }

    if(flagNoTransaccion == true){
        divErrores.innerHTML += "Debe seleccionar al menos un tipo de Persona (Docente/Alumno)";
    }
    
}

function GenerarListaCampos(lista){

    let ulErroresCamposVacios = document.createElement("ul");
    lista.forEach((el) =>{
        let liCamposVacios = document.createElement("li");
        liCamposVacios.innerHTML = el.replace(el[0], el[0].toUpperCase());
        ulErroresCamposVacios.appendChild(liCamposVacios);
    });

    return ulErroresCamposVacios;
}

function ValidarCamposNumericos(idCampo){

    let element = document.getElementById(idCampo);
    if(isNaN(element.value) || element.value.length < 8){
        return false;
    }
    return true;
}

function ValidarCamposVacios(idCampo) {
    let element = document.getElementById(idCampo);
    if (element.value != null && element.value != "") {
        return true;
    }
    return false;
}
