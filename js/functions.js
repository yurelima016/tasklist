import { appElements, setCurrentMode, setCurrentTaskCard} from './index.js';

// Show more options
export function toggleFloatingButtons() {
    appElements.main.optionsContainer.classList.toggle('show');
    console.log('Clicked');
};

export function selectTaskCard(taskCard){
    document.querySelectorAll('.taskCard').forEach(card => card.classList.remove('selected'));
    taskCard.classList.add('selected');
};

export function enableEditAndDeleteButtons(){
    appElements.main.editTask.disabled = false
    appElements.main.deleteTask.disabled = false;
};



export function openTaskModal(mode, taskCard = null){

    setCurrentMode(mode);
    setCurrentTaskCard(taskCard);

    const modalTitle = appElements.modal.modalTitle;
    const modalFormTitle = appElements.modal.taskFormTitle;
    const modalFormDescription = appElements.modal.taskFormDescription;
    const modalFormPriority = appElements.modal.taskFormPriority;
    const saveBtn = appElements.modal.saveButton;

    if (mode === 'view' && taskCard){
        modalTitle.textContent = 'View Task';
        modalFormTitle.value = taskCard.querySelector('.taskTitle').textContent;
        modalFormDescription.value = taskCard.querySelector('.taskDescription').textContent;

        modalFormTitle.disabled = true;
        modalFormDescription.disabled = true;
        const badgeTask = taskCard.querySelector('.badge').textContent.trim().toLowerCase();

        modalFormPriority.forEach(input => {
            if (input.value === badgeTask){
                input.checked = true;
                input.disabled = false;
            }
            else{
                input.checked = false;
                input.disabled = true;
            }
        })

        saveBtn.style.display = 'none';
    }

    else if (mode === 'edit' && taskCard){
        modalTitle.textContent = 'Edit Task';
        modalFormTitle.value = taskCard.querySelector('.taskTitle').textContent;
        modalFormDescription.value = taskCard.querySelector('.taskDescription').textContent;
        const badgeTask = taskCard.querySelector('.badge').textContent.trim().toLowerCase();

        modalFormPriority.forEach(input => {
            if (input.value === badgeTask){
                input.checked = true;
            }
            else{
                input.checked = false;
            }
        })
    }
    else if(mode === 'create'){
        modalTitle.textContent = 'Create Task';
        modalFormTitle.value = '';
        modalFormDescription.value = '';
        modalFormPriority.forEach(input => {
            input.checked = false;
        });
    }
    
    appElements.modal.taskModal.style.display = 'block';
    appElements.main.modalOverlay.style.display = 'block';

}

export function closeTaskModal(){
    appElements.modal.taskModal.style.display = 'none';
    appElements.main.modalOverlay.style.display = 'none';
}

export function deleteTaskModal(selectedCard){
    const confirmation = confirm('Are you sure you want to delete this task?');
    if(confirmation){
        selectedCard.remove();
        appElements.main.editTask.disabled = true;
        appElements.main.deleteTask.disabled = true;

        console.log('Task Deletada');
    }
}

export function deselectTaskIfClickedOutside(event){
    const isTaskCard = event.target.closest('.taskCard');
    const isOptionsButton = event.target.closest('#optionsButton')
    const isEditButton = event.target.closest('#edit-task');
    const isDeleteButton = event.target.closest('#delete-task');

    if (!isTaskCard && !isOptionsButton && !isEditButton && !isDeleteButton){
        document.querySelectorAll('.taskCard.selected').forEach(card =>{
            card.classList.remove('selected');
        });
        
        appElements.main.editTask.disabled = true;
        appElements.main.deleteTask.disabled = true;
    }
}

export function createNewTask(title, description, priority) {
        
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
    console.log("Task criada");
};

export function updateTask(taskCard, title, description, priority){
    taskCard.querySelector('.taskTitle').textContent = title;
    taskCard.querySelector('.taskDescription').textContent = description;
    const badge = taskCard.querySelector('.badge');

    badge.classList.remove('text-bg-success', 'text-bg-warning', 'text-bg-danger');

    if (priority.toLowerCase() === 'low'){
        badge.textContent = 'Low';
        badge.classList.add('text-bg-success');
    }
    else if(priority.toLowerCase() === 'medium'){
        badge.textContent = 'Medium';
        badge.classList.add('text-bg-warning');
    }
    else if (priority.toLowerCase() === 'high'){
        badge.textContent = 'High';
        badge.classList.add('text-bg-danger');
    }

    console.log("Task atualizada")
};