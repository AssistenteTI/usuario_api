const btnlistar = document.querySelector('#btnListar');
// Buscar na lista
const btnBuscar = document.querySelector('#btnBuscar');
const input = document.querySelector("#buscar");
// Adicionar na lista
const btnAdicionar = document.querySelector('#btnAdicionar');
const titulo = document.querySelector('#titulo');
const conteudo = document.querySelector('#conteudo');
// Atualizar a lista
const btnAtualizar = document.querySelector('#btnAtualizar');
const tituloAtua = document.querySelector('#tituloAtua');
const idAtua = document.querySelector('#idAtua');
// Deletar da Lista
const btnDel = document.querySelector('#btnDeletar');
const idDel = document.querySelector('#idDel');

// Resultado
const resultado = document.querySelector(`#resultado`);



btnlistar.addEventListener("click", () => lista())
btnBuscar.addEventListener("click", () => dados("busca"))
btnAdicionar.addEventListener("click", () => dados("adicionar"))
btnAtualizar.addEventListener("click", () => dados("atualizar"))
btnDel.addEventListener("click", () => dados("deletar"))

function dados(funcao) {
    valor = input.value
    console.log(valor)

    console.log(tituloAtua.value.trim())
    if (funcao == "busca") {
        buscar(input.value)
    };
    if (funcao == "adicionar") {
        adicionar(titulo.value.trim(), conteudo.value.trim())
    }
    if (funcao == "atualizar") {
        atualizar(tituloAtua.value.trim(), idA = idAtua.value.trim())
    }
    if (funcao == "deletar") {
        deletar(idDel.value.trim())
    }
}
function lista() {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((dados) => {
            mostrar = []
            for (let cont = 0; cont < 10; cont++) {
                mostrar.join(" ")
                mostrar.push(`${dados[cont].id} - ${dados[cont].title}<br>`)
                resultado.innerHTML = mostrar
            }
            console.log(dados)
        });
}

function buscar(input) {
    fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((dados) => {
            console.log(dados[1].id)
            let busca = dados[input].id
            let user = dados[input].userId
            let body = dados[input].body
            resultado.innerHTML = `<div>
            <p><strong>ID</strong>: ${busca}</p>
            <p><strong>UserID</strong>: ${user}</p>
            <p><strong>Body</strong>: ${body}</p>
            </div>`
            console.log(busca)
        });
}

function adicionar(titulo, conteudo) {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: titulo,
            body: conteudo,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            resultado.innerHTML =`<strong>ID</strong>:${json.id}<br><strong>Titulo</strong>: ${json.title}<br><strong>Conteudo</strong>: ${json.body}`
        }
    );
}

function atualizar(titulo, id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: id,
            title: titulo,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(json)
            resultado.innerHTML =`<strong>ID</strong>: ${json.id}<br><strong>Titulo</strong>: ${json.title}`
        });
}

function deletar(id) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE',
        
    }).then(console.log(`${id} deletado`),
    resultado.innerHTML =`<p>O <strong>id ${id}</strong> foi deletado</p>`)
    .then((response) => console.log(response.status));
}