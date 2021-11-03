function enviarAnuncio(e) {

    e.preventDefault();
    
    if(!AdministrarValidaciones() || document.getElementById("propEliminar").value != ''){
        return false;
    }
    
    let titulo = document.getElementById('titulo').value;
    let transaccion = GetValueChecked('input[type=radio]');
    let descripcion = document.getElementById('descripcion').value;
    let precio = document.getElementById('precio').value;
    let puertas = document.getElementById('puertas').value;
    let kilometros = document.getElementById('kilometros').value;
    let potencia = document.getElementById('potencia').value;

    let vehiculo = new Anuncio_Auto(titulo, transaccion, descripcion, precio, puertas, kilometros, potencia);
    
    if(!localStorage.getItem("vehiculos")){
        localStorage.setItem("vehiculos", "["+JSON.stringify(vehiculo)+"]");
    }else{
        let vehiculos = JSON.parse(localStorage.getItem("vehiculos"));
        vehiculos.push(vehiculo);
        
        localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    }
    
    document.getElementById("formularioBienesRaices").reset();
    
    let primerElSeccTabla = document.getElementById("seccionTabla").children[0];
    if(primerElSeccTabla.tagName == "P"){
        primerElSeccTabla.remove();
    }
    refrescarTabla();

    return true;
}

function AdministrarValidaciones() {
    var campos = ['titulo', 'descripcion', 'precio', 'puertas', 'kilometros', 'potencia'];
    var camposNumericos = ['precio', 'puertas', 'kilometros', 'potencia'];
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

    if(GetValueChecked('input[type=radio]') == -1){
        flagNoTransaccion = true;
    }

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
        divErrores.innerHTML += "Debe seleccionar al menos un tipo de Transaccion (Venta/Alquiler)";
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
    if(isNaN(element.value)){
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

function GetValueChecked(camposRadio){
    let id = -1;
    document.querySelectorAll(camposRadio).forEach((el) => {if(el.checked){id = el.id;}})
    
    return id;
}