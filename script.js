document.addEventListener('DOMContentLoaded', () => {
    const optionsButton = document.querySelector('#optionsButton');
    const optionsIcon = document.querySelector('#optionsIcon');
    const floatingButtons = document.querySelector('.floating-buttons');
    const credits = document.querySelector('#credits');
    const taskContainer = document.querySelector('#taskContainer');
    const modalOverlay = document.querySelector('#modalOverlay');
    const modal = document.querySelector('.modal');
    const openModal = document.querySelector('.openModal');
    const closeModal = document.querySelector('.closeModal');
    const cancel = document.querySelector('#cancel');
    const taskForm = document.getElementById('taskForm');
    const deleteTask = document.querySelector('#delete-task');
    const editTask = document.querySelector('#edit-task');
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
        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
    });

    cancel.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
    });

    window.onclick = function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = 'none';
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
            taskPriorityText.innerText = 'Baixa';
        } else if (priority === 'medium') {
            taskPriorityText.classList.add('text-bg-warning');
            taskPriorityText.innerText = 'Média';
        } else if (priority === 'high') {
            taskPriorityText.classList.add('text-bg-danger');
            taskPriorityText.innerText = 'Alta';
        }

        const expandTask = document.createElement('div');
        expandTask.classList.add('expandTask');
        const expandIcon = document.createElement('i');
        expandIcon.classList.add('bi', 'bi-arrows-angle-expand');

        const taskTitle = document.createElement('h4');
        taskTitle.classList.add('taskTitle');
        const taskDescription = document.createElement('p');
        taskDescription.classList.add('taskDescription');

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

        const titleValue = document.getElementById('title').value.trim();
        const descriptionValue = document.getElementById('description').value.trim();
        const priorityInput = document.querySelector('input[name="priority"]:checked');
        const priorityValue = priorityInput ? priorityInput.value : '';

        if (!titleValue || !descriptionValue || !priorityValue) {
            alert('Por favor, preencha todos os campos!');
            return;
        }

        if (taskBeingEdited) {
            taskBeingEdited.querySelector('.taskTitle').innerText = titleValue;
            taskBeingEdited.querySelector('.taskDescription').innerText = descriptionValue;

            const badge = taskBeingEdited.querySelector('.taskPriority span');
            badge.className = 'badge';

            if (priorityValue === 'low') {
                badge.classList.add('text-bg-success');
                badge.innerText = 'Baixa';
            } else if (priorityValue === 'medium') {
                badge.classList.add('text-bg-warning');
                badge.innerText = 'Média';
            } else if (priorityValue === 'high') {
                badge.classList.add('text-bg-danger');
                badge.innerText = 'Alta';
            }

            taskBeingEdited.classList.remove('selected');
            taskBeingEdited = null;
        } else {
            createNewTask(titleValue, descriptionValue, priorityValue);
        }

        modal.style.display = 'none';
        taskForm.reset();
    });

    taskContainer.addEventListener('click', (event) => {
        const taskCard = event.target.closest('.taskCard');
        if (taskCard) {
            document.querySelectorAll('.taskCard').forEach(card => card.classList.remove('selected'));
            taskCard.classList.add('selected');
        }
    });

    deleteTask.addEventListener('click', () => {
        const selectedTask = document.querySelector('.taskCard.selected');
        if (selectedTask) {
            selectedTask.remove();
        }
    });

    editTask.addEventListener('click', () => {
        const selectedTask = document.querySelector('.taskCard.selected');
        if (selectedTask) {
            taskBeingEdited = selectedTask;

            document.getElementById('title').value = selectedTask.querySelector('.taskTitle').innerText;
            document.getElementById('description').value = selectedTask.querySelector('.taskDescription').innerText;

            const priority = selectedTask.querySelector('.taskPriority .badge').innerText.toLowerCase();
            let priorityNormalized = '';

            if (priority === 'baixa') priorityNormalized = 'low';
            if (priority === 'média') priorityNormalized = 'medium';
            if (priority === 'alta') priorityNormalized = 'high';

            const priorityInput = document.querySelector(`input[name="priority"][value="${priorityNormalized}"]`);
            if (priorityInput) {
                priorityInput.checked = true;
            }

            modal.style.display = 'block';
        } else {
            alert('Selecione uma tarefa para editar!');
        }
    });
    
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modalOverlay.style.display = 'none';
          modal.style.display = 'none';
        }
      });

});
