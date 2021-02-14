const addNewTaskBtn = document.getElementById('add-New-Task');
const tasksContent = document.getElementById('tasks-Content');
const allTasks = document.querySelector('.todo-all-tasks');

let tasks = [];

let todoItems = [];

!localStorage.tasks ? [] : tasks = JSON.parse(localStorage.getItem('tasks'));

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
<div class="todo-task ${task.completed ? 'checked' : ''}">
    <div class="description">
        <p>${task.description}</p>
    </div>
        <div class="btns">
         <button onclick="completeTask(${index})" class="btn-complete ${tasks.completed ? 'checked' : ''}">Done</button>
        <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
    </div>
</div>
`
}

const fillList = () => {
    allTasks.innerHTML = '';
    if (tasks.length > 0) {
        tasks.forEach((task, index) => {
            allTasks.innerHTML += createTemplate(task, index);
        });
        todoItems = document.querySelectorAll('.todo-task')
    }
}
fillList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    if(tasks[index].completed){
            todoItems[index].classList.add('checked');
    }
    else{
        todoItems[index].classList.remove('checked');
    }
     updateLocal();
     fillList();
}


addNewTaskBtn.addEventListener('click', () => {
    tasks.push(new Task(tasksContent.value));
    updateLocal();
    fillList();
    tasksContent.value = '';
})


const deleteTask = (index) => {
    tasks.splice(index,1);
    updateLocal();
    fillList();
}
