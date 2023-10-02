// Declaração de uma variável 'banco' que será usada para armazenar as tarefas.
let banco = [];

// Função para obter o banco de dados de tarefas do localStorage.
const getBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];

// Função para definir o banco de dados de tarefas no localStorage.
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

// Função para criar um novo item de tarefa na interface.
const inputItem = (tarefa, status, indice) => {
    const item = document.createElement('div');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}></input>
        <div>${tarefa}</div>
        <button class="delete-button" data-indice=${indice}>X</button>
    `;

    const div = item.querySelector('div');
    const checkbox = item.querySelector('input[type="checkbox"]');

    if (status === 'checked') {
        div.style.textDecoration = 'line-through';
    }

    checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
            div.style.textDecoration = 'line-through';
        } else {
            div.style.textDecoration = 'none';
        }
        atualizaItem(indice, checkbox.checked ? 'checked' : '');
    });

    document.getElementById('todoList').appendChild(item);

    const deleteButton = item.querySelector('.delete-button');
    deleteButton.addEventListener('click', () => {
        removeItem(indice);
    });
}

// Função para atualizar a visualização da lista de tarefas na interface.
const atualizaView = () => {
    limpaTela();
    const banco = getBanco();
    banco.forEach((item, indice) => inputItem(item.tarefa, item.status, indice));
}

// Função para limpar a tela, removendo todos os itens da lista.
const limpaTela = () => {
    const lista = document.getElementById('todoList');
    while (lista.firstChild) {
        lista.removeChild(lista.lastChild);
    }
}

const insereItem = (event) => {
    const tecla = event.key;
    const value = event.target.value;

    if (tecla === 'Enter' && value.trim() !== '') {
        const banco = getBanco();
        banco.push({ 'tarefa': value, 'status': '' });
        setBanco(banco);
        atualizaView();
        event.target.value = '';
    }
}

const removeItem = (indice) => {
    const banco = getBanco();
    banco.splice(indice, 1);
    setBanco(banco);
    atualizaView();
}

const atualizaItem = (indice, status) => {
    const banco = getBanco();
    banco[indice].status = status;
    setBanco(banco);
}

document.getElementById('newItem').addEventListener('keypress', insereItem);

// Inicializa o banco de dados e a visualização.
banco = getBanco(); // Atualiza a variável 'banco' com os dados do localStorage.
atualizaView(); // Atualiza a interface com as tarefas existentes.

const menuButton = document.getElementById('menuButton');
const sidebar = document.getElementById('sidebar');

menuButton.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    menuButton.classList.toggle('active');
});
