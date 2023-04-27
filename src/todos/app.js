import todoStore, { Filters } from '../store/todo.store';
import html from './app.html?raw';
import { renderPendient} from './models/use-cases';
import { renderTodo} from './models/use-cases/render-todos';

const ElementsIDs = {
    TodoList : '.todo-list',
    newTodoInput : '#new-todo-input',
    destroy : '.destroy',
    crear_completed : '.clear-completed',
    filters : '.filtro',
    all : '#all',
    pending : '#pending',
    completed : '#completed',
    labelPending : '#pending-count'
}


export const App = (elementId) => {
    const displayTodo = () => {
        const todos = todoStore.getTodos(todoStore.getCurrentFilter())
        renderTodo(ElementsIDs.TodoList,todos )
        updatePendientCount();
    }


    const updatePendientCount = () => {
        renderPendient(ElementsIDs.labelPending)
    }

    (() => {
        const app = document.createElement('div');
        app.innerHTML = html;
        document.querySelector(elementId).append(app);
        displayTodo();
    })();

    //Referencia HTML
    const newDescriptionInput = document.querySelector(ElementsIDs.newTodoInput);
    const todoListUL = document.querySelector(ElementsIDs.TodoList)
    const btnDestroy = document.querySelector(ElementsIDs.destroy);
    const crearComplete = document.querySelector(ElementsIDs.crear_completed);
    //filtros
    const filtersLIs = document.querySelectorAll(ElementsIDs.filters);
    const btn_all = document.querySelector(ElementsIDs.all);
    const btn_pending = document.querySelector(ElementsIDs.pending);
    const btn_completed = document.querySelector(ElementsIDs.completed);

    //Listener para lectura de datos
    newDescriptionInput.addEventListener('keyup', (event) =>{
        //validamos si las no es la tecla enter retornar los datos (13 = enter)
        if (event.keyCode !== 13) return;
        if (event.target.value.trim().length === 0) return;
        
        //se agrega la nueva tarea
        todoStore.addTodo(event.target.value);
        displayTodo()
    })
    
    //listener para leer click en el label y marcarlo como listo
    todoListUL.addEventListener('click', (event) => {
        const element = event.target.closest('[data-id]')
        todoStore.toggleTodo(element.getAttribute('data-id'));
        displayTodo()
    })

    todoListUL.addEventListener('click', (event) => {
        const isDestroid = event.target.className === 'destroy';
        const element = event.target.closest('[data-id]');
        if (!element || !isDestroid ) return;
        todoStore.deleteTodo(element.getAttribute('data-id'))
        displayTodo()
    })
    crearComplete.addEventListener('click', (event) => {
        todoStore.deleteComplete();
        displayTodo(); 
    })


    //EVENTOS PARA LOS FILTROS

    filtersLIs.forEach(element => {
        element.addEventListener('click', (element) => {
            filtersLIs.forEach(el => el.classList.remove('selected'));
            element.target.classList.add('selected')


            switch (element.target.text) {
                case btn_all.textContent:
                    todoStore.setFilter(Filters.All)
                    break;
                case btn_pending.textContent:
                    todoStore.setFilter(Filters.Pending)
                    break;
                case btn_completed.textContent:
                    todoStore.setFilter(Filters.Completed)
                    break;
            }
            displayTodo();
        })
    })
    
}

    
