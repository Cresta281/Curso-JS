function Productos (id,nombre,precio,img, cantidad){
    this.id = id 
    this.nombre = nombre
    this.precio =  precio
    this.img = img 
    this.cantidad = cantidad 
}

let producto1 = new Productos (1, "Almendras", 250, "img",1 )
let producto2 = new Productos (2, "Maní", 150, "img",1 )
let producto3 = new Productos (3, "Aceitunas", 120, "img",1 )
let producto4 = new Productos (4, "Jamón cocido", 200, "img",1 )
let producto5 = new Productos (5, "Jamón crudo", 300, "img",1 )
let producto6 = new Productos (6, "Queso gruyere", 200, "img",1 )
let producto7 = new Productos (7, "Queso fontina", 150, "img",1 )
let producto8 = new Productos (8, "Salame tandilense", 250, "img",1 )
let producto9 = new Productos (9, "Jamón iberico", 250, "img",1 )
let producto10 = new Productos (10, "Salame ahumado", 200, "img",1 )

let stock_armar = [ producto1, producto2, producto3, producto4, producto5, producto6, producto7, producto8, producto9, producto10 ]

let carrito_compras2 = []

mostrar_stock(stock_armar)


let modal_carrito = document.getElementById("modal_carrito_armar")

function mostrar_stock(productos){
    productos.forEach(producto => {
        $('#a_a').append(
            `
        <div class="col-sm-3">
            <div class="card">
                <img src=${producto.img} class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">$${producto.precio}</p>
                    <a id="boton${producto.id}" class="btn btn-primary">Agregar al carrito</a>
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
        mostrar_carrito()
        localStorage.setItem('carrito',JSON.stringify(carrito_compras2))
       
    }
}
function actualizar_carrito(){
    $('#contador_carrito_armar').text(carrito_compras2.reduce((acc,el)=> acc + el.cantidad, 0 ))
    $('#precio_total_armar').text(carrito_compras2.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0))  
}

function mostrar_carrito(agregar){
    $('#carrito_contenedor').append(`
            <div class=producto_en_carrito>
                        <p>${agregar.nombre}</p>
                        <p>${agregar.precio}</p>
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
recuperar_carrito()

$('#boton_carrito').on("click",() => {
    modal_carrito.style.display = "block"
    
})


$('#esconder_carrito_armar').on("click",() => {
    modal_carrito.style.display = "none"
})