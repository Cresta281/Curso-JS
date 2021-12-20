function Stock_combo (numero,nombre,precio,texto,img){
    this.numero = numero 
    this.nombre = nombre
    this.precio =  precio
    this.texto = texto
    this.img = img 
}
let combo1 = new Stock_combo (1,"Rustica",900,"Picada ideal, simple y directa al grano.","/img/rustica.jpg")
let combo2 = new Stock_combo (2,"Gallega",1100,"Nuestra seleccion especial de jamones te van a hacer sentir en otro pais!","/img/gallega.jpg")
let combo3 = new Stock_combo (3,"Quesito",1300,"El queso del equipo, aca te aseguro que quesos ricos no te van a faltar","/img/quesito.jpg")
let combo4 = new Stock_combo (4,"Pancito",1150,"Panes caseros, muy crujientes, muy sabrosos, muchos dips","/img/pancito.jpg")

let stock_productos = [ combo1, combo2, combo3, combo4 ]

let carrito_compras = []

function calcular_personas(precio){
    let personas = parseInt(prompt("Ingrese la cantidad de personas que van a disfrutar tu picada"))
    if (personas > 1) {
        function calcular_precio (){
            let x = precio * personas
            console.log(x);
            return x

        }
        function precio_nuevo (){
            let resultado = calcular_precio()
            let final = (resultado / 100) * 80
            console.log(final)
            return final
        }
        console.log(precio_nuevo())
        precio = precio_nuevo()
        console.log(precio);
        alert("El precio total de su compra " + precio)
    }else if (personas <= 1) {
        console.log(precio)
    }
}

agregar_carrito()

function agregar_carrito() {
    alert(JSON.stringify(stock_productos))
    let elegir_combo = parseInt(prompt("Ingrese el numero de su combo")) 

    let agregar = stock_productos.find((combo) => combo.numero == elegir_combo)
    console.log(agregar)
    calcular_personas(agregar.precio)
    carrito_compras.push(agregar)
     alert(JSON.stringify(carrito_compras))
    nuevo_carrito()
    
}

function nuevo_carrito() {
    alert("cantidad de productos agregados:  " + carrito_compras.length)
    let suma = carrito_compras.reduce((acc, el) => acc + el.precio, 0)
    let algo_mas =prompt("Desea agregar algo mas? si/no")
    alert(algo_mas)
    if (algo_mas === "si"){
        agregar_carrito()
    }else if (algo_mas === "no"){
        alert("Gracias por su compra el total es " + suma)
    }
}

console.log(stock_productos.sort((x,y) => x.precio - y.precio)) 

let combos = document.getElementById('combos_cards')

stock_productos.forEach(stock => {
    combos.innerHTML +=  `
    <div class="card text-white bg-dark mb-3" style="max-width: 18rem;" id="combos_cards">
        <div class="card-header">${stock.numero}</div>
        <div class="card-body">
            <h5 class="card-title">${stock.nombre}</h5>
            <p class="card-text">${stock.texto}</p>
            <p class="card-text">$${stock.precio}</p>
        </div>
    </div>
                    `
})