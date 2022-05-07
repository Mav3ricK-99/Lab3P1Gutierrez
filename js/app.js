if (localStorage.getItem("personas") == null) {

    localStorage.setItem("personas", `[{"id":1,"dni":17663295,"nombre":"FABIAN MARCELO","apellido":"ABADIE","cursoNumero":1,"cursoLetra":"F"},{"id":2,"dni":38724762,"nombre":"MAIRA DAIANA","apellido":"ABALOS","cursoNumero":3,"cursoLetra":"M"},{"id":3,"dni":25447357,"nombre":"NOELIA LIDIA","apellido":"ABBA","cursoNumero":2,"cursoLetra":"N"},{"id":4,"dni":27577699,"nombre":"MARÍA SOLEDAD","apellido":"ACHOR","cursoNumero":2,"cursoLetra":"M"},{"id":900,"dni":11496581,"nombre":"JOSE MIGUEL","apellido":"ARMALEO","materia":"Fisica","año":1},{"id":899,"dni":35326658,"nombre":"ROSA DEL VALLE","apellido":"LOPEZ","materia":"Lengua","año":3},{"id":898,"dni":39638351,"nombre":"DANIELA BELEN","apellido":"BROGGI D\`ATENA","materia":"Matematica","año":3},{"id":897,"dni":17275566,"nombre":"PABLO ALBERTO","apellido":"ALMEIDA","materia":"Quimica","año":1}]`);
}


let botonEnviar = document.getElementById("btnGuardar");
let botonModificar = document.getElementById("btnModificar");
let botonEliminar = document.getElementById("btnEliminar");
let botonLimpiar = document.getElementById("btnLimpiar");
let botonMostrarFormulario = document.getElementById("btnMostrarFormulario");
let botonCancelar = document.getElementById("btnCancelar");


let selectFiltro = document.getElementById("selectFiltro");

botonCancelar.addEventListener("click", switchMostrarFormulario, false);
botonEnviar.addEventListener("click", enviarPersona, false);
botonModificar.addEventListener("click", enviarModificarPersona, false);
botonEliminar.addEventListener("click", enviarEliminarPersona, false);

botonMostrarFormulario.addEventListener("click", switchMostrarFormulario, false);

botonLimpiar.addEventListener("click", limpiarForm, false);

selectFiltro.addEventListener("change", filtrarTabla);

let selectTipo = document.getElementById("modalidad");
selectTipo.addEventListener("change", cambioTipoPersona);

setTimeout(() => { administrarTabla() }, (Math.random() * (2000 - 500) + 500));

function cambioTipoPersona(e) {

    if (e.target.value == "docente") {
        document.querySelector("label[for=cursoLetra]").innerHTML = "Materia";
        document.querySelector("label[for=cursoNumero]").innerHTML = "Año";

        document.getElementById("cursoLetra").setAttribute("placeholder", "Materia")
        document.getElementById("cursoNumero").setAttribute("placeholder", "Año")
    } else {

        document.querySelector("label[for=cursoLetra]").innerHTML = "Curso Letra";
        document.querySelector("label[for=cursoNumero]").innerHTML = "Curso Numero";

        document.getElementById("cursoLetra").setAttribute("placeholder", "Curso Letra")
        document.getElementById("cursoNumero").setAttribute("placeholder", "Curso N°")
    }
}

function administrarTabla() {

    let personas = getPersonas();

    if (!personas || personas.length < 1) {
        armarDivError()
    } else {
        let mensajeTabla = document.getElementById("pErrorNoPersonas");
        if (mensajeTabla) {
            mensajeTabla.remove();
        }
        var colsOcultas = JSON.parse(localStorage.getItem("columnasOcultas"));
        if (colsOcultas != null && colsOcultas.length > 0) {
            personas.map((el) => { for (let campo in colsOcultas) { el[colsOcultas[campo]] = ""; } });
        }

        let tabla = armarTabla(personas, "persona", colsOcultas);//
        armarSeccionTabla(tabla, personas)
        mostrarPromedioIDs(personas);
    }
}

