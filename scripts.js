const url = "http://127.0.0.1:3000/produtos"

function removerConteudo(){
    const hero = document.getElementById('heroSection')
    const containerPrincipal = document.getElementById('containerPrincipal')
    hero.innerHTML = ''
    containerPrincipal.innerHTML = ''
    hero.style.backgroundColor = '#FBF8F2'
}

function carregarHome(){    
    //carregando a hero section caso não haja uma sendo exibida
    const heroContainer = document.getElementById('heroSection')
    
    if(heroContainer.children.length <= 0){
        const titulo = document.createElement('h1')
        const heroImg = document.createElement('img')
        heroImg.src = './imgs/hero.png'
        titulo.textContent = "ONDE CADA MORDIDA É UMA SURPRESA"
        
        heroContainer.append(titulo, heroImg)
        heroContainer.style.backgroundColor = "#4A2E1B"
    }

    


    //carregadno a seção de produtos e sobre da empresa
    const containerPrincipal = document.getElementById('containerPrincipal')

    if(containerPrincipal.children.length <= 0){
        const tituloSobre = document.createElement('h1')
        tituloSobre.textContent = "Sobre a empresa"

        const textoSobre = document.createElement('p')
        textoSobre.textContent = `Acreditamos que os melhores momentos da vida podem começar com um simples cookie! Nossa empresa nasceu da paixão por criar doces deliciosos, preparados com carinho e dedicação, transformando ingredientes selecionados em experiências únicas de sabor.Trabalhamos para oferecer cookies fresquinhos, com texturas irresistíveis e sabores especiais, sempre prezando pela qualidade e pelo cuidado em cada detalhe.Mais do que vender cookies, queremos proporcionar momentos de felicidade, adoçar o seu dia e tornar cada mordida uma experiência especial.`

        containerPrincipal.append(tituloSobre, textoSobre)
    }
}

function carregarAdmin(){
    removerConteudo()
}

function criarCards(resposta){
    const containerPrincipal = document.getElementById('containerPrincipal')

    for(let i = 0; i < resposta.length; i++){
        const card = document.createElement('div')
        const tituloCard = document.createElement('h1')
        const quantidadeCard = document.createElement('span')
        const imgCard = document.createElement('img')
        tituloCard.textContent = resposta[i].nome
        quantidadeCard.textContent = resposta[i].quantidade
        card.append(tituloCard, quantidadeCard)
        containerPrincipal.appendChild(card)
    }

    
}

async function carregarProdutos(){
    const consulta = await fetch(url)
    const resposta = await consulta.json()
    
    criarCards(resposta)
}

const botaoAdmin = document.getElementById('botaoAdmin')
const botaoHome = document.getElementById('botaoHome')

botaoAdmin.addEventListener('click', carregarAdmin)
botaoHome.addEventListener('click',carregarHome)