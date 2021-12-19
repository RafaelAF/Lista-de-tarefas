// 1 temos que referenciar o input
let input = document.querySelector('input[name=tarefa]');

// 2 temos que referenciar o botao

let btn = document.querySelector('#botao');

// 3 referenciar a lista

let lista = document.querySelector('#lista')

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizarTarefas(){
    lista.innerHTML = '';
    input.value = '';
    for(tarefa of tarefas){
        
        // criar o item da lista
        let itemLista = document.createElement('li');
        // adicionar a classe no item da lista
        itemLista.setAttribute('class', 'list-group-item list-group-item-action')
        
        // deletar item
        itemLista.addEventListener('click', function(){
            deletarTarefa(this)
        })
        
        // criar um texto

        let itemTexto = document.createTextNode(tarefa);

        // adicionar o texto no item da lista
        itemLista.appendChild(itemTexto);

        // adicionar o item da lista na lista
        lista.appendChild(itemLista);
        
    }
    

}

renderizarTarefas()

// precisamos escutar o evento clique do botao

btn.addEventListener('click', function(){
    let novaTarefa = input.value;
    if(novaTarefa !== ''){
        // precisamos capturar o valor digitado pelo usuario no input

        
        // precisamos atualizar a nova tarefa no lista
        tarefas.push(novaTarefa);
        renderizarTarefas();
        removerSpans()
        // salvar dados no staorage
        salvarTarefaNoStorage()
    }else{
        removerSpans()
        let card = document.querySelector('.card');
        let span = document.createElement('span');
        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('voce precisa informar a tarefa!')
        span.appendChild(msg)
        card.appendChild(span)
        
    }
    
})

function removerSpans(){
    let spans = document.querySelectorAll('span');

    let card = document.querySelector('.card');

    for(let i = 0; i < spans.length; i++){
        card.removeChild(spans[i])
    }
}

function deletarTarefa(tar){
    // remove a tarefa do array
    tarefas.splice(tarefas.indexOf(tar.textContent), 1)
    renderizarTarefas()

    // salvo os novos dados no banco de dados
    salvarTarefaNoStorage()
}

function salvarTarefaNoStorage(){
    localStorage.setItem('tarefas', JSON.stringify(tarefas))
}