function armarDivError() {
    let pTablaVacia = document.createElement("p");
    pTablaVacia.innerHTML = "No se encontraron Personas";
    pTablaVacia.className = "mensajeTabla";
    pTablaVacia.id = "pErrorNoPersonas";
    document.getElementById("seccionTabla").insertBefore(pTablaVacia, document.getElementById("spinner"));
}

function armarSeccionTabla(tabla) {

    let p = document.createElement("p");
    p.innerHTML = "* Puede cargar el Formulario con datos de la tabla haciendo click en algun registro.<br>" +
        "* Tambien al hacer click en el titulo del encabezado de las columnas de la tabla puede ordenar";
    p.classList = "noselect"
    p.id = "ayudaTabla";

    let seccTabla = document.getElementById("seccionTabla");
    seccTabla.insertBefore(tabla, document.getElementById("spinner"));
    seccTabla.insertBefore(p, document.getElementById("spinner"));

    document.querySelectorAll("tr").forEach((el) => { el.addEventListener("dblclick", mostrarEnFormulario, false) });
    document.querySelectorAll("#thOrdenar").forEach((el) => { el.addEventListener("click", ordenarTabla, false) });

    let thFiltros = document.getElementsByClassName("thFiltro")
    Array.from(thFiltros).forEach((el) => {
        el.addEventListener("change", filtrarColumna)
    });
}

function armarTabla(objs, nombreObjs, colFiltradas) {

    let dice = "odd";
    let tabla = document.createElement("table");
    tabla.id = "tabla_persona";
    tabla.className = "table table-dark"
    let tbody = document.createElement("tbody");
    let thead = document.createElement("thead");

    let primeraVezIterando = true;

    objs.forEach((obj) => {

        if (!obj.hasOwnProperty("materia")) {

            obj = {
                id: obj.id,
                dni: obj.dni,
                nombre : obj.nombre,
                apellido : obj.apellido,
                cursoNumero : obj.cursoNumero,
                cursoLetra : obj.cursoLetra,
                año : "",
                materia : "",
            }
        } else if (obj.hasOwnProperty("materia")) {

            obj = {
                id: obj.id,
                dni: obj.dni,
                nombre : obj.nombre,
                apellido : obj.apellido,
                cursoNumero : "",
                cursoLetra : "",
                año : obj.año,
                materia : obj.materia,
            }

        }

        delete obj.fechaPersona;

        let trProducto = document.createElement("tr");
        if (dice == "odd") {
            dice = "even";
            trProducto.className = "table-active";
        } else {
            dice = "odd";
        }
        trProducto.setAttribute("data-" + nombreObjs + "ID", obj.id);

        let trEncabezadoTabla = document.createElement("tr");
        Object.keys(obj).forEach((key) => {

            if (primeraVezIterando == true) {

                let thProducto = document.createElement("th");
                thead.className = "table-light";

                let nombreCol = key.replace(key[0], key[0].toUpperCase());
                let checkInput = "<input type='checkbox' checked id=th-" + key + " class='thFiltro'></input>";

                //console.log(colFiltradas);
                if (colFiltradas) {
                    colFiltradas.forEach(el => {
                        if (el == key) {
                            checkInput = "<input type='checkbox' id=th-" + key + " class='thFiltro'></input>";
                        }
                    })
                }

                let thOrdenar = document.createElement("a");
                thOrdenar.id = "thOrdenar";
                thOrdenar.innerHTML = nombreCol

                thProducto.appendChild(thOrdenar);

                thProducto.innerHTML += checkInput;

                trEncabezadoTabla.appendChild(thProducto)
            }

            let tdProducto = document.createElement("td");

            tdProducto.innerText = obj[key];

            trProducto.appendChild(tdProducto);

        })

        if (primeraVezIterando == true) {
            thead.appendChild(trEncabezadoTabla);
        }
        primeraVezIterando = false;
        tbody.appendChild(trProducto);

    })

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    //tabla.id = "tabla_" + nombreObjs;
    return tabla;
}

