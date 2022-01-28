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