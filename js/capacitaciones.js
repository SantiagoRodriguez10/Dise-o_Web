//------------------CONSTRUCTOR--------------------------------------------
class Producto {
    constructor(id, nombre, precio, cantidad = 0, imagen) {
        this.id = parseInt(id);
        this.nombre = nombre;
        this.precio = parseFloat(precio);        
        this.cantidad = cantidad;
        this.imagen = imagen;
    }
}
//--------AGRUPACION DE  ELEMENTOS---------------------PUSH----------------------------------------

const productos = [];
//-----------FUNCION LOAD QUE SE EJECUTA CUANDO SE CARGA TODAS LAS IMAGENES DE LA APLICACION
window.addEventListener('load', ()=>{
    //ELIMINAR ELEMENTO DEL DOM
    $('#indicadorCarga').remove();
    //MOSTRAR CUANDO CARGA LOS MEDIA
    $("#lista").fadeIn("slow", ()=>{
        console.log("FINALIZA ANIMACIÓN")
    });
    
});
//--------------------SLIDE-------BOTON INFO
$("#btnInfo").click( function(e){
    //MOSTRAR INFO
    $("#info1").slideDown();
});

// Todo lo que es jquery va dentro del ready
$( document ).ready(function() {
    function productosUIjQuery(productos, id){
        $(id).empty()

        for (const producto of productos) {
            $(id).append(`<div class="card" style="width: 18rem;">
                <img src="${producto.imagen}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <button id='${producto.id}' class="btn btn-primary btn-compra">ADQUIRIR</button>
                </div>
            </div>`);
        }
        $('.btn-compra').click(function(){
            swal('CURSO ADQUIRIDO','se ha añadido al carrito','success');
        });
    }



    //PETICIONES JQUERY
    const URLGET = "../data/productos.json";
    $.get(URLGET, function(datos,estado){
        if(estado =="success"){
            for (const literal of datos) {
                productos.push(new Producto(literal.id, literal.nombre, literal.precio, literal.cantidad, literal.imagen));
            }
            productosUIjQuery(productos ,"#lista");
            const botones = $('.btn-compra');
            for (const boton of botones){
            boton.onclick = compraManejador
            }
        } else {
            console.error("Error");
        }
    })
    .fail(function() {
        alert( "error" );
    });  
});

// --------------------------Empieza el carrito----------------------------------------------
let carrito;
if(localStorage.getItem('productos') !== null){
    carrito = JSON.parse(localStorage.getItem('productos'));
    let innerCarrito = '';
    $("#carritoCantidad").html(carrito.length);
    $("#carritoProductos").empty();
    for (const producto of carrito) {
        $("#carritoProductos").append(`<li>${producto.nombre} - $ ${producto.precio}</li>`);
    }

    
}else{
    carrito = [];
}
//------------------------------------COMPRA----------------------------
function comprarProducto(e){
    e.preventDefault();
    console.log("COMPRADO");
}
//--------------------------------MANEJADOR DE COMPRAS--------------------------------------
function compraManejador(e){
    e.preventDefault();
    //OBTENER EL PRODUCTO SELECCIONADO CON FIND
    const seleccionado = productos.find(producto => producto.id == this.id);
    console.log(seleccionado)
    //ASOCIAMOS EL SELECCIONADO AL CARRITO
    carrito.push(seleccionado);
    console.log(carrito);
    $("#carritoProductos").empty();
    // SALIDA DEL CARRITO
    let innerCarrito = '';
    for (const producto of carrito) {
            $("#carritoProductos").append(`<li>${producto.nombre} - $ ${producto.precio} </li>`);
    }
    localStorage.setItem('productos', JSON.stringify(carrito));
    console.log(carrito.length);
    $("#carritoCantidad").text(carrito.length);
}
//---------------VACIAR CARRITO -------------//
let vaciarCarritoButton = document.getElementById("vaciarCarrito");
vaciarCarritoButton.addEventListener("click", function(e) {
    e.preventDefault();
    $("#carritoProductos").empty();
    $("#carritoCantidad").html("0");
    localStorage.removeItem('productos');
    carrito = [];
})