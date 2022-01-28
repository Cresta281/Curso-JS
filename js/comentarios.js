const boton = document.getElementById("boton")
const posteo = document.getElementById("posteo")
const estrellita = document.getElementById("estrellita")
const editar = document.getElementById("editar")
const boton_comentar = document.getElementById("resena_boton")
const resena = document.getElementById("container2")
const cerrar = document.getElementById("cerrar")

$('#flecha').click(function(){
    $('html, body').animate({
        scrollTop: $("#resena").offset().top -800
    }, 900);
})


boton_comentar.onclick = () =>{
    resena.style.display = "block"
    cerrar.onclick = () =>{
        resena.style.display = "none"
    }
}


boton.onclick = () =>{
    estrellita.style.display = "none";
    posteo.style.display = "block";
    let usuario = $("#usuario").val()
    array_usuario.push(usuario)
    localStorage.setItem('usuario',JSON.stringify(array_usuario))
    editar.onclick = ()=>{
        estrellita.style.display = "block";
        posteo.style.display = "none";
        Toastify({
            text: "Comentario eliminado",
            className: "info",
            style: {
              background: "red",
            }
          }).showToast();
        localStorage.removeItem('usuario')
    }
    Toastify({
        text: "Comentario enviado",
        className: "info",
        style: {
          background: "gold",
        }
      }).showToast();
    
} 

array_usuario = []

array_comentarios = []

$.getJSON('JSON/comentarios.JSON', function (data){
    console.log(data)
    data.forEach(elemento => array_comentarios.push(elemento))
    mostrar_comentarios(array_comentarios)
})

function mostrar_comentarios (comentarios){
    $('#cajas_comentarios').empty()
    comentarios.forEach(comentarios =>{
        $('#cajas_comentarios').append(
            `
            <div class="cajas">
                <div class="cajas_quesos">
                <i class="fas fa-cheese"></i>
                <i class="fas fa-cheese"></i>
                <i class="fas fa-cheese"></i>
                <i class="fas fa-cheese"></i>
                <i class="fas fa-cheese"></i>
                </div>
                <div class="cajas_texto">
                    <h3>${comentarios.nombre}<h3>
                    <h4>${comentarios.puesto}<h4>
                </div>
                <div class="cajas_mensaje">
                    <p>${comentarios.comentario}<p>
                </div>
            </div>

            `
        )
    })
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