document.addEventListener('DOMContentLoaded', () => {
    const footerLink = document.querySelector('#pageCreator');
    const addButton = document.querySelector('#addTaskButton');
    const tasksContainer = document.querySelector('#taskContainer');

    footerLink.addEventListener('click', () => {
        window.location.href = 'https://github.com/yurelima016';
    });
    
    addButton.addEventListener('click', () => {
        const task = document.createElement('div');
        task.classList.add('taskCard');
        tasksContainer.appendChild(task);
    });
});