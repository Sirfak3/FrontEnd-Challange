function clearscreen() {
    document.getElementById('confirm-text').innerHTML = 'Você perderá todas as tasks e preferências do site. Tem certeza?'
    showCustomConfirm((confirm) => {
        if (confirm) {
            localStorage.clear();
            location.reload();
        }
    })
}

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
                containerdash.style.display = 'none'
                document.getElementById('add-task').reset();
            } else {
                return;
            }
        }))
    }
}

// Renderiza na tela as tasks existentes
function rendertasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const containerlist = document.getElementById('list');

    tasks.forEach((task, index) => {
        const taskcard = `
        <div class="card" data-index="${index}" style="background-color: ${task.color}"> 
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

function darkmode() {
    let active = JSON.parse(localStorage.getItem('darkmode')) || false;

    const darkcheck = document.querySelector('.darkmodecheck');
    const selector = document.querySelector('.selectordarkmode');
    const container = document.querySelector('.container');
    const dashboard = document.querySelector('.container-dash');
    const rightbar = document.querySelector('.right-bar');

    const enableDarkMode = () => {
        selector.style.translate = '100%';
        selector.style.transition = '0.3s ease';
        container.classList.add('dark-mode');
        dashboard.classList.add('dark-mode');
        rightbar.classList.add('dark-mode');
    };
    const disableDarkMode = () => {
        selector.style.translate = '0%';
        selector.style.transition = '0.3s ease';
        container.classList.remove('dark-mode');
        dashboard.classList.remove('dark-mode');
        rightbar.classList.remove('dark-mode');
    };

    if (active) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    darkcheck.addEventListener('click', () => {
        active = !active;
        localStorage.setItem('darkmode', JSON.stringify(active));

        if (active) {
            enableDarkMode();
        } else {
            disableDarkMode();
        }
    });
}

function openRightBar() {
    const openicon = document.querySelector('.rightbar-icon');
    const rightbar = document.querySelector('.right-bar');
    const closebar = document.querySelector('.rightbar-blur');

    openicon.addEventListener('click', () => {
        rightbar.style.display = 'flex';
        closebar.style.display = 'block';
    })
    closebar.addEventListener('click', () => {
        rightbar.style.display = 'none';
        closebar.style.display = 'none';
    })

}
openRightBar();

function viewtask() {
    const cards = document.querySelectorAll('.card');
    const container = document.querySelector('.viewtask');
    const paper = document.querySelector('.viewtask-container');
    const titleElement = document.querySelector('.view-title');
    const textElement = document.querySelector('.view-text');
    const dateElement = document.querySelector('.view-date');
    let viewActived = false;

    cards.forEach((task) => {
        task.addEventListener('click', () => {

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

    container.addEventListener('click', () => {
        container.style.display = 'none';
        viewActived = false;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    rendertasks();
    darkmode();
    viewtask();
});

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

