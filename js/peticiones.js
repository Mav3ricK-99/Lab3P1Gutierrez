const base_url = "http://localhost:3000/vehiculos"

const getVehiculos = async () => {

    var vehiculos;
    try {
        await axios.get(base_url)
            .then(response => {
                vehiculos = response.data;
                if (response.status >= 200 && response.status < 300) {
                    return vehiculos
                }
            })
            .catch(e => {
                throw new Error("Hubo un error al traer los vehiculos " + e.message)
            })

    } catch (e) {
        throw new Error("Hubo un error al traer los vehiculos " + e.message)
    }

    return vehiculos
}

const agregarVehiculo = async (vehiculo) => {

    try {
        await axios.post(base_url + "/", vehiculo)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    alert("Vehiculo agregado")
                }
            })
            .catch(e => {
                throw new Error("Hubo un error al agregar el vehiculo  " + e.message)
            })

    } catch (e) {
        throw new Error("Hubo un error al agregar el vehiculo " + e.message)
    }
}

const eliminarVehiculo = async (id_veh) => {

    try {
        await axios.delete(base_url + "/" + id_veh)
            .then(response => {
                if (response.status >= 200 && response.status < 300) {
                    alert("Vehiculo eliminado")
                }
            })
            .catch(e => {
                throw new Error("Hubo un error al eliminar el vehiculo " + e.message)
            })

    } catch (e) {
        throw new Error("Hubo un error al eliminar el vehiculo " + e.message)
    }
}