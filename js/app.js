let botonEnviar = document.getElementById("btnGuardar");
//let botonLimpiar = document.getElementById("btnLimpiar");
let botonMostrarFormulario = document.getElementById("btnMostrarFormulario");
let botonCancelar = document.getElementById("btnCancelar");
let botonModificar = document.getElementById("btnModificar");
let botonEliminar = document.getElementById("btnEliminar");

let selectFiltro = document.getElementById("selectFiltro");

botonCancelar.addEventListener("click", switchMostrarFormulario, false);
botonEnviar.addEventListener("click", enviarVehiculo, false);
btnModificar.addEventListener("click", enviarModificarVehiculo, false);
btnEliminar.addEventListener("click", enviarEliminarVehiculo, false);

botonMostrarFormulario.addEventListener("click", switchMostrarFormulario, false);

//botonLimpiar.addEventListener("click", limpiarForm, false);

selectFiltro.addEventListener("change", filtrarTabla);

let selectTipo = document.getElementById("modalidad");
selectTipo.addEventListener("change", cambioTipoVehiculo);

administrarTabla();

function cambioTipoVehiculo(e) {
    if (e.target.value == "auto") {

        document.getElementById("labelTrans").hidden = true;
        document.getElementById("labelPuertas").hidden = false;

        document.getElementById("cantidadPuertas").hidden = false;
        document.getElementById("transmision4x4").hidden = true;
    } else {
        document.getElementById("labelTrans").hidden = false;
        document.getElementById("labelPuertas").hidden = true;

        document.getElementById("cantidadPuertas").hidden = true;
        document.getElementById("transmision4x4").hidden = false;
    }
}

function administrarTabla() {

    if (localStorage.getItem("vehiculos") === null) {
        setSpinnerVisible(true);
        getVehiculos().then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Hubo un problema al traer los vehiculos');
        }).then(data => {
            localStorage.setItem("vehiculos", JSON.stringify(data));
            setSpinnerVisible(false);

            let vehiculos = data;
            if (!vehiculos || vehiculos.length < 1) {
                armarDivError()
            } else {
                let mensajeTabla = document.getElementById("pErrorNoVehiculos");
                if (mensajeTabla) {
                    mensajeTabla.remove();
                }

                let tabla = armarTabla(vehiculos, "vehiculo");
                armarSeccionTabla(tabla, vehiculos)
                //mostrarPromedioIDs(vehiculos);
            }

        }).catch((e) => {
            if (!e.message.includes("Failed to fetch")) {
                alert(e.message);
            } else {
                alert('No se pudo establecer una conexion con el servidor');
            }
            armarDivError();
            setSpinnerVisible(false);
        });
    } else {
        let vehiculos = JSON.parse(localStorage.getItem("vehiculos"))
        let tabla = armarTabla(vehiculos, "vehiculo");
        armarSeccionTabla(tabla, vehiculos)
    }

}

function armarDivError() {
    let pTablaVacia = document.createElement("p");
    pTablaVacia.innerHTML = "No se encontraron Vehiculos";
    pTablaVacia.className = "mensajeTabla";
    pTablaVacia.id = "pErrorNoVehiculos";
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
    seccTabla.appendChild(p, document.getElementById("btnMostrarFormulario"));

    document.querySelectorAll("tr").forEach((el) => { el.addEventListener("dblclick", mostrarEnFormulario, false) });
    document.querySelectorAll("#thOrdenar").forEach((el) => { el.addEventListener("click", ordenarTabla, false) });

}

