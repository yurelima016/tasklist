document.addEventListener('DOMContentLoaded', () => {
    const optionsButton = document.querySelector('#optionsButton');
    const optionsIcon = document.querySelector('#optionsIcon');
    const floatingButtons = document.querySelector('.floating-buttons');
    const credits = document.querySelector('#credits');
    const taskContainer = document.querySelector('#taskContainer');
    const newTask = document.querySelector('#new-task');

    newTask.addEventListener('click', (event) => {

        const task = document.createElement('div');
        task.classList.add('taskCard');

        const titleTask = document.createElement('h2');
        titleTask.classList.add('titleTask');

        const taskPriority = document.createElement('span');
        taskPriority.classList.add('badge');
        taskPriority.classList.add('text-bg-success');
        taskPriority.classList.add('taskPriority');

        const taskDescription = document.createElement('p');
        taskDescription.classList.add('taskDescription');

        
        taskContainer.appendChild(task);
        task.appendChild(titleTask);
        task.appendChild(taskPriority);
        task.appendChild(taskDescription);

        console.log('Funcionou!');
    });

    optionsButton.addEventListener('click', () => {
        // Alterna o ícone do botão principal
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
