function Stock_combo (id,nombre,precio,texto,img, cantidad){
    this.id = id 
    this.nombre = nombre
    this.precio =  precio
    this.texto = texto
    this.img = img 
    this.cantidad = cantidad 
}
let combo1 = new Stock_combo (1,"Rustica",900,"Picada ideal, simple y directa al grano.","/img/rustica.jpg", 1)
let combo2 = new Stock_combo (2,"Gallega",1100,"Nuestra seleccion especial de jamones te van a hacer sentir en otro pais!","/img/gallega.jpg", 1)
let combo3 = new Stock_combo (3,"Quesito",1300,"El queso del equipo, aca te aseguro que quesos ricos no te van a faltar","/img/quesito.jpg", 1)
let combo4 = new Stock_combo (4,"Pancito",1150,"Panes caseros, muy crujientes, muy sabrosos, muchos dips","/img/pancito.jpg", 1)

let stock_productos = [ combo1, combo2, combo3, combo4 ]

let carrito_compras = []
localStorage.setItem('carrito',JSON.stringify([]))
const contenedor_productos = document.getElementById("a")

const contenedor_carrito = document.getElementById("carrito_contenedor")

const contador_carrito = document.getElementById("contador_carrito")

const precio_total = document.getElementById("precio_total")

const boton_carrito = document.getElementById("boton_carrito")

const esconder_carrito = document.getElementById("esconder_carrito")

let modal_carrito = document.getElementById("modal_carrito")

mostrar_productos(stock_productos)

function mostrar_productos(array){
array.forEach(combos =>{
    let div = document.createElement("div")
    div.classList.add("combo")
    div.innerHTML += `
    <div class="card">
        <img src=${combos.img} class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">${combos.nombre}</h5>
            <p class="card-text">${combos.texto}</p>
            <p class="card-text">$${combos.precio}</p>
            <a id="boton ${combos.id}" class="btn btn-primary">Agregar al carrito</a>
        </div>
    </div>
    `
    contenedor_productos.appendChild(div)
    let boton_agregar = document.getElementById(`boton ${combos.id}`)

    boton_agregar.addEventListener("click", ()=>{
        agregar_al_carrito(combos.id)
        Toastify({
            text: "Combo agregado",
            className: "info",
            style: {
              background: "green",
            }
          }).showToast();
    })
})
}

function agregar_al_carrito(combos){
    let verificar = carrito_compras.find(producto => producto.id == combos)
    if(verificar){
        verificar.cantidad = verificar.cantidad + 1
        document.getElementById(`cantidad${verificar.id}`).innerHTML = `<p id="cantidad${verificar.id}">cantidad:${verificar.cantidad}</p>`
        actualizar_carrito()
        localStorage.setItem('carrito',JSON.stringify(carrito_compras))
    }else{
        let agregar = stock_productos.find(combo => combo.id == combos)
        carrito_compras.push(agregar)
        actualizar_carrito()
        localStorage.setItem('carrito',JSON.stringify(carrito_compras))
        
        let div = document.createElement('div')
        div.classList.add("combo_en_carrito")
        div.innerHTML += `
                        <p>${agregar.nombre}</p>
                        <p>${agregar.precio}</p>
                        <p id="cantidad${agregar.id}">${agregar.cantidad}</p>
                        <button class="btn btn-danger" id="eliminar ${agregar.id}"> Eliminar </button>
        `
        contenedor_carrito.appendChild(div)
        let boton_eliminar = document.getElementById(`eliminar ${agregar.id}`)

        boton_eliminar.addEventListener("click", ()=> {
            if(agregar.cantidad == 1){
                boton_eliminar.parentElement.remove()
                carrito_compras = carrito_compras.filter(elemento => elemento.id != agregar.id)
                actualizar_carrito()
                Toastify({
                    text: "Combo eliminado",
                    className: "info",
                    style: {
                    background: "red",
                    }
                }).showToast();
                localStorage.setItem('carrito',JSON.stringify(carrito_compras))
            }else{
                agregar.cantidad = agregar.cantidad - 1
                document.getElementById(`cantidad${agregar.id}`).innerHTML += ` <p id="cantidad${agregar.id}">${agregar.cantidad}</p>`
                actualizar_carrito()
                localStorage.setItem('carrito',JSON.stringify(carrito_compras))
            }
        })
    }
}

function actualizar_carrito(){
    contador_carrito.innerText = carrito_compras.reduce((acc,el)=> acc + el.cantidad, 0 ) 
    precio_total.innerText = carrito_compras.reduce((acc,el)=> acc + (el.precio * el.cantidad), 0) 
}

function recuperar_carrito(){
    let recuperar_carrito = JSON.parse(localStorage.getItem('carrito'))
    console.log(recuperar_carrito)
    if(recuperar_carrito){
        recuperar_carrito.forEach(el => {
            mostrar_productos(el)
            carrito_compras.push(el)
            actualizar_carrito()
        })
    }
}
recuperar_carrito()

boton_carrito.addEventListener("click", () => {
    modal_carrito.style.display = "block"
})

esconder_carrito.addEventListener("click", () => {
    modal_carrito.style.display = "none"
})