import todoStore, { Filters } from "../../../store/todo.store";

let element;


export const renderPendient = (elementId) => {
    element = document.querySelector(elementId);

    if (!element) {
        throw new Error(`Element ${elementId} is not found`)
    }

    element.innerHTML = todoStore.getTodos(Filters.Pending).length;
}