function refrescarTabla() {

    document.getElementById("propEliminar").value = "";
    let tabla = document.getElementById("tabla_persona");

    if (tabla) {
        tabla.remove();
        document.getElementById("ayudaTabla").remove();
    }
    setTimeout(() => { administrarTabla() }, (Math.random() * (2000 - 500) + 500));
}

function mostrarEnFormulario(e) {

    setVisibilidadForm(true);
    let idProdEliminar = e.srcElement.parentElement.dataset.personaid;

    if (!idProdEliminar) {
        return null;
    }
    let inputHidden = document.getElementById("propEliminar");
    inputHidden.setAttribute("value", idProdEliminar);

    var campos = ['id', 'dni', 'nombre', 'apellido', 'cursoNumero', 'cursoLetra', 'año', 'materia'];
    e.srcElement.parentElement.childNodes.forEach((el, i) => {
        if(campos[i] == 'id'){
            return;
        }
        if (campos[i] == 'año') {
            let modalidad = document.getElementById("modalidad");
            if (el.innerHTML == '') {
                modalidad.value = "alumno";
            } else {
                modalidad.value = "docente";
                document.getElementById("cursoNumero").value = el.innerHTML
            }
            modalidad.dispatchEvent(new Event('change'))
        } else if(campos[i] == 'materia' && el.innerHTML != ""){
            document.getElementById("cursoLetra").value = el.innerHTML
        } else if (campos[i] == 'materia' && el.innerHTML == "") {

        } else {
            document.getElementById(campos[i]).value = el.innerHTML;
        }

    });
}

function enviarModificarPersona(e) {

    e.preventDefault();

    if (document.getElementById("propEliminar").value == '' || !AdministrarValidaciones()) {
        return false;
    }

    let dni = parseInt(document.getElementById('dni').value);
    let apellido = document.getElementById('apellido').value;
    let nombre = document.getElementById('nombre').value;
    let cursoLetra = document.getElementById('cursoLetra').value;
    let cursoNumero = parseInt(document.getElementById('cursoNumero').value);
    let modalidad = document.getElementById('modalidad').value;
    let idModificar = parseInt(document.getElementById("propEliminar").value);

    let persona;
    switch (modalidad) {

        case 'docente': { persona = new Docente(idModificar, dni, apellido, nombre, cursoLetra, cursoNumero) }; break;
        case 'alumno': { persona = new Alumno(idModificar, dni, apellido, nombre, cursoLetra, cursoNumero) }; break;
    }
    
    if (idModificar) {
        modificarPersona(persona);
        refrescarTabla();
        document.getElementById("btnLimpiar").click()
    }

    document.getElementById("btnMostrarFormulario").click()
}

function ordenarTabla(e) {
    e.preventDefault();

    let personas = filtrarPersonas(getPersonas());

    let campoProp = e.target.text.toLowerCase();
    if (campoProp == "tipoventa") {
        campoProp = "tipoVenta";
    } else if (campoProp == "cantpuertas") {
        campoProp = "cantPuertas";
    }

    let metodoSort = localStorage.getItem("metodoSort");
    if (metodoSort == "menor") {
        metodoSort = "mayor";
    } else if (metodoSort == "mayor" || metodoSort == null) {
        metodoSort = "menor"
    }

    personas.sort(function (per1, per2) {

        let resultado;
        if (metodoSort == "mayor") {
            resultado = 1;
        } else {
            resultado = -1;
        }
        if (per1[campoProp] < per2[campoProp]) {
            return resultado * -1
        }

        if (per1[campoProp] > per2[campoProp]) {
            return resultado
        }
        return 0;
    });

    localStorage.setItem("metodoSort", metodoSort);

    document.getElementById("ayudaTabla").remove();
    document.getElementById("tabla_persona").remove();

    var colsOcultas = JSON.parse(localStorage.getItem("columnasOcultas"));
    if (colsOcultas != null && colsOcultas.length > 0) {
        personas.map((el) => { for (let campo in colsOcultas) { el[colsOcultas[campo]] = ""; } });
    }
    let tabla = armarTabla(personas, "persona", colsOcultas);
    armarSeccionTabla(tabla, personas)

}

