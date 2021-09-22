class Registro {
    constructor(nombre, apellido, email, sexo) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.sexo = sexo;
    }
    datosCliente() {
        for (let i = 0; i < registrados.length; i++) {
            let nombre = document.getElementById("nombre");
            nombre.value = registrados[i].nombre.toUpperCase();
            let apellido = document.getElementById("apellido");
            apellido.value = registrados[i].apellido.toUpperCase();
            let email = document.getElementById("email");
            email.value = registrados[i].email.toUpperCase();
            let sexo = document.getElementById("sexo");
            sexo.value = registrados[i].sexo.toUpperCase();
        }
    }
    verificarDatos() {
        if (this.nombre && this.apellido && this.email && this.sexo != "") {
            console.log("SUS DATOS HAN SIDO REGISTRADOS CON EXITO\nVERIFIQUELOS A CONTINUACION");
            return true;
        } else {
            alert("ERROR,DEBE COMPLETAR TODOS LOS CAMPOS")
        }
        return false;
    };
}
const registrados = [];
const formulariojs = document.getElementById('formulario_contacto');
formulariojs.onsubmit = (event) => {
    event.preventDefault();
    const nombre = formulariojs.nombre.value;
    const apellido = formulariojs.apellido.value;
    const email = formulariojs.email.value;
    const cliente = new Registro(nombre, apellido, email);
    registrados.push(cliente);
    let miElemento = document.createElement('span');
    let texto_html;
    miElemento.className = "alert alert-warning resultado_formulario";

    let confirmacion = document.querySelector('.container-confirmacion');
    // mensaje generico en espera de la respuesta del servidor
    texto_html = document.createTextNode(
        `Enviando formulario, por favor espere`
    );
    miElemento.appendChild(texto_html);
    confirmacion.textContent = '';
    confirmacion.appendChild(miElemento);

    //emulamos la espera del servidor con una espera de 3seg
    setTimeout(function () {
        // forzamos un error para usar la clase boostrap 'danger'
        if (nombre !== "gabriel") {
            texto_html = document.createTextNode(
                `Gracias ${cliente.nombre} ${cliente.apellido} por registrarse, le llegará un mail a ${cliente.email}`
            );
            miElemento.className = "alert alert-success resultado_formulario";
        } else {
            texto_html = document.createTextNode(
                `Esta prohibido llamarse gabriel`
            );
            miElemento.className = "alert alert-danger resultado_formulario";
        }
        // vaciamos el contenedor del alert y mostramos el mensaje correcto
        miElemento.textContent = '';
        miElemento.appendChild(texto_html);
        confirmacion.appendChild(miElemento);

    }, 3000);
}