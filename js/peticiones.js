//const base_url = "http://localhost:5000/Personas"

const getPersonas = () => {

    let personas = localStorage.getItem("personas");
    return personas == null ? [] : JSON.parse(personas);
}

const agregarPersona = (persona) => {

    let personas = getPersonas();
    persona.id = personas.length;
    personas.push(persona);

    localStorage.setItem("personas", JSON.stringify(personas));
}

const eliminarPersona = (id_persona) => {

    let personas = getPersonas().filter(el => el.id != id_persona);
    localStorage.setItem("personas", JSON.stringify(personas));
}

const modificarPersona = (persona) => {

    let personas = getPersonas().filter(el => el.id != persona.id);
    personas.push(persona);
    localStorage.setItem("personas", JSON.stringify(personas));
}