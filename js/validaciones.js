function enviarVehiculo(e) {

    e.preventDefault();

    if (!AdministrarValidaciones()) {
        return false;
    }

    let fabricante = document.getElementById('fabricante').value;
    let modelo = document.getElementById('modelo').value;
    let añoLanzamiento = document.getElementById('añoLanzamiento').value;
    let modalidad = document.getElementById('modalidad').value;

    let vehiculo;
    switch (modalidad) {

        case 'auto': {
            let cantidadPuertas = parseInt(document.getElementById('cantidadPuertas').value);
            vehiculo = new Auto(id, fabricante, modelo, añoLanzamiento, cantidadPuertas)
        }; break;
        case 'camioneta': {
            let transmision4x4 = document.getElementById("transmision4x4").value;
            vehiculo = new Camioneta(id, fabricante, modelo, añoLanzamiento, transmision4x4)
        }; break;
    }
    vehiculo.toString();
    console.log(vehiculo);

    setSpinnerVisible(true);

    agregarVehiculo(vehiculo);
    
    setSpinnerVisible(false);

    refrescarTabla();

    let primerElSeccTabla = document.getElementById("seccionTabla").children[0];
    if (primerElSeccTabla.tagName == "P") {
        primerElSeccTabla.remove();
    }
    document.getElementById("btnMostrarFormulario").click()


    return true;
}

function AdministrarValidaciones() {
    var campos = ['fabricante', 'modelo', 'añoLanzamiento'];
    if (document.getElementById("modalidad").value === "auto") {
        campos.push("cantidadPuertas");
    } else {
        campos.push("transmision4x4");
    }
    var flagVacios = false, flagValorInvalido = false, flagNoTransaccion = false;
    var camposVacios = [];
    var camposValorInvalido = [];


    campos.forEach(function (element) {
        if (!ValidarCamposVacios(element)) {
            flagVacios = true;
            camposVacios.push(element);
        }
    });

    if (!ValidarCamposNumericos('añoLanzamiento', 1920, 9999)) {
        flagValorInvalido = true;
        camposValorInvalido.push('añoLanzamiento');
    }

    let campoTransmision = document.getElementById("transmision4x4");
    if (!campoTransmision.hidden && ((campoTransmision.value.toLowerCase() != "si") && (campoTransmision.value.toLowerCase() != "no"))) {
        flagValorInvalido = true;
        camposValorInvalido.push('transmision4x4');
    }

    if (campoTransmision.hidden && !ValidarCamposNumericos('cantidadPuertas', 2, 500)) {

        flagValorInvalido = true;
        camposValorInvalido.push('cantidadPuertas');
    }


    if (!flagVacios && !flagValorInvalido && !flagNoTransaccion) {

        let divErrores = document.getElementById("errorSection");
        if (divErrores) {
            document.getElementById("errorSection").remove();
        }

        return true;
    } else {
        AdministrarErrores(camposVacios, camposValorInvalido, flagNoTransaccion);
    }
    return false;
}

function AdministrarErrores(camposVacios, camposValorInvalido, flagNoTransaccion) {

    let divErrores = document.getElementById("errorSection");

    if (divErrores == undefined) {
        divErrores = document.createElement("div");
        divErrores.id = "errorSection";
        document.getElementById("seccionFormulario").insertBefore(divErrores, document.getElementById("formularioBienesRaices"));
    }

    let listaVacios = GenerarListaCampos(camposVacios);
    if (camposValorInvalido.length > 0 || flagNoTransaccion == true) {
        listaVacios.innerHTML += "<br>";
    }

    if (camposVacios.length > 0) {
        divErrores.innerHTML = "Los siguientes campos del formulario se encuentran vacios";
        divErrores.appendChild(listaVacios);
    }

    let listaInvalidos = GenerarListaCampos(camposValorInvalido);
    if (camposValorInvalido.length > 0) {
        divErrores.innerHTML += "Los siguientes campos del formulario tienen datos invalidos";
        divErrores.appendChild(listaInvalidos);
    }

    if (flagNoTransaccion == true) {
        divErrores.innerHTML += "Debe seleccionar al menos un tipo de Vehiculo (Docente/Alumno)";
    }
}

function GenerarListaCampos(lista) {

    let ulErroresCamposVacios = document.createElement("ul");
    lista.forEach((el) => {
        let liCamposVacios = document.createElement("li");
        liCamposVacios.innerHTML = el.replace(el[0], el[0].toUpperCase());
        ulErroresCamposVacios.appendChild(liCamposVacios);
    });

    return ulErroresCamposVacios;
}

function ValidarCamposNumericos(idCampo, min, max) {

    let element = document.getElementById(idCampo);
    let valor = parseInt(element.value);
    if (isNaN(element.value) || valor < min || valor > max) {
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
