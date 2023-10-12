const imagem = document.getElementById("poster")
const corpo = document.getElementById('corpo')
const busca = document.getElementById('busca')

var contado = false

function informacoes()
{
    const nome = document.getElementById('nome').value
    const infors_texto = document.getElementById('infors__texto')
    const section_text1 = document.getElementById('section__text1')

    // faz a requisição a API
    
    let resposta = fetch("https://www.omdbapi.com/?i=tt3896198&apikey=e83a1b92&t=" + nome)
    .then(respones=>respones.json())
    .then(dados => {
        console.log(dados)
        if (dados.Poster != undefined) {
            imagem.src = dados.Poster
        } else {
            imagem.src = 'assests/Poster não encontrado.png'
        }

        // verifica se o contado e true o false se for true ele apagar as informações do filme
        if (contado) {
            existe(document.getElementById('li__filme'))
            existe(document.getElementById('li__lancamento'))
            existe(document.getElementById('enredo'))
            existe(document.getElementById('section__text2'))
            existe(document.getElementById('li__autores'))
            existe(document.getElementById('li__escritores'))
            existe(document.getElementById('li__diretores'))
            existe(document.getElementById('li__generos'))
            existe(document.getElementById('li__tempo'))
            existe(document.getElementById('li__tipo'))

        }

        contado = true

        // criar o li aonde o nome do filme vai ficar
        const li_filme = criar_elemento('li', section_text1)
        li_filme.id = 'li__filme'

        // nome do filme completo
        const nome_filme = criar_elemento('p', li_filme)
        nome_filme.classList.add('nome__filme')
        nome_filme.id = 'nome__filme'

        diferente(nome_filme, 'N/A', `Nome completo: `, dados.Title)

        // criar o li aonde o lançamento vai ficar vai está
        const li_lancamento = criar_elemento('li', section_text1)
        li_lancamento.id = 'li__lancamento'

        // lançamento
        const lancamento = criar_elemento('p', li_lancamento)
        lancamento.classList.add('nome__filme')
        lancamento.id = 'lancamento'

        diferente(lancamento, 'N/A', `Data de lançamento: `, dados.Released)

        // Aqui e o enredo do filme ou serie
        let enredo = criar_elemento('h2', infors_texto)
        enredo.classList.add('enredo')
        enredo.id = 'enredo'
    
        diferente(enredo, 'N/A', `Enredo: `, dados.Plot)

        // Vamos criar uma segunda lista com id section__text2
        const section_text2 = criar_elemento('ul', infors_texto)
        section_text2.id = 'section__text2'

        // criar o li dos autores
        const li_autores = criar_elemento('li', section_text2)
        li_autores.id = 'li__autores'

        // Autores
        let autores = criar_elemento('p', li_autores)
        autores.classList.add('texto_tamanho')
        autores.id = 'autores'
    
        diferente(autores, 'N/A', `Autores: `, dados.Actors)

        // criar o li dos escritores
        const li_escritores = criar_elemento('li', section_text2)
        li_escritores.id = 'li__escritores'

        // mostra os escrito
        let escrito = criar_elemento('p', li_escritores)
        escrito.classList.add('texto_tamanho')
        escrito.id = 'escritores'
    
        diferente(escrito, 'N/A', `Escritores: `, dados.Writer)

        // criar o li dos diretores da obra
        const li_diretores = criar_elemento('li', section_text2)
        li_diretores.id = 'li__diretores'

        // direto da obra
        let direto = criar_elemento('p', li_diretores)
        direto.classList.add('texto_tamanho')
        direto.id = 'diretor'
    
        diferente(direto, 'N/A', `Diretores: `, dados.Director)

        // criar o li dos generos da obra
        const li_generos = criar_elemento('li', section_text2)
        li_generos.id = 'li__generos'

        // genero
        let genero = criar_elemento('p', li_generos)
        genero.classList.add('texto_tamanho')
        genero.id = 'genero'
    
        diferente(genero, 'N/A', `Genero: `, dados.Genre)

        // criar o li que vai mostrar o tempo da obra
        const li_tempo = criar_elemento('li', section_text2)
        li_tempo.id = 'li__tempo'

        // tempo
        let tempo = criar_elemento('p', li_tempo)
        tempo.classList.add('nome__filme')
        tempo.id = 'tempo'
    
        diferente(tempo, 'N/A', `Tempo: `, dados.Runtime)

        // criar o li que vai mostrar o tipo da animação
        const li_tipo = criar_elemento('li', section_text2)
        li_tipo.id = 'li__tipo'
    
        // tipo da animação
        let tipo = criar_elemento('p', li_tipo)
        tipo.classList.add('nome__filme')
        tipo.id = 'tipo'
    
        diferente(tipo, 'N/A', `Tipo: `, dados.Type)
    
    })
}

// função para ver se um elemento existe se existe ele apagar

function existe(elemento)
{
    if (elemento != null) {
        elemento.remove()
    }
}

// elemento nome do elemento e o local e a tag pai
function criar_elemento(elemento, local)
{
    elemento = document.createElement(elemento)
    local.appendChild(elemento)

    return elemento
}

// ser elemento for diferente da variavel igual e não for undefined escreva a string em elemento

function diferente(elemento, igual, string, json)
{
    if (json == undefined) {
        elemento.innerHTML = string + 'Informação não encontrada'
        elemento.style.color = 'red'

    } else if (igual != json) {
        elemento.innerHTML = string + json

    }
}