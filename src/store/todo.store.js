import { Todo } from "../todos/models/todo.model";

export const Filters = {
    All: "All",
    Completed: "Completed",
    Pending : "Pending"
};




const state ={
    todos : [
        new Todo("Make front-end module in react js"),
        new Todo("Create Query in sql server for sales made in last 3 days"),
        new Todo("Restore System"),
    ],
    filter : Filters.All
}


const initStore = ( ) => {
    console.log(state);
}
//IMPLEMENTACION DEL LOCALSTORAGE
const loadStorage = () => {
    const  {todo = [], filter = Filters.All} = JSON.parse(localStorage.getItem('state'))
    state.todos = todo;
    state.filter = filter;
}


const saveStateToLocalStorage = () => {
    localStorage.setItem('state',JSON.stringify(state))
}

//funcion para agregar nuevas tareas
/**
 * 
 * @param {String} descripcion 
 */
export const addTodo = (descripcion) => {
    if (!descripcion) {
        throw new Error('Description is necessary');
    }else{
        state.todos.push(new Todo(descripcion))
    }

}


//funcion para eliminar los que esten completos
const deleteTodo = () => {
    state.todos = state.todos.filter(todo => todo.done)
    saveStateToLocalStorage()
}

const deleteComplete  = () => {
    state.todos = state.todos.filter(todo => !todo.done);
    saveStateToLocalStorage();
}


//funcion para cambiar el estado de la tarea
export const toggleTodo = (todoID) => {
    state.todos = state.todos.map( todo => {
        if(todo.id === todoID){
            todo.done = !todo.done
        }
        return todo;
    });
}


//funcion para agregar un nuevo filtro
/**
 * 
 * @param {Filters} newFilter 
 */
const setFilter = (newFilter = Filters.All) => {
    state.filter = newFilter;
    saveStateToLocalStorage()
}

const getCurrentFilter = () => {
    return state.filter;
}

//Funcion para obtener todos los todos con base al filtro seleccionado
export const getTodos = (filter = Filters.All) => {
    switch (filter) {
        case Filters.All:
            return [...state.todos]
            ;
        case Filters.Completed:
            return state.todos.filter(todo => todo.done)
        case Filters.Pending:
            return state.todos.filter(todo => !todo.done)
        default:
            throw new Error(`Option ${filter} is not valid`)
            break;
    }
}



export default{
    initStore,
    loadStorage,
    addTodo,
    deleteTodo,
    deleteComplete,
    toggleTodo,
    setFilter,
    getCurrentFilter,
    getTodos
}