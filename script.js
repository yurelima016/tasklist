const footerLink = document.querySelector('#pageCreator');

footerLink.addEventListener('click', () => {
    window.location.href = 'https://github.com/yurelima016';
});

const addButton = document.querySelector('#addTaskButton');
const tasksContainer = document.querySelector('#taskContainer');

addButton.addEventListener('click', () => {
    const task = document.createElement('div');
    task.classList.add('taskCard');
    tasksContainer.appendChild(task);
});