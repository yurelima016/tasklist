document.addEventListener('DOMContentLoaded', () => {
    const modalOverlay = document.querySelector('#modalOverlay');
    const optionsButton = document.querySelector('#optionsButton');
    const optionsIcon = document.querySelector('#optionsIcon');
    const floatingButtons = document.querySelector('.floating-buttons');
    const editTask = document.querySelector('#edit-task');
    const deleteTask = document.querySelector('#delete-task');
    const credits = document.querySelector('#credits');
    const taskContainer = document.querySelector('#taskContainer');
    const modal = document.querySelector('.taskModal');
    const taskForm = document.getElementById('taskModalForm');
    const modalTitle = document.querySelector('#taskModalTitle');
    const openModal = document.querySelector('.openTaskModal');
    const closeModal = document.querySelector('.closeTaskModal');
    const cancel = document.querySelector('#cancelBtn');
    let taskBeingEdited = null;
    let isViewMode = false;
    editTask.disabled = true;
    deleteTask.disabled = true;


    // Close modal window and reset form
    function closeModalWindow() {
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
    
        // Re-enable form fields
        document.getElementById('title').disabled = false;
        document.getElementById('description').disabled = false;
        document.querySelectorAll('input[name="priority"]').forEach(input => input.disabled = false);
    
        // Show buttons again
        document.getElementById('saveBtn').style.display = 'inline-block';
        document.getElementById('cancelBtn').style.display = 'inline-block';
    
        isViewMode = false;
        taskForm.reset();
    }

    // Create card for a new task
    function createNewTask(title, description, priority) {
        
        // Card creation
        const task = document.createElement('div');
        task.classList.add('taskCard');

        // Priority badge creation
        const taskPriority = document.createElement('div');
        taskPriority.classList.add('taskPriority');
        const taskPriorityText = document.createElement('span');
        taskPriorityText.classList.add('badge');

        // Expand task card button creation
        const expandTask = document.createElement('div');
        expandTask.classList.add('expandTask');
        const expandIcon = document.createElement('i');
        expandIcon.classList.add('bi', 'bi-arrows-angle-expand');

        // Task title creation
        const taskTitle = document.createElement('h4');
        taskTitle.classList.add('taskTitle');

        // Task description creation
        const taskDescription = document.createElement('p');
        taskDescription.classList.add('taskDescription');

        // Appending elements to the task card
        task.appendChild(taskPriority);
        taskPriority.appendChild(taskPriorityText);
        task.appendChild(expandTask);
        expandTask.appendChild(expandIcon);
        task.appendChild(taskTitle);
        task.appendChild(taskDescription);
        
        // Defining form field values
        if (priority === 'low') {
            taskPriorityText.classList.add('text-bg-success');
            taskPriorityText.innerText = 'Low';
        } else if (priority === 'medium') {
            taskPriorityText.classList.add('text-bg-warning');
            taskPriorityText.innerText = 'Medium';
        } else if (priority === 'high') {
            taskPriorityText.classList.add('text-bg-danger');
            taskPriorityText.innerText = 'High';
        }
        taskTitle.innerText = title;
        taskDescription.innerText = description;
        
        // Appending task to the container
        taskContainer.appendChild(task);
    };

    // Detect click on options button
    optionsButton.addEventListener('click', () => {
        updateOptionButtonIcon();
    });

    // Detect click on the credits
    credits.addEventListener('click', () => {
        window.location.href = 'https://github.com/yurelima016';
    });
    
    // Detect click on the floating button (New Task)
    openModal.addEventListener('click', () => {
        modalTitle.innerText = 'Create New Task';
        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
    });

    // Detect click on the close button (X) of the modal
    closeModal.addEventListener('click', () => {
        closeModalWindow();
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
    });

    // Detect click on the cancel button of the modal
    cancel.addEventListener('click', () => {
        closeModalWindow();
        modalOverlay.style.display = 'none';
        modal.style.display = 'none';
    });

    // Detects click outside modal to close it
    window.onclick = function(event) {
        if (event.target === modalOverlay) {
            modalOverlay.style.display = 'none';
            modal.style.display = 'none';
        }
    }
    

    taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
         
        if (isViewMode) {
            return; 
        }
    
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
        modalOverlay.style.display = 'none';
        taskForm.reset();
    });

    taskContainer.addEventListener('click', (event) => {
        const taskCard = event.target.closest('.taskCard');
        if (taskCard) {
            document.querySelectorAll('.taskCard').forEach(card => card.classList.remove('selected'));
            taskCard.classList.add('selected');
        }

        editTask.disabled = false;
        deleteTask.disabled = false;

        const expandIcon = event.target.closest('.expandTask i');
        if (expandIcon) {
            openModalWithViewMode(taskCard);
        };
    });

    function openModalWithViewMode(taskCard) {
        const title = taskCard.querySelector('.taskTitle').innerText;
        const description = taskCard.querySelector('.taskDescription').innerText;
        const priority = taskCard.querySelector('.taskPriority .badge').innerText;
    
        modalTitle.innerText = 'View Task';
    
        document.getElementById('title').value = title;
        document.getElementById('description').value = description;
    
        const priorityNormalized = (priority === 'Baixa') ? 'low' : (priority === 'Média') ? 'medium' : 'high';
        const priorityInput = document.querySelector(`input[name="priority"][value="${priorityNormalized}"]`);
        if (priorityInput) {
            priorityInput.checked = true;
        }
    
        // Desabilita campos
        document.getElementById('title').disabled = true;
        document.getElementById('description').disabled = true;
        document.querySelectorAll('input[name="priority"]').forEach(input => {
            if (input.value !== priorityNormalized){
                input.disabled = true;
            }
        });
    
        // Esconde botões de Save e Cancel
        document.getElementById('saveBtn').style.display = 'none'; // ID do botão de Save
        document.getElementById('cancelBtn').style.display = 'none'; // Botão de Cancelar
    
        isViewMode = true;
    
        modalOverlay.style.display = 'block';
        modal.style.display = 'block';
    }

    deleteTask.addEventListener('click', () => {
        const selectedTask = document.querySelector('.taskCard.selected');
        if (selectedTask) {
            const confirmation = confirm('Are you sure you want to delete this task?');
            if (confirmation){
                selectedTask.remove();
                editTask.disabled = true;
                deleteTask.disabled = true;
            }
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

            modalTitle.innerText = 'Edit Task';
            modalOverlay.style.display = 'block';
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

    document.addEventListener('click', (event) => {
        const clickedInsideTask = event.target.closest('.taskCard');
        const clickedOnButton = event.target.closest('.mini-btn, #optionsButton');
        const modalIsOpen = document.querySelector('.taskModal').style.display === 'block';
    
        if (!clickedInsideTask && !clickedOnButton && !modalIsOpen) {
            document.querySelectorAll('.taskCard.selected').forEach(card => {
                card.classList.remove('selected');
            });
    
            // Desativa botões
            editTask.disabled = true;
            deleteTask.disabled = true;
        }
    });
});