function armarTabla(objs, nombreObjs) {

    let dice = "odd";
    let tabla = document.createElement("table");
    tabla.id = "tabla_vehiculo";
    tabla.className = "table table-dark"
    let tbody = document.createElement("tbody");
    let thead = document.createElement("thead");

    let primeraVezIterando = true;

    objs.forEach((obj) => {

        if (!obj.hasOwnProperty("cantidadPuertas")) {

            obj = {
                id: obj.id,
                fabricante: obj.fabricante,
                añoLanzamiento: obj.añoLanzamiento,
                modelo: obj.modelo,
                cantidadPuertas: "N/A",
                transmision4x4: obj.transmision4x4,

            }
        } else if (obj.hasOwnProperty("cantidadPuertas")) {
            obj = {
                id: obj.id,
                fabricante: obj.fabricante,
                añoLanzamiento: obj.añoLanzamiento,
                modelo: obj.modelo,
                cantidadPuertas: obj.cantidadPuertas,
                transmision4x4: "N/A",
            }
        }

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

                let añoLanzamientoCol = key.replace(key[0], key[0].toUpperCase());

                let thOrdenar = document.createElement("a");
                thOrdenar.id = "thOrdenar";
                thOrdenar.innerHTML = añoLanzamientoCol

                thProducto.appendChild(thOrdenar);

                trEncabezadoTabla.appendChild(thProducto)
            }

            let tdProducto = document.createElement("td");

            tdProducto.innerText = obj[key];

            trProducto.appendChild(tdProducto);

        })

        if (primeraVezIterando == true) {

            let thModificar = document.createElement("th");
            thModificar.innerHTML = "Modificar";
            let thEliminar = document.createElement("th");
            thEliminar.innerHTML = "Eliminar"

            trEncabezadoTabla.appendChild(thModificar);
            trEncabezadoTabla.appendChild(thEliminar);
            thead.appendChild(trEncabezadoTabla);
        }
        primeraVezIterando = false;

        let botonModificar = document.createElement("button");
        botonModificar.classList += "botonTabla";
        botonModificar.innerHTML = "MODIFICAR";
        botonModificar.onclick = function (event) {
            document.getElementById("tituloForm").innerHTML = "Modificacion";
            mostrarEnFormulario(obj.id);
        }
        trProducto.appendChild(botonModificar);

        let botonEliminar = document.createElement("button");
        botonEliminar.classList += "botonTabla";
        botonEliminar.innerHTML = "ELIMINAR";
        botonEliminar.onclick = function () {
            document.getElementById("tituloForm").innerHTML = "Baja";
            mostrarEnFormulario(obj.id);
            btnModificar.hidden = true;
            btnEliminar.hidden = false;
        }
        trProducto.appendChild(botonEliminar);

        tbody.appendChild(trProducto);

    })

    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    //tabla.id = "tabla_" + añoLanzamientoObjs;
    return tabla;
}

function refrescarTabla() {

    let tabla = document.getElementById("tabla_vehiculo");

    if (tabla) {
        tabla.remove();
        document.getElementById("ayudaTabla").remove();
    }
    administrarTabla()
}

function mostrarEnFormulario(vehiculo_id) {

    setFormVisible(true);

    setTableVisible(false);

    botonModificar.hidden = false;
    botonEnviar.hidden = true;

    let vehiculo = JSON.parse(localStorage.getItem("vehiculos")).filter(function (i) {
        return i.id == vehiculo_id;
    })[0];


    if (!vehiculo_id) {
        return null;
    }

    let modalidad = document.getElementById("modalidad");

    modalidad.value = vehiculo.hasOwnProperty('transmision4x4') ? modalidad.value = "camioneta" : modalidad.value = "auto"

    modalidad.dispatchEvent(new Event('change'))

    Object.keys(vehiculo).forEach((attr) => {

        if (attr === "cantidadPuertas") {
            document.getElementById("cantidadPuertas").value = vehiculo["cantidadPuertas"];
        } else if (attr === "transmision4x4") {
            document.getElementById("transmision4x4").value = vehiculo["transmision4x4"];
        } else {
            document.getElementById(attr).value = vehiculo[attr];
        }
    });


}

function enviarModificarVehiculo(e) {

    e.preventDefault();

    if (!AdministrarValidaciones()) {
        return false;
    }

    let id = parseInt(document.getElementById('id').value);
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
    setSpinnerVisible(true);

    modificarVehiculo(vehiculo).then(function (data) {
        alert(data)
    }).catch(function (e) {
        //console.log("TE ODIO JAVASCRIPT");
        if (e.body == "") {
            e.body = "Hubo un problema al establecer la conexion con el servidor";
        }
        alert(e.body);
    }).finally(function () {
        setSpinnerVisible(false);
        refrescarTabla();
        document.getElementById("btnMostrarFormulario").click()
        let primerElSeccTabla = document.getElementById("seccionTabla").children[0];
        if (primerElSeccTabla.tagName == "P") {
            primerElSeccTabla.remove();
        }
    });
}

function ordenarTabla(e) {
    e.preventDefault();

    let vehiculos = filtrarVehiculos(localStorage.getItem("vehiculos"));

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

    vehiculos.sort(function (per1, per2) {

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
    document.getElementById("tabla_vehiculo").remove();

    let tabla = armarTabla(vehiculos, "vehiculos");
    armarSeccionTabla(tabla, vehiculos)

}

function enviarEliminarVehiculo(e) {

    e.preventDefault();
    setSpinnerVisible(true); //lel
    btnEliminar.disabled = true;

    let id_vehiculo = parseInt(document.getElementById('id').value);

    eliminarVehiculo(id_vehiculo).then((resp) => {
        return resp.text()
    })
        .then(data => {
            if (data.includes("Error")) {
                throw new Error(data);
            }

            let vehiculos = JSON.parse(localStorage.getItem("vehiculos"));

            vehiculos = vehiculos.filter(e => { return e.id != id_vehiculo });
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
            alert(data)

        }).catch((e) => {
            if (!e.message.includes("Failed to fetch")) {
                alert(e.message);
            } else {
                alert('No se pudo establecer una conexion con el servidor');
            }

        }).finally(() => {

            setSpinnerVisible(false);
            refrescarTabla();
            document.getElementById("btnMostrarFormulario").click()
            let primerElSeccTabla = document.getElementById("seccionTabla").children[0];
            if (primerElSeccTabla.tagName == "P") {
                primerElSeccTabla.remove();
            }
            btnEliminar.disabled = false;
        });
}

function limpiarForm() {

    document.getElementById("formularioBienesRaices").reset()
    let divErrores = document.getElementById("errorSection");
    if (divErrores) {
        document.getElementById("errorSection").remove();
    }
}

function filtrarVehiculos(veh) {

    let selectedOpt = document.getElementById("selectFiltro").value;
    if (selectedOpt != "todos" && veh.length > 0) {
        veh = veh.filter(el => {
            if (el.hasOwnProperty("transmision4x4") && selectedOpt == "camioneta") {
                return el;
            } else if (el.hasOwnProperty("cantidadPuertas") && selectedOpt == "auto") {
                return el;
            }
        })
    }
    return veh
}

function filtrarTabla(e) {

    let veh = localStorage.getItem("vehiculos");

    let tablaExistente = document.getElementById("tabla_vehiculo");
    if (veh && tablaExistente != null) {
        veh = JSON.parse(veh);
        document.getElementById("tabla_vehiculo").remove();
        document.getElementById("ayudaTabla").remove();
        veh = filtrarVehiculos(veh);

        let tabla = armarTabla(veh, "vehiculo");
        armarSeccionTabla(tabla)
        //mostrarPromedioIDs(veh);
    }

}

function mostrarPromedioIDs(vehiculos) {

    let totalIDs = 0;
    totalIDs = vehiculos.reduce(function (valorAnterior, valorActual, indice, vector) {
        return valorActual.id + valorAnterior
    }, totalIDs);

    //console.log(totalIDs)
    if (vehiculos.length > 0) {
        promedioIDs = totalIDs / (document.querySelectorAll("tr").length - 1);
    } else {
        promedioIDs = "N/A";
    }
    let promeDIOS = document.getElementById("promedios");
    promeDIOS.innerText = "PromeDIOS de ID: " + promedioIDs.toFixed(2);
}


function switchMostrarFormulario(e) {

    e.preventDefault();

    botonEliminar.hidden = true;
    botonModificar.hidden = true;
    botonEnviar.hidden = false;
    limpiarForm();
    let articleFormulario = document.getElementById("seccionFormulario")
    let estadoVisibilidad = articleFormulario.style.display
    if (estadoVisibilidad == "none") {
        document.getElementById("tituloForm").innerHTML = "Alta";
        articleFormulario.style.display = "block";

        document.getElementById("modalidad").value = "camioneta"
        
        document.getElementById("labelTrans").hidden = false;
        document.getElementById("labelPuertas").hidden = true;

        document.getElementById("cantidadPuertas").hidden = true;
        document.getElementById("transmision4x4").hidden = false;

        setTableVisible(false)
    } else {
        setTableVisible(true)
        articleFormulario.style.display = "none";
    }
}

function setTableVisible(visibility) {

    let tabla = document.getElementById("tabla_vehiculo");
    tabla.hidden = !visibility;
}

function setFormVisible(visibility) {

    let articleFormulario = document.getElementById("seccionFormulario")
    visibility == true ? articleFormulario.style.display = "block" : articleFormulario.style.display = "none";
}

function setSpinnerVisible(visibility) {
    let spinnerEl = document.getElementById("spinner");
    if (visibility) {
        window.scrollTo(0, 0)
    }
    spinnerEl.hidden = !visibility;
}

document.getElementById("speeeeneeng").onclick = () => { window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ") }