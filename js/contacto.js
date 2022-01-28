
let evento = document.getElementById('contactenos')

let submit = document.getElementById("submit")

let contacto = document.getElementById("wrapper_contacto")

let cerrar = document.getElementById("cerrar_contacto")

cerrar.addEventListener("click",function(){
    contacto.style.display = "none"
})

evento.addEventListener("click",function(){
    contacto.style.display = "block"
})

array_contacto = []
submit.addEventListener("click",function(){
    var nombre = document.getElementById("nombre").value
    var evento = document.getElementById("evento").value
    var telefono = document.getElementById("telefono").value
    var email = document.getElementById("email").value
    var mensaje = document.getElementById("mensaje").value
    var error = document.getElementById("error")
    var texto
    
    error.style.padding = "30px"
    if(nombre.length < 1){
        texto = "Por favor ingrese un nombre valido"
        error.innerHTML = texto;
        return false
    }
    if(evento.length < 5){
        texto = "Por favor ingrese un evento valido"
        error.innerHTML = texto;
        return false
    }
    if(isNaN(telefono) || telefono.length != 10){
        texto = "Por favor ingrese un telefono valido"
        error.innerHTML = texto;
        return false
    }
    if(email.indexOf("@") == -1 || email.length < 6){
        texto = "Por favor ingrese un email valido"
        error.innerHTML = texto;
        return false
    }
    if(mensaje.length <= 10){
        texto = "Por favor ingrese mas de 10 caracteres"
        error.innerHTML = texto;
        return false
    }
    else{
        texto = "Se han registrado sus datos correctamente"
        error.innerHTML = texto;
        array_contacto.push(nombre,evento,telefono,email,mensaje)
        localStorage.setItem('contacto',JSON.stringify(array_contacto))
        Toastify({
            text: "Tarjeta enviada",
            className: "info",
            style: {
              background: "green",
            }
          }).showToast();
        return true

    }

})

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
        $('footer').addClass('modo_oscuro')
        $('#foco_oscuro').fadeOut()
        $('#foco_claro').fadeIn()
    } else {
        $('#foco_claro').fadeOut()
    }

    $('#foco_oscuro').click(()=>{
        $('#foco_oscuro').fadeOut()
        $('#foco_claro').fadeIn()
        $('body').addClass('modo_oscuro')
        $('footer').addClass('modo_oscuro')
        modo_oscuro = "modo_oscuro"
        localStorage.setItem('modo_oscuro', modo_oscuro)

    })
    $('#foco_claro').click(()=>{
        $('#foco_oscuro').fadeIn()
        $('#foco_claro').fadeOut()
        $('body').removeClass('modo_oscuro')
        $('footer').removeClass('modo_oscuro')
        modo_oscuro = "modo_claro"
        localStorage.setItem('modo_oscuro', modo_oscuro)
        
    })
})