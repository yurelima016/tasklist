document.addEventListener('DOMContentLoaded', () => {
    const optionsButton = document.querySelector('#optionsButton');
    const optionsIcon = document.querySelector('#optionsIcon');
    const floatingButtons = document.querySelector('.floating-buttons');
    const credits = document.querySelector('#credits');
    const taskContainer = document.querySelector('#taskContainer');
    const newTask = document.querySelector('#new-task');

    newTask.addEventListener('click', (event) => {

        // Task Card
        const task = document.createElement('div');
        task.classList.add('taskCard');
        
        // Task Priority 
        const taskPriority = document.createElement('div');
        taskPriority.classList.add('taskPriority');
        const taskPriorityText = document.createElement('span');
        taskPriorityText.classList.add('badge');
        taskPriorityText.classList.add('text-bg-success');

        // Task Expansion Button
        const expandTask = document.createElement('div');
        expandTask.classList.add('expandTask');
        const expandIcon = document.createElement('i');
        expandIcon.classList.add('bi');
        expandIcon.classList.add('bi-arrows-angle-expand');

        // Task Title
        const taskTitle = document.createElement('h4');
        taskTitle.classList.add('taskTitle');

        // Task Description
        const taskDescription = document.createElement('p');
        taskDescription.classList.add('taskDescription');

        // Creating the Task Card
        task.appendChild(taskPriority);
        taskPriority.appendChild(taskPriorityText);
        task.appendChild(expandTask);
        expandTask.appendChild(expandIcon);
        task.appendChild(taskTitle);
        task.appendChild(taskDescription);

        // Values just for testing
        taskPriorityText.innerText = 'Baixa';
        taskTitle.innerText = 'Título da Tarefa';
        taskDescription.innerText = 'Descrição da Tarefa';

        taskContainer.appendChild(task);
        console.log('Funcionou!');
    });

    optionsButton.addEventListener('click', () => {
        if (optionsIcon.classList.contains('bi-list')) {
            optionsIcon.classList.remove('bi-list');
            optionsIcon.classList.add('bi-x-lg');
            floatingButtons.classList.add('show');
        } else {
            optionsIcon.classList.remove('bi-x-lg');
            optionsIcon.classList.add('bi-list');
            floatingButtons.classList.remove('show');
        }
        
    });

    credits.addEventListener('click', () => {
        window.location.href = 'https://github.com/yurelima016';
    })
});
