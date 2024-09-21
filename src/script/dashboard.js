let task = JSON.parse(localStorage.getItem('tasks')) || [];
let colorValue = 'cadetblue';
let now = new Date
let dateValue;
let editingIndex = null;

document.querySelectorAll('.select-color').forEach(item => {
    item.addEventListener('click', function() {
        colorValue = this.id.toString();
        document.getElementById('add-title').style.backgroundColor = colorValue;
        document.getElementById('add-text').style.backgroundColor = colorValue;
    })
})

dateValue = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()} At ${now.getHours()}: ${now.getMinutes()}`;

function addnewtask() {
    const title = document.getElementById('add-title').value;
    const text = document.getElementById('add-text').value;
    const containerdash = document.querySelector('.dashcontainermain');

    if (title && text) {
        const newtask = {
            titulo: title,
            texto: text, 
            color: colorValue,
            date: dateValue
        };

        if (editingIndex !== null) {
            task[editingIndex] = newtask;
            document.getElementById('add-task').removeAttribute('data-editing');
            editingIndex = null;
       } else {
            task.unshift(newtask);
        }

        localStorage.setItem('tasks', JSON.stringify(task));

        document.getElementById('add-task').reset();
        containerdash.style.display = 'none';
        location.reload();
    } else {
        alert('Escreva em todos os campos');
    }
}

function editthis(index, event) {
    event.stopPropagation();

    const taskToEdit = task[index];

    document.querySelector('.dashcontainermain').style.display = 'flex';
    document.querySelector('.addnewtask').textContent = 'Atualizar';

    document.getElementById('add-title').value = taskToEdit.titulo;
    document.getElementById('add-text').value = taskToEdit.texto;

    document.getElementById('add-title').style.backgroundColor = taskToEdit.color;
    document.getElementById('add-text').style.backgroundColor = taskToEdit.color;
    colorValue = taskToEdit.color;
    

    editingIndex = index;
}