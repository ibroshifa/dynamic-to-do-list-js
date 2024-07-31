const addButton = document.getElementById('add-task-btn');
const taskInput = document.getElementById('task-input');
const taskList = document.getElementById('task-list');

function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(null,taskText, false));
}

function addTask(event, taskText = taskInput.value.trim(), save = true) {
    
        if (taskText === "") {
        alert("Please enter a task.");
        return;
    }
    const listItem = document.createElement('li');
    listItem.textContent = taskText;
    const removeButton = document.createElement('button');
    removeButton.textContent = "Remove";
    removeButton.classList.add('remove-btn');

    removeButton.onclick = () => {
        taskList.removeChild(listItem);
        removeTaskFromStorage(taskText);
    };

    listItem.appendChild(removeButton);

    taskList.appendChild(listItem);

    taskInput.value = "";

    if (save) {
        saveTaskToStorage(taskText);
    }
}
function saveTaskToStorage(taskText) {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.push(taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

function removeTaskFromStorage(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}

document.addEventListener('DOMContentLoaded', () => {
    loadTasks()
    addButton.addEventListener('click', addTask);

    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });
   // loadTasks()
});
