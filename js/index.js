import * as functions from './functions.js';
import * as listeners from './listeners.js';

export const appElements = {};
export let currentMode = 'create';
export let currentTaskCard = null;

export function setCurrentMode(mode){
    currentMode = mode;
}

export function setCurrentTaskCard(taskCard){
    currentTaskCard = taskCard;
}

document.addEventListener('DOMContentLoaded', () => {
    appElements.main = {
        modalOverlay: document.getElementById('modalOverlay'),
        pageTitle: document.getElementById('pageTitle'),
        optionsContainer: document.getElementById('optionsContainer'),
        newTask: document.getElementById('new-task'),
        editTask: document.getElementById('edit-task'),
        deleteTask: document.getElementById('delete-task'),
        optionsButton: document.getElementById('optionsButton'),
        pageCreator: document.getElementById('credits'),
    };
    appElements.task = {
        taskContainer: document.getElementById('taskContainer'),
        taskCard: document.querySelector('.taskCard'),
        taskPriority: document.querySelector('.taskPriority'),
        priorityBadge: document.querySelector('.badge'),
        taskTitle: document.querySelector('.taskTitle'),
        taskDescription: document.querySelector('.taskDescription'),
    };
    appElements.modal = {
        taskModal: document.getElementById('taskModal'),
        modalContent: document.querySelector('.taskModalContent'),
        modalHeader: document.getElementById('taskModalHeader'),
        modalTitle: document.getElementById('taskModalTitle'),
        closeModalButton: document.querySelector('.closeTaskModal'),
        taskForm: document.getElementById('taskModalForm'),
        taskFormTitle: document.getElementById('title'),
        taskFormDescription: document.getElementById('description'),
        taskFormPriority: document.querySelectorAll('input[name="priority"]'),
        saveButton: document.getElementById('saveBtn'),
        cancelButton: document.getElementById('cancelBtn'),
    };

    console.log('App Elements carregados:', appElements);
    listeners.mountListeners();

});