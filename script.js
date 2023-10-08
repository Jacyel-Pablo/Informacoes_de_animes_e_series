const imagem = document.getElementById("imagem")
const corpo = document.getElementById('corpo')
const busca = document.getElementById('busca')

var contado = false
var infor_ativo = false

function pos()
{
    const nome = document.getElementById('nome').value
    
    try{
        let resposta = fetch("https://www.omdbapi.com/?i=tt3896198&apikey=e83a1b92&t=" + nome)
        .then(respones=>respones.json())
        .then(dados => {
            console.log(dados)
            imagem.src = dados.Poster

            // verifica se o contado e true o false se for true ele apagar as informações do filme
            if (contado) {
                document.getElementById('nome__filme').remove()
                document.getElementById('lancamento').remove()

                if (infor_ativo) {
                    document.getElementById('enredo').remove()
                    document.getElementById('autores').remove()
                    document.getElementById('escritores').remove()
                    document.getElementById('genero').remove()
                    document.getElementById('tempo').remove()
                    document.getElementById('tipo').remove()
                }
            }

            contado = true

            // nome do filme completo
            const nome_filme = criar_elemento('p', busca)
            nome_filme.classList.add('nome__filme')
            nome_filme.id = 'nome__filme'
            nome_filme.innerHTML = `Nome completo: ${dados.Title}`

            // lançamento
            const lancamento = criar_elemento('p', busca)
            lancamento.classList.add('nome__filme')
            lancamento.id = 'lancamento'

            lancamento.innerHTML = `Data de lançamento: ${dados.Released}`

            // botão saber mais
            const saber_mais = criar_elemento('input', busca)
            saber_mais.type = 'button'
            saber_mais.value = 'Saber Mais'
            saber_mais.classList.add('saber__mais')
            saber_mais.id = 'saber__mais'
            
            saber_mais.addEventListener('click', () => {
                informacoes(dados)
            })
        })
    } catch (erro) {
        console.log("erro")
    }
}

// elemento nome do elemento e o local e a tag pai
function criar_elemento(elemento, local)
{
    elemento = document.createElement(elemento)
    local.appendChild(elemento)

    return elemento
}

// ser elemento for diferente da variavel igual escreva a string em elemento

function diferente(elemento, igual, string, json)
{
    if (igual != json) {
        elemento.innerHTML = string + json
    }
}

function informacoes(arquivo_json)
{
    imagem.classList.add('poster1')
    let github = document.getElementById('github')
    let instragam = document.getElementById('instragam')

    github.classList.add('github1')
    instragam.classList.add('github1')

    infor_ativo = true

    document.getElementById('saber__mais').remove()

    // tempo
    let tempo = criar_elemento('p', busca)
    tempo.classList.add('nome__filme')
    tempo.id = 'tempo'

    diferente(tempo, 'N/A', `Tempo: `, arquivo_json.Runtime)

    // tipo da animação

    let tipo = criar_elemento('p', busca)
    tipo.classList.add('nome__filme')
    tipo.id = 'tipo'

    diferente(tipo, 'N/A', `Tipo: `, arquivo_json.Type)

    // Aqui e o enredo do filme ou serie
    let enredo = criar_elemento('p', busca)
    enredo.classList.add('nome__filme')
    enredo.id = 'enredo'

    diferente(enredo, 'N/A', `Enredo: `, arquivo_json.Plot)

    // genero

    let genero = criar_elemento('p', busca)
    genero.classList.add('nome__filme')
    genero.id = 'genero'

    diferente(genero, 'N/A', `Genero: `, arquivo_json.Genre)

    // Autores

    let autores = criar_elemento('p', busca)
    autores.classList.add('nome__filme')
    autores.id = 'autores'

    diferente(autores, 'N/A', `Autores: `, arquivo_json.Actors)

    // mostra os escrito

    let escrito = criar_elemento('p', busca)
    escrito.classList.add('nome__filme')
    escrito.id = 'escritores'

    diferente(escrito, 'N/A', `Escritores: `, arquivo_json.Writer)

    // direto da obra

    let direto = criar_elemento('p', busca)
    direto.classList.add('nome__filme')
    direto.id = 'direto'

    diferente(direto, 'N/A', `Diretores: `, arquivo_json.Director)

    // // botão mostrar menos

    let mostrar_menos = criar_elemento('input', busca)
    mostrar_menos.type = 'button'
    mostrar_menos.value = 'Mostrar Menos'
    mostrar_menos.classList.add('saber__mais')

    mostrar_menos.addEventListener('click', () => {
        // apagando botão mostrar menos
        mostrar_menos.remove()

        // apagar elementos criados pelo saber mais
        document.getElementById('enredo').remove()
        document.getElementById('autores').remove()
        document.getElementById('escritores').remove()
        document.getElementById('genero').remove()
        document.getElementById('tempo').remove()
        document.getElementById('tipo').remove()

        // rencriando botão saber mais

        const saber_mais = criar_elemento('input', busca)
        saber_mais.type = 'button'
        saber_mais.value = 'Saber Mais'
        saber_mais.classList.add('saber__mais')
        saber_mais.id = 'saber__mais'
        
        saber_mais.addEventListener('click', () => {
            informacoes(arquivo_json)
        })
    })
}