
function criaTelaProdutos(){
    const containerPrincipal = document.getElementById('containerPrincipal')

}

function removerConteudo(){
    const hero = document.getElementById('heroSection')
    hero.innerHTML = ''
    hero.style.backgroundColor = '#FBF8F2'
}

function carregarHome(){    
    const heroContainer = document.getElementById('heroSection')
    
    if(heroContainer.children.length > 0){
        return
    }

    const titulo = document.createElement('h1')
    const heroImg = document.createElement('img')
    heroImg.src = './imgs/hero.png'
    titulo.textContent = "ONDE CADA MORDIDA É UMA SURPRESA"
    
    heroContainer.append(titulo, heroImg)
    heroContainer.style.backgroundColor = "#4A2E1B"

}

function carregarAdmin(){
    removerConteudo()
}

const botaoAdmin = document.getElementById('botaoAdmin')
const botaoHome = document.getElementById('botaoHome')

botaoAdmin.addEventListener('click', carregarAdmin)
botaoHome.addEventListener('click',carregarHome)