function enviarEliminarPersona(e) {

    e.preventDefault();

    if (document.getElementById("propEliminar").value == '' || !AdministrarValidaciones()) {
        return false;
    }

    let idEliminar = document.getElementById("propEliminar").value;
    if (idEliminar) {
        eliminarPersona(idEliminar);
        refrescarTabla();
        document.getElementById("btnLimpiar").click()
    }

    document.getElementById("btnMostrarFormulario").click()
}

function limpiarForm(e) {

    e.preventDefault();
    document.getElementById("formularioBienesRaices").reset()
    document.getElementById("propEliminar").value = "";
    let divErrores = document.getElementById("errorSection");
    if (divErrores) {
        document.getElementById("errorSection").remove();
    }
}

function filtrarPersonas(per) {

    let selectedOpt = document.getElementById("selectFiltro").value;
    if (selectedOpt != "todos" && per.length > 0) {
        per = per.filter(el => {
            if (el.hasOwnProperty("cursoLetra") && selectedOpt == "alumno") {
                return el;
            }else if(el.hasOwnProperty("año") && selectedOpt == "docente"){
                return el;
            }
        })
    }
    return per
}

function filtrarTabla(e) {

    let per = localStorage.getItem("personas");

    let columnasOcultas = getColumnasOcultas();

    let tablaExistente = document.getElementById("tabla_persona");
    if (per && tablaExistente != null) {
        per = JSON.parse(per);
        document.getElementById("tabla_persona").remove();
        document.getElementById("ayudaTabla").remove();
        per = filtrarPersonas(per);

        per.map((el) => { for (let campo in columnasOcultas) { el[columnasOcultas[campo]] = ""; } });
        //Si borro con delete no aparecen los checks'

        let tabla = armarTabla(per, "persona", columnasOcultas);
        armarSeccionTabla(tabla)
        mostrarPromedioIDs(per);
    }

}

function filtrarColumna(e) {

    let per = localStorage.getItem("personas");

    let columnasOcultas = getColumnasOcultas();
    localStorage.setItem("columnasOcultas", JSON.stringify(columnasOcultas));

    let tablaExistente = document.getElementById("tabla_persona");
    if (per && tablaExistente != null) {

        per = JSON.parse(per);
        per = filtrarPersonas(per);

        per.map((el) => { for (let campo in columnasOcultas) { el[columnasOcultas[campo]] = ""; } });
        //Si borro con delete no aparecen los checks'

        document.getElementById("tabla_persona").remove();
        document.getElementById("ayudaTabla").remove();


        let tabla = armarTabla(per, "persona", columnasOcultas);
        armarSeccionTabla(tabla)
    }
}

function getColumnasOcultas() {

    let thFiltros = document.getElementsByClassName("thFiltro")
    let columnasOcultas = [];

    Array.from(thFiltros).forEach((el) => {
        if (!el.checked) {
            columnasOcultas.push(el.id.substr(3))
        }
    });

    return columnasOcultas;
}

function mostrarPromedioIDs(personas) {

    let totalIDs = 0;
    totalIDs = personas.reduce(function( valorAnterior, valorActual, indice, vector){
        return valorActual.id + valorAnterior
      }, totalIDs);

    //console.log(totalIDs)
    if (personas.length > 0) {
        promedioIDs = totalIDs / (document.querySelectorAll("tr").length - 1);
    } else {
        promedioIDs = "N/A";
    }
    let promeDIOS = document.getElementById("promedios");
    promeDIOS.innerText = "PromeDIOS de ID: " + promedioIDs.toFixed(2);
}


function switchMostrarFormulario(e) {

    e.preventDefault();

    botonLimpiar.click();
    let articleFormulario = document.getElementById("seccionFormulario")
    let estadoVisibilidad = articleFormulario.style.display
    if (estadoVisibilidad == "none") {
        articleFormulario.style.display = "block";
    } else {
        articleFormulario.style.display = "none";
    }
}

function setVisibilidadForm(visibilidad) {

    let articleFormulario = document.getElementById("seccionFormulario")
    visibilidad == true ? articleFormulario.style.display = "block" : articleFormulario.style.display = "none";
}