
let stock_armar = []

let carrito_compras2 = []



let modal_carrito = document.getElementById("modal_body")

$('#pagar').hide()
$ (()=>{
    $('#a_a').hide().delay(4000).fadeIn(1000)
    $('#parrafo_bienvenida').fadeIn(300).delay(1500).fadeOut(1000)
})

$('#search').on('change',()=>{
    let texto = $('#search').val()
    console.log(texto);
    let buscar = stock_armar.filter(item => item.nombre.toLowerCase().includes(texto.toLowerCase()))
    console.log(buscar);
    mostrar_stock(buscar)
})
$('#boton_buscar').trigger('change')

$.getJSON('productos/armar.JSON', function (data){
    console.log(data)
    data.forEach(elemento => stock_armar.push(elemento))
    mostrar_stock(stock_armar)
    recuperar_carrito()
})

function mostrar_stock(productos){
    $('#cards_productos').empty()
    productos.forEach(producto => {
        $('#cards_productos').append(
            `
        <div class="col-sm-3">
            <div class="card">
                <img src=${producto.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <a id="boton${producto.id}" class="btn boton_agregar">Agregar al carrito</a>
                </div>
            </div>
        </div>
    `
        )
        $(`#boton${producto.id}`).on("click",function(){
            agregar_al_carrito(producto.id)
            Toastify({
            text: "Producto agregado",
            className: "info",
            style: {
              background: "green",
            }
          }).showToast();
        })
})
}


function agregar_al_carrito(id){
    let verificar = carrito_compras2.find(producto => producto.id == id)
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
        $(`#cantidad${verificar.id}`).append(`<p id="cantidad${verificar.id}">cantidad:${verificar.cantidad}</p>`)
        actualizar_carrito()
        localStorage.setItem('carrito',JSON.stringify(carrito_compras2))
    }else{
        let agregar = stock_armar.find(producto => producto.id == id)
        carrito_compras2.push(agregar)
        actualizar_carrito()
        mostrar_carrito(agregar)
        localStorage.setItem('carrito',JSON.stringify(carrito_compras2))
       
    }
}
function actualizar_carrito(){
    if(carrito_compras2.length > 0){
        $('#modal_footer').show()
    } else {
        $('#modal_footer').hide()
    }
    $('#contador_carrito_armar').text(carrito_compras2.reduce((acc,el)=> acc + el.cantidad, 0 ))
    $('#precio_total_armar').text(carrito_compras2.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0))  
}

function mostrar_carrito(agregar){
    $('#modal_body').append(`
            <div class=producto_en_carrito>
                        <p>${agregar.nombre}</p>
                        <p>$${agregar.precio}</p>
                        <p id="cantidad${agregar.id}">${agregar.cantidad}</p>
                        <button class="btn btn-danger" id="eliminar${agregar.id}"> Eliminar </button>
            </div>
        `)
        $(`#eliminar${agregar.id}`).on("click",()=> {
            if(agregar.cantidad == 1){
                $(`#eliminar${agregar.id}`).parent().remove()
                carrito_compras2 = carrito_compras2.filter(elemento => elemento.id != agregar.id)
                actualizar_carrito()
                Toastify({
                    text: "producto eliminado",
                    className: "info",
                    style: {
                    background: "red",
                    }
                }).showToast();
                localStorage.setItem('carrito',JSON.stringify(carrito_compras2))
            }else{
                agregar.cantidad = agregar.cantidad - 1
                document.getElementById(`cantidad${agregar.id}`).innerHTML += ` <p id="cantidad${agregar.id}">${agregar.cantidad}</p>`
                actualizar_carrito()
                localStorage.setItem('carrito',JSON.stringify(carrito_compras2))
            }
        })
}
function recuperar_carrito(){
    let recuperar_carrito = JSON.parse(localStorage.getItem('carrito'))
    console.log(recuperar_carrito)
    if(recuperar_carrito){
        recuperar_carrito.forEach(el => {
            mostrar_carrito(el)
            carrito_compras2.push(el)
            actualizar_carrito()
        })
    }
}


let modo_oscuro

if(localStorage.getItem('modo_oscuro')){
    modo_oscuro = localStorage.getItem('modo_oscuro')
} else {
    modo_oscuro = "modo_claro"
}

localStorage.setItem('modo_oscuro', modo_oscuro)

$ (() => {
    if(localStorage.getItem('modo_oscuro') == "modo_oscuro") {
        $('body').addClass('modo_oscuro')
        $('#foco_oscuro').fadeOut()
        $('#foco_claro').fadeIn()
    } else {
        $('#foco_claro').fadeOut()
    }

    $('#foco_oscuro').click(()=>{
        $('#foco_oscuro').fadeOut()
        $('#foco_claro').fadeIn()
        $('body').addClass('modo_oscuro')

    })
    $('#foco_claro').click(()=>{
        $('#foco_oscuro').fadeIn()
        $('#foco_claro').fadeOut()
        $('body').removeClass('modo_oscuro')
        
    })
})
//pagar
$('#finalizar').on('click',()=>{
    $.post('https://jsonplaceholder.typicode.com/posts',JSON.stringify(carrito_compras2),function(data,estado){
        console.log(data,estado)
        if(estado){
            $('.modal-backdrop').remove()
            $('#a_a').hide()
            $('#pagar').fadeIn(800)
            $('body').addClass('tarjeta_pago')

        }
    })
})


$('#boton_pagar').on('click',function(){
    $('#modal_body').empty()
    $('#modal_body').append(`<p> Muchas gracias por tu compra, en instantes te llegara un comprobante a tu correo electronico!</p>`)
    $('#modal_footer').hide()
    carrito_compras2 = []
    localStorage.clear()
    actualizar_carrito()
    $('#pagar').empty().fadeOut(200)
    $('#a_a').delay(600).fadeIn(800)
    setTimeout(() => {
        $('#modal_body').empty()
    }, 4000);
})




