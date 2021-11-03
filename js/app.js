let botonEnviar = document.getElementById("btnGuardar");

botonEnviar.addEventListener("click", enviarAnuncio, false);
botonEnviar.addEventListener("click", eliminarAnuncio, false);


setTimeout(() => {administrarTabla()}, (Math.random() * (3000 - 1000) + 1000));

function administrarTabla(){

    let vehiculos = localStorage.getItem("vehiculos");
    switchSpinner();

    if(!vehiculos || vehiculos.length < 1){
        let pTablaVacia = document.createElement("p");
        pTablaVacia.innerHTML = "No se encontraron Vehiculos";
        pTablaVacia.className = "mensajeTabla";
        document.getElementById("seccionTabla").insertBefore(pTablaVacia, document.getElementById("spinner"));
    }else{
        let tabla = armarTabla(JSON.parse(vehiculos), "vehiculo");

        let p = document.createElement("p");
        p.innerHTML = "* Puede cargar el Formulario con datos de la tabla haciendo click en algun registro.";
        p.classList = "noselect"
        p.id = "ayudaTabla";

        let seccTabla = document.getElementById("seccionTabla");
        seccTabla.insertBefore(tabla, document.getElementById("spinner"));
        seccTabla.insertBefore(p, document.getElementById("spinner"));
        
        document.querySelectorAll("tr").forEach((el) => {el.addEventListener("click", mostrarEnFormulario, false)});
    
    }
    
}

function switchSpinner(){

    let spinner = document.getElementById("spinner");
    if(spinner.hidden == false){
        spinner.hidden = true;
    }else{
        spinner.hidden = false;
    }
}

function armarTabla(objs, nombreObjs){

    let dice = "odd";
    let tabla = document.createElement("table");
    let tbody = document.createElement("tbody");
    let thead = document.createElement("thead");
  
    let primeraVezIterando = true;
  
    objs.forEach((obj) => {
  
      let trProducto = document.createElement("tr");
      if(dice == "odd"){
        dice = "even";
        trProducto.className = "odd";
        }else{
            dice = "odd";
            trProducto.className = "even";
        }
      trProducto.setAttribute("data-"+nombreObjs+"ID", obj.id_vehiculo);
  
      Object.keys(obj).forEach((key) => {
  
        if(key.includes("id_")){
          return;
        }
        if(primeraVezIterando == true){
  
            let thProducto = document.createElement("th");
            thProducto.innerText = key.replace(key[0], key[0].toUpperCase());
      
            thead.appendChild(thProducto);
        }

        let tdProducto = document.createElement("td");
        
        tdProducto.innerText = obj[key];
  
        trProducto.appendChild(tdProducto);
      
      })
      
      primeraVezIterando = false; 
      tbody.appendChild(trProducto);
  
    })
  
    tabla.appendChild(thead);
    tabla.appendChild(tbody);
    tabla.id = "tabla_"+nombreObjs;
    return tabla;
  }

  function refrescarTabla(){

    document.getElementById("propEliminar").value = "";
    let tabla = document.getElementById("tabla_vehiculo");
    
    if(tabla){
        tabla.remove();
        document.getElementById("ayudaTabla").remove();
    }
    switchSpinner();
    setTimeout(() => {administrarTabla()}, (Math.random() * (3000 - 1000) + 1000));
  }

 function mostrarEnFormulario(e){

    let idProdEliminar = e.srcElement.parentElement.dataset.vehiculoid;

    if(!idProdEliminar){
        return null;
    }
    let inputHidden = document.getElementById("propEliminar");
    inputHidden.setAttribute("value", idProdEliminar);

    var campos = ['titulo', 'modalidad', 'descripcion', 'precio', 'puertas', 'kilometros', 'potencia'];
    e.srcElement.parentElement.childNodes.forEach((el, i) => {
        
        if(campos[i] == 'modalidad'){
            if(el.innerHTML == 'venta'){
                document.getElementById(el.innerHTML).checked = true;
                document.getElementById("alquiler").checked = false;
            }else{
                document.getElementById(el.innerHTML).checked = true;
                document.getElementById("venta").checked = false;
            }
        }else{
            document.getElementById(campos[i]).value = el.innerHTML;
        }
    });
 }

 function eliminarAnuncio(){

    //La validacion no se si ponerla porque en realidad podria eliminar tranquilamente por ID
    if(document.getElementById("propEliminar").value == '' || !AdministrarValidaciones()){
        return false;
    }

    let props = localStorage.getItem("vehiculos");
    let idEliminar = document.getElementById("propEliminar").value;
    if(props && idEliminar){
        let vehiculos = JSON.parse(props).filter(el => el.id_vehiculo != idEliminar);

        localStorage.removeItem("vehiculos");
        if(vehiculos.length > 0){
            localStorage.setItem("vehiculos", JSON.stringify(vehiculos));
        }
    
        document.getElementById("formularioBienesRaices").reset();
        refrescarTabla();
    }
 }

 function limpiarForm(e){

    e.preventDefault();
    document.getElementById("formularioBienesRaices").reset()
    document.getElementById("propEliminar").value = "";
    let divErrores = document.getElementById("errorSection");
    if(divErrores){
        document.getElementById("errorSection").remove();
    }
 }