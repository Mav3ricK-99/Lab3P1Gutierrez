async function mostrarAnuncios() {

    let vehiculos = {}
    await getVehiculos().then((data) => {
        vehiculos = data;
        localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
    }).catch(e => {
        alert(e.message)
        armarDivError()
        throw new Error(e.message);
    })

    if (!vehiculos || vehiculos.length < 1) {
        armarDivError()
    } else {

        let anuncios = armarAnuncio(vehiculos, "vehiculo");
        document.getElementById("anuncios").appendChild(anuncios);
    }
}
function armarDivError() {

    let pTablaVacia = document.createElement("p");
    pTablaVacia.innerHTML = "No se encontraron Vehiculos";
    pTablaVacia.className = "mensajeTabla";
    document.getElementById("anuncios").appendChild(pTablaVacia);
}

function armarAnuncio(objs, obj_name) {

    let divAnuncios = document.createElement("div");

    objs.forEach((el) => {
        let divUnAnuncio = document.createElement("div");
        divUnAnuncio.classList = "card"

        let h3Titulo = document.createElement("h3");
        h3Titulo.classList = "card-title" //Clases BOOTSTRAP
        let pDescripcion = document.createElement("p");
        pDescripcion.classList = "card-subtitle mb-2 text-muted"
        let pPrecio = document.createElement("p");
        pPrecio.classList = "card-text precioCard";

        h3Titulo.innerHTML = el.titulo;
        pDescripcion.innerHTML = el.descripcion;
        pPrecio.innerHTML = "$" + el.precio;

        let pPuertas = document.createElement("p");
        let pKm = document.createElement("p");
        let pPotencia = document.createElement("p");

        pPuertas.innerHTML = el.cantPuertas;
        pKm.innerHTML = el.kilometraje;
        pPotencia.innerHTML = el.potencia;

        let divDatosDescipcion = document.createElement("div");
        let divDatosNumericos = document.createElement("div");
        divDatosNumericos.classList = "datosNumericosCard";
        let buttonVer = document.createElement("button");
        buttonVer.innerHTML = "Ver " + obj_name;

        divDatosDescipcion.append(h3Titulo);
        divDatosDescipcion.append(pDescripcion);
        divDatosDescipcion.append(pPrecio);

        let iconoPuertas = document.createElement("img");
        iconoPuertas.src = "./Imagenes/svg/car-door-svgrepo-com.svg";
        iconoPuertas.width = 40;

        let cuentaVueltas = document.createElement("img");
        cuentaVueltas.src = "./Imagenes/svg/car-door-svgrepo-com.svg";
        cuentaVueltas.width = 40;

        let iconoPotencia = document.createElement("img");
        iconoPotencia.src = "./Imagenes/svg/engine-svgrepo-com.svg";
        iconoPotencia.width = 40;

        let divPuertas = document.createElement("div");
        divPuertas.append(pPuertas);
        divPuertas.append(iconoPuertas);
        divPuertas.classList = "divDatosNumericos"

        let divCuentaVueltas = document.createElement("div");
        divCuentaVueltas.append(pKm);
        divCuentaVueltas.append(iconoPotencia);
        divCuentaVueltas.classList = "divDatosNumericos"

        let divPotencia = document.createElement("div");
        divPotencia.append(pPotencia);
        divPotencia.append(iconoPotencia);
        divPotencia.classList = "divDatosNumericos"

        divDatosNumericos.append(divPuertas);
        divDatosNumericos.append(divCuentaVueltas);
        divDatosNumericos.append(divPotencia);

        divUnAnuncio.append(divDatosDescipcion);
        divUnAnuncio.append(divDatosNumericos);
        divUnAnuncio.append(buttonVer);

        divAnuncios.append(divUnAnuncio);
    });

    return divAnuncios;
}

mostrarAnuncios();