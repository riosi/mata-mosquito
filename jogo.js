
var largura = 0 // colocando a variável no escopo global (ainda não temos a opção de hoisting)
var altura = 0
var vidas = 1 // faz com que a seleção do elemento aconteça de forma dinâmica
var tempo = 10 // 10 segundos de duração de jogo

var criaMosquitoTempo = 1500

var nivel = window.location.search
nivel = nivel.replace('?', '')

if (nivel === 'normal') {
    //1500 (1.5s)
    criaMosquitoTempo = 1500
} else if (nivel === 'dificil') {
    //1000 (1s)
    criaMosquitoTempo = 1000
} else if (nivel === 'flash') {
    //750 (3/4s)
    criaMosquitoTempo = 750
}

function ajustaTamanhoPalcoJogo() { // É necessário obter a dimensão do palco do jogo porque os mosquitos serão gerados de forma randômica. setar a dimensão previamente impede que seja criada uma barra de rolagem.
    largura = window.innerWidth
    altura = window.innerHeight

    console.log(largura, altura)
}

ajustaTamanhoPalcoJogo()

var cronometro = setInterval(function () {
    tempo -= 1

    if (tempo < 0) {
        clearInterval(cronometro) // Faz o cronometro parar e não passar de 0
        clearInterval(criaMosquito) // Faz com que os mosquitos parem de ser criados
        window.location.href = 'vitoria.html' // redireciona para a página de vitória

    } else {
        document.getElementById('cronometro').innerHTML = tempo // foi criado um id para o span (cronometro) que vai recener a variável tempo e aparecer na tela como cronometro
    }
}, 1000)

function posicaoRandomica() {

    // remover o mosquito anterior (caso exista)

    if (document.getElementById('mosquito')) {
        document.getElementById('mosquito').remove()

        if (vidas > 3) {
            window.location.href = 'fim_de_jogo.html'
        } else {
            document.getElementById('v' + vidas).src = "/imagens/coracao_vazio.png" // pegar o elemento do coração e mudar a src, trocando para coração vazio // a variável vidas recebeu 1 e no getElementById nós concatenamos a string 'v' com vidas, fazendo com que ela fique dinâmica e seja lida como v1, ao passar pelo loop, v2 e assim por diante. 
            vidas++

        }
    }

    var posicaoX = Math.floor(Math.random() * largura) - 200 // gera números randômicos de acordo com o tamanho da largura e altura no momento
    var posicaoY = Math.floor(Math.random() * altura) - 200 // diminui a quantidade necessária de pixels para que o mosquito não fique fora da tela criando a barra de rolagem

    posicaoX = posicaoX < 0 ? 0 : posicaoX // faz o controle para que o mosquito fique com posição 0 caso o tamanho da tela seja menor que 0
    posicaoY = posicaoY < 0 ? 0 : posicaoY

    console.log(posicaoX, posicaoY) // combinando posicaoX com largura e posicaoY com altura

    // criar o elemento html através do DOM
    var mosquito = document.createElement('img')
    mosquito.src = 'imagens/mosquito.png'
    mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio() // o espaço serve para que as strings não grudem e as classes consigam ser diferenciadas corretamente
    mosquito.style.left = posicaoX + 'px' // concatena com o px para passar as coordenadas em pixels
    mosquito.style.top = posicaoY + 'px'
    mosquito.style.position = 'absolute'
    mosquito.id = 'mosquito'
    mosquito.onclick = function () { // 
        this.remove()
    }

    document.body.appendChild(mosquito) // adicionando filho ao body (o elemento mosquito)


}

function tamanhoAleatorio() {
    var classe = Math.floor(Math.random() * 3)

    switch (classe) {
        case 0:
            return 'mosquito1'

        case 1:
            return 'mosquito2'

        case 2:
            return 'mosquito3'
    }
}

function ladoAleatorio() { // para a aplicação ficar mais dinâmica tendo o mosquito olhando para direita ou para a esquerda de forma randomica
    var classe = Math.floor(Math.random() * 2)

    switch (classe) {
        case 0:
            return 'ladoA'

        case 1:
            return 'ladoB'

    }

}