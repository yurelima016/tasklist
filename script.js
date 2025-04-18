document.addEventListener('DOMContentLoaded', () => {
    const optionsButton = document.querySelector('#optionsButton');
    const optionsIcon = document.querySelector('#optionsIcon');
    const floatingButtons = document.querySelector('.floating-buttons');
    const credits = document.querySelector('#credits');
    const taskContainer = document.querySelector('#taskContainer');
    const newTask = document.querySelector('#new-task');
    const modal = document.querySelector('.modal');
    const openModal = document.querySelector('.openModal');
    const closeModal = document.querySelector('.closeModal');
    const cancel = document.querySelector('#cancel');
    const taskForm = document.getElementById('taskForm');
    const deleteTask = document.querySelector('#delete-task');
    const editTask = document.querySelector('#edit-task')
    let taskBeingEdited = null;

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
    });

    openModal.addEventListener('click', () => {
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    cancel.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    function createNewTask(title, description, priority) {
        const task = document.createElement('div');
        task.classList.add('taskCard');

        const taskPriority = document.createElement('div');
        taskPriority.classList.add('taskPriority');
        const taskPriorityText = document.createElement('span');
        taskPriorityText.classList.add('badge');

        if (priority === 'low') {
            taskPriorityText.classList.add('text-bg-success');
        } else if (priority === 'medium') {
            taskPriorityText.classList.add('text-bg-warning');
        } else if (priority === 'high') {
            taskPriorityText.classList.add('text-bg-danger');
        }

        const expandTask = document.createElement('div');
        expandTask.classList.add('expandTask');
        const expandIcon = document.createElement('i');
        expandIcon.classList.add('bi', 'bi-arrows-angle-expand');

        const taskTitle = document.createElement('h4');
        taskTitle.classList.add('taskTitle');
        const taskDescription = document.createElement('p');
        taskDescription.classList.add('taskDescription');

        taskPriorityText.innerText = priority;
        taskTitle.innerText = title;
        taskDescription.innerText = description;

        task.appendChild(taskPriority);
        taskPriority.appendChild(taskPriorityText);
        task.appendChild(expandTask);
        expandTask.appendChild(expandIcon);
        task.appendChild(taskTitle);
        task.appendChild(taskDescription);

        taskContainer.appendChild(task);
    };

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const titleValue = document.getElementById('title').value;
        const descriptionValue = document.getElementById('description').value;
        const priorityValue = document.getElementById('priority').value;

        if (!titleValue.trim() || !descriptionValue.trim() || !priorityValue.trim()) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if (taskBeingEdited) {
            taskBeingEdited.querySelector('.taskTitle').innerText = titleValue;
            taskBeingEdited.querySelector('.taskDescription').innerText = descriptionValue;

            const badge = taskBeingEdited.querySelector('.taskPriority span');
            badge.innerText = priorityValue;

            badge.className = 'badge';

            if (priorityValue === 'low') {
                badge.classList.add('badge', 'text-bg-success');
            } else if (priorityValue === 'medium') {
                badge.classList.add('badge', 'text-bg-warning');
            } else if (priorityValue === 'high') {
                badge.classList.add('badge', 'text-bg-danger');
            }

            taskBeingEdited.classList.remove('selected');
            taskBeingEdited = null;
        }
        else{
            createNewTask(titleValue, descriptionValue, priorityValue);
        }

        modal.style.display = 'none';
        taskForm.reset();
    });

    taskContainer.addEventListener('click', (event) => {
        const taskCard = event.target.closest('.taskCard');
        if (taskCard){
            // Remove 'selected' off all
            document.querySelectorAll('.taskCard').forEach(card =>{
                card.classList.remove('selected');
            });
            // Add 'selected' to the clicked one
            taskCard.classList.add('selected');
        }
    });

    deleteTask.addEventListener('click', () => {
        const selectedTask = document.querySelector('.taskCard.selected');
        if (selectedTask){
            selectedTask.remove();
        }
    });

    editTask.addEventListener('click', () => {
        const selectedTask = document.querySelector('.taskCard.selected');
        if (selectedTask){
            taskBeingEdited = selectedTask;

            // Fill modal with current data
            document.getElementById('title').value = selectedTask.querySelector('.taskTitle').innerText;
            document.getElementById('description').value = selectedTask.querySelector('.taskDescription').innerText;
            document.getElementById('priority').value = selectedTask.querySelector('.taskPriority .badge').innerText.toLowerCase();
            modal.style.display = 'block';
        }
        else{
            alert('Select a task to edit!');
        }
    });
});
