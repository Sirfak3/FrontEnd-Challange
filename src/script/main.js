// Botão de adicionar nova task
function addmore() {
    const containerdash = document.querySelector('.dashcontainermain');
    containerdash.style.display = 'flex'
}

// Botão de return no dashboard
function canceltask() {
    const title = document.getElementById('add-title').value;
    const text = document.getElementById('add-text').value;
    const containerdash = document.querySelector('.dashcontainermain');
    document.getElementById('confirm-text').innerHTML = 'Você irá perder as edições já feitas, sair mesmo assim?'
    
    if (title || text) {


        showCustomConfirm((confirm => {
            if (confirm) {
                containerdash.style.display = 'none';
                document.getElementById('add-task').reset();
            } else {
                return;
            }
        }))
    } else {
        containerdash.style.display = 'none'
    }
}

// Renderiza na tela as tasks existentes
function rendertasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const containerlist = document.getElementById('list');

    tasks.forEach((task, index) => {
        const taskcard = `
        <div class="card allcard" data-index="${index}" style="background-color: ${task.color}; font-family: ${task.fonte}"> 
            <h3 class="card-title" id="card-title">${task.titulo}</h3>
            <p class="card-text">${task.texto}</p>
            <div id="date">
                <p>${task.date}</p>
            </div>
            <div class="acoes">
                <i class="fa fa-edit" title="Edit" onclick="editthis(${index}, event)"></i>
                <i class="fa fa-trash" title="Delete" onclick="delthistask(${index}, event)"></i>
            </div>
        </div>
        `;

        containerlist.innerHTML += taskcard;
    });
}

// Input de pesquisa no header
function searchtask() {
    const searchValue = document.getElementById('searchtask').value.toLowerCase();
    const taskcard = document.querySelectorAll('.card');

    taskcard.forEach(task => {
        const taskName = task.querySelector('.card-title').textContent.toLowerCase();

        if (taskName.includes(searchValue)) {
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    });
}

// Função para deletar uma task
function delthistask(index, event) {
    event.stopPropagation();

    showCustomConfirm((confirm) => {
        if (confirm) {
            let task = JSON.parse(localStorage.getItem('tasks'));
            task.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(task));
            location.reload();
        }
    });
}

// função de visualização da task
function viewtask() {
    const cards = document.querySelectorAll('.card');
    const container = document.querySelector('.viewtask');
    const paper = document.querySelector('.viewtask-container');
    const titleElement = document.querySelector('.view-title');
    const textElement = document.querySelector('.view-text');
    const dateElement = document.querySelector('.view-date');
    let viewActived = false;
    
    cards.forEach(task => {
        task.addEventListener('click', (event) => {

            event.preventDefault();
            event.stopPropagation();

            if (!viewActived) {
                const title = task.querySelector('.card-title').textContent;
                const text = task.querySelector('.card-text').textContent;
                const date = task.querySelector('#date p').textContent;

                titleElement.textContent = title;
                textElement.textContent = text;
                dateElement.textContent = date;

                const color = window.getComputedStyle(task).backgroundColor;
                paper.style.backgroundColor = color;

                container.style.display = 'flex';
                viewActived = true;
            }
        });
    });

    container.addEventListener('click', function () {
        container.style.display = 'none';
        viewActived = false;
    });
}

function showCustomConfirm(callback) {
    const confirmModal = document.getElementById('custom-confirm');
    const yesBtn = document.getElementById('confirm-yes');
    const noBtn = document.getElementById('confirm-no');

    confirmModal.style.display = 'flex';

    yesBtn.onclick = () => {
        confirmModal.style.display = 'none';
        callback(true);
    };

    noBtn.onclick = () => {
        confirmModal.style.display = 'none';
        callback(false);
    };
}

// Função para verificar se darkmode esta ativo
function darmodevirify() {
    let actived = JSON.parse(localStorage.getItem('darkmode')) || false;

    if (!actived) {
        document.documentElement.style.setProperty('--tema2', 'rgb(255, 255, 255)');
        document.documentElement.style.setProperty('--tema', 'rgb(255, 255, 255)');
    } else {
        document.documentElement.style.setProperty('--tema2', 'rgb(8, 10, 17)');
        document.documentElement.style.setProperty('--tema', 'rgb(9, 9, 27)');
    }
}

function colorcustom() {
    let TextAndBorderColor = JSON.parse(localStorage.getItem('TextAndBorder')) || 'rgb(0, 0, 0)';

    if (TextAndBorderColor) {

        document.documentElement.style.setProperty('--textAndBorder', TextAndBorderColor.toString());
    }
}

function cardsize() {
    const size = JSON.parse(localStorage.getItem('sizeOfCard'));
    const allcard = document.querySelectorAll('.allcard');

    allcard.forEach(card => {
        card.style.setProperty('min-width', size.largura + 'px');
        card.style.setProperty('min-height', size.altura + 'px');
        card.style.setProperty('max-width', size.largura + 'px');
        card.style.setProperty('max-height', size.altura + 'px');

        const paragraph = card.querySelector('p');
        const date = document.querySelectorAll('#date')
        
        if (size.altura < 150 && paragraph) {
            paragraph.style.display = 'none';
            
            date.forEach(dat => {
                dat.style.display = 'none'
            })
        }
    })
}


document.addEventListener('DOMContentLoaded', () => {
    rendertasks();
    viewtask();
    colorcustom();
    darmodevirify();
    cardsize();
});
