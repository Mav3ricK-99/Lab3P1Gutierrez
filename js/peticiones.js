const base_url = "http://localhost:5000/vehiculos/"

const getVehiculos = () => {
    const response = fetch(base_url + "vehiculos", {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        //same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    });

    return response;
}

const agregarVehiculo = (vehiculo) => {

    const url_agregar = vehiculo.constructor.name === "Auto" ? base_url + "InsertarAuto" : base_url + "InsertarCamioneta";
   
    var xhttp = new XMLHttpRequest();
    try {
        xhttp.onreadystatechange = function () {
            let statusCode = this.status;
            if (this.readyState == 4 && (statusCode >= 200 && statusCode <= 299)) {
                vehiculo.setId(JSON.parse(this.responseText).id);
                let vehiculos = JSON.parse(localStorage.getItem("vehiculos"));
                vehiculos.push(vehiculo);
                localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
                alert("Vehiculo agregado con exito");
            }
            
        };
        xhttp.onerror = function (e) {
            throw new Error(e);
        };
        xhttp.open("PUT", url_agregar, false);

        xhttp.setRequestHeader("Content-Type", "application/json")

        xhttp.send(vehiculo.toJSONString(false));
    }
    catch (e) {;
        alert(e.message);
        return -1;
    }

    return 1;
}

//Para modificacion si se envia el ID
const modificarVehiculo = (vehiculo) => {

    const url_modificar = vehiculo.constructor.name === "Auto" ? base_url + "ModificarAuto" : base_url + "ModificarCamioneta";
    //console.log(vehiculo.toJSONString(true))
    let vehiculos = JSON.parse(localStorage.getItem("vehiculos"));

    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", url_modificar);
        xhr.setRequestHeader("Content-Type", "application/json")
        xhr.onload = function () {
            if (this.status >= 200 && this.status < 300) {
                resolve(xhr.response);
                vehiculos = vehiculos.filter(e => { return e.id != vehiculo.id });
                vehiculos.push(vehiculo);
                vehiculos.sort(function (a, b) {
                    return a.id - b.id;
                });
                localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
            } else {
                reject({
                    status: this.status,
                    statusText: xhr.statusText,
                    body: this.responseText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: this.status,
                statusText: xhr.statusText,
                body: this.responseText
            });
        };
        xhr.send(vehiculo.toJSONString(true));
    });
}

const eliminarVehiculo = async (id_vehiculo) => {

    let idVehiculo = {
        "id": id_vehiculo
    };

    const response = await fetch(base_url + "EliminarVehiculo", {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json'
        },
        referrerPolicy: 'no-referrer',
        //same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url

        body: JSON.stringify(idVehiculo)
    });

    return response
}