import * as functions from './functions.js';
import { appElements, currentMode, currentTaskCard } from './index.js';

export function mountListeners(){
    console.log('Montando listeners...');

    appElements.main.modalOverlay.addEventListener('click', functions.closeTaskModal);

    appElements.main.optionsButton.addEventListener('click', () => {
        functions.toggleFloatingButtons();
    });

    appElements.main.newTask.addEventListener('click', () => {
        functions.openTaskModal('create');
    });

    appElements.main.editTask.addEventListener('click', () => {
        const selectedCard = document.querySelector('.taskCard.selected');

        if (selectedCard){
            functions.openTaskModal('edit', selectedCard);
        }
        else{
            alert('Select a task to be able to edit it');
        }
    });

    appElements.main.deleteTask.addEventListener('click', () => {
        const selectedCard = document.querySelector('.taskCard.selected');

        if(selectedCard){
            functions.deleteTaskModal(selectedCard);
        }
    });

    appElements.task.taskContainer.addEventListener('click', (event) => {
        const clickedTaskCard = event.target.closest('.taskCard');
        const clickedExpandButton = event.target.closest('.expandTask i');

        if (!clickedTaskCard){
            return;
        };

        functions.selectTaskCard(clickedTaskCard);
        functions.enableEditAndDeleteButtons();

        if (clickedExpandButton && event.target.tagName.toLowerCase() === 'i'){
            console.log('Teste');
            functions.openTaskModal('view', clickedTaskCard);
        };
    });

    appElements.modal.taskForm.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const title = appElements.modal.taskFormTitle.value.trim();
        const description = appElements.modal.taskFormDescription.value.trim();
        const priorityInput = Array.from(appElements.modal.taskFormPriority).find(input => input.checked);
        const priority = priorityInput ? priorityInput.value : 'low';

        if (currentMode === 'create'){
            functions.createNewTask(title, description, priority);
        }
        else if(currentMode === 'edit' && currentTaskCard){
            functions.updateTask(currentTaskCard, title, description, priority);
        }

        console.log('Formulário enviado!');
        console.log('Título:', title);
        console.log('Descrição:', description);
        console.log('Prioridade:', priority);
        
        functions.closeTaskModal();
        appElements.modal.taskForm.reset();
    });


    appElements.modal.closeModalButton.addEventListener('click', functions.closeTaskModal);
    appElements.modal.cancelButton.addEventListener('click', functions.closeTaskModal);

    document.addEventListener('click', (event) => {
        functions.deselectTaskIfClickedOutside(event);
    });

    console.log('Listeners montados!');
}
