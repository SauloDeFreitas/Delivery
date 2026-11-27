const url = "https://delivery-ik2i.onrender.com/produtos"
const urlImg = "https://res.cloudinary.com/yotvqe9o/image/upload/f_auto/q_auto/"
const urlLista = "https://res.cloudinary.com/yotvqe9o/image/list/cookies.json"

let fotos = [
    { nome: "Cookie de chocolate", id: "cookie_chocolate" },
    { nome: "Cookie de baunilha", id: "cookie_baunilha" },
    { nome: "Cookie red velvet", id: "cookie_redvelvet" }
]

async function carregarFotos(){
    try {
        const consulta = await fetch(urlLista)
        const dados = await consulta.json()
        if(dados.resources && dados.resources.length > 0){
            fotos = dados.resources.map(f => ({ nome: f.public_id, id: f.public_id }))
        }
    } catch (erro) {
    }
}

function removerConteudo(){
    const hero = document.getElementById('heroSection')
    const containerPrincipal = document.getElementById('containerPrincipal')
    hero.innerHTML = ''
    containerPrincipal.innerHTML = ''
    hero.style.backgroundColor = '#FBF8F2'
}

function carregarHome(){    
    removerConteudo()
    voltarHeroSecion()
    const heroContainer = document.getElementById('heroSection')
    
    if(heroContainer.children.length <= 0){
        const titulo = document.createElement('h1')
        const heroImg = document.createElement('img')
        heroImg.src = './imgs/hero.png'
        titulo.textContent = "ONDE CADA MORDIDA É UMA SURPRESA"
        
        heroContainer.append(titulo, heroImg)
        heroContainer.style.backgroundColor = "#4A2E1B"
    }

    const containerPrincipal = document.getElementById('containerPrincipal')

    if(containerPrincipal.children.length <= 0){
        const tituloSobre = document.createElement('h1')
        tituloSobre.className = "tituloSobre"
        tituloSobre.textContent = "Sobre a empresa"

        const textoSobre = document.createElement('p')
        textoSobre.className = "textoSobre"
        textoSobre.textContent = `Acreditamos que os melhores momentos da vida podem começar com um simples cookie! Nossa empresa nasceu da paixão por criar doces deliciosos, preparados com carinho e dedicação, transformando ingredientes selecionados em experiências únicas de sabor.Trabalhamos para oferecer cookies fresquinhos, com texturas irresistíveis e sabores especiais, sempre prezando pela qualidade e pelo cuidado em cada detalhe.Mais do que vender cookies, queremos proporcionar momentos de felicidade, adoçar o seu dia e tornar cada mordida uma experiência especial.`

        containerPrincipal.append(tituloSobre, textoSobre)
    }
}

function carregarAdmin(){
    removerConteudo()
}

function removerHeroSection(){
    const hero = document.getElementById('heroSection')
    hero.style.height = "0px"
}

function voltarHeroSecion(){
    const hero = document.getElementById('heroSection')
    hero.style.height = "100vh"
}

function recarregarProdutos(){
    removerConteudo()
    carregarProdutos()
}

function criarCampo(texto, campo){
    const grupo = document.createElement('div')
    grupo.className = "campo"
    const rotulo = document.createElement('label')
    rotulo.htmlFor = campo.id
    rotulo.textContent = texto
    grupo.append(rotulo, campo)
    return grupo
}

function criarCards(resposta){
    const containerPrincipal = document.getElementById('containerPrincipal')
    removerHeroSection()

    const painel = document.createElement('div')
    painel.className = "painelAdmin"

    const form = document.createElement('form')
    form.className = "formularioCadastro"
    const tituloFormulario = document.createElement('h1')
    tituloFormulario.textContent = "Novo produto"

    const inputNome = document.createElement('input')
    inputNome.type = "text"
    inputNome.name = "nome"
    inputNome.id = "inputNome"
    inputNome.placeholder = "Ex.: Cookie de chocolate"

    const inputQuantidade = document.createElement('input')
    inputQuantidade.type = "number"
    inputQuantidade.name = "quantidade"
    inputQuantidade.id = "inputQuantidade"
    inputQuantidade.placeholder = "0"
    inputQuantidade.min = "0"

    const selectImg = document.createElement('select')
    selectImg.id = "selectImg"

    const optionPadrao = document.createElement('option')
    optionPadrao.value = ""
    optionPadrao.textContent = "Escolha uma foto"
    selectImg.appendChild(optionPadrao)

    fotos.forEach(foto => {
        const option = document.createElement('option')
        option.value = foto.id
        option.textContent = foto.nome
        selectImg.appendChild(option)
    })

    const botaoCadastrar = document.createElement('button')
    botaoCadastrar.type = "submit"
    botaoCadastrar.className = "botaoCadastrar"
    botaoCadastrar.textContent = "Cadastrar produto"

    const botaoCancelar = document.createElement('button')
    botaoCancelar.type = "button"
    botaoCancelar.className = "botaoCancelar"
    botaoCancelar.textContent = "Cancelar edição"
    botaoCancelar.addEventListener('click', recarregarProdutos)

    form.append(
        tituloFormulario,
        criarCampo("Nome", inputNome),
        criarCampo("Quantidade", inputQuantidade),
        criarCampo("Foto", selectImg),
        botaoCadastrar,
        botaoCancelar
    )

    let idEmEdicao = null

    botaoCadastrar.addEventListener('click', async (event) => {
        event.preventDefault()
        const nome = inputNome.value
        const quantidade = inputQuantidade.value
        const img = selectImg.value

        if(nome.trim() === "" || quantidade === ""){
            alert("Preencha o nome e a quantidade do produto.")
            return
        }

        botaoCadastrar.disabled = true

        if(idEmEdicao !== null){
            await fetch(url + "/" + idEmEdicao, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: nome, quantidade: Number(quantidade), img: img })
            })

            idEmEdicao = null
        } else {
            await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome: nome, quantidade: Number(quantidade), img: img })
            })
        }

        recarregarProdutos()
    })

    const listaCards = document.createElement('div')
    listaCards.className = "listaCards"

    painel.append(form, listaCards)
    containerPrincipal.appendChild(painel)

    for(let i = 0; i < resposta.length; i++){
        const card = document.createElement('div')
        card.className = "cardProduto"
        const tituloCard = document.createElement('h1')
        const quantidadeCard = document.createElement('span')
        quantidadeCard.className = "quantidadeCard"

        let imgCard
        if(resposta[i].img){
            imgCard = document.createElement('img')
            imgCard.src = resposta[i].img.startsWith("http")
                ? resposta[i].img
                : urlImg + resposta[i].img
        } else {
            imgCard = document.createElement('div')
            imgCard.className = "semFoto"
            imgCard.textContent = "sem foto"
        }

        const botaoDeletar = document.createElement('button')
        const botaoEditar = document.createElement('button')
        botaoEditar.className = "botaoEditar"
        botaoEditar.textContent = "Editar"

        botaoEditar.addEventListener('click', () => {
            idEmEdicao = resposta[i].id
            inputNome.value = resposta[i].nome
            inputQuantidade.value = resposta[i].quantidade
            selectImg.value = resposta[i].img || ""
            tituloFormulario.textContent = "Editar produto"
            botaoCadastrar.textContent = "Salvar alterações"
            form.classList.add("editando")
            form.scrollIntoView({ behavior: "smooth", block: "center" })
        })
        
        botaoDeletar.className = "botaoDeletar"
        botaoDeletar.textContent = "Deletar"
        botaoDeletar.addEventListener('click', async () => {
            await fetch(url + "/" + resposta[i].id, {
                method: "DELETE"
            })
            recarregarProdutos()
        })

        tituloCard.textContent = resposta[i].nome
        quantidadeCard.textContent = "Quantidade: " +  resposta[i].quantidade

        const containerBotoes = document.createElement('div')
        containerBotoes.className = "containerBotoes"
        containerBotoes.append(botaoEditar, botaoDeletar)

        const corpoCard = document.createElement('div')
        corpoCard.className = "corpoCard"
        corpoCard.append(tituloCard, quantidadeCard, containerBotoes)

        card.append(imgCard, corpoCard)
        listaCards.appendChild(card)
    }
}

async function carregarProdutos(){
    await carregarFotos()
    const consulta = await fetch(url)
    const resposta = await consulta.json()

    criarCards(resposta)
}

const botaoAdmin = document.getElementById('botaoAdmin')
const botaoHome = document.getElementById('botaoHome')

botaoAdmin.addEventListener('click', carregarAdmin)
botaoHome.addEventListener('click',carregarHome)
