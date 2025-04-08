document.addEventListener('DOMContentLoaded', () => {
    const footerLink = document.querySelector('#pageCreator');
    const addButton = document.querySelector('#addTaskButton');
    const tasksContainer = document.querySelector('#taskContainer');
    const taskDescription = document.querySelector('#description');

    footerLink.addEventListener('click', () => {
        window.location.href = 'https://github.com/yurelima016';
    });
    
    addButton.addEventListener('click', () => {
        const description = taskDescription.value.trim();

        if (description === '') {
            alert('Please enter a task description.');
            return;
        }

        const task = document.createElement('div');
        task.classList.add('taskCard');
        task.textContent = description;
        tasksContainer.appendChild(task);

        taskDescription.value = '';        
    });
});