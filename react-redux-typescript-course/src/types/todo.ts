export interface TodoState {
    todos: any[];
    loading: boolean;
    error: null | string;
    page: number; // пагинация номер текущей страницы
    limit: number; // количество товаров на одной страницы
}

export enum TodoActionTypes {
    FETCH_TODOS= 'FETCH_TODOS',
    FETCH_TODOS_SUCCESS= 'FETCH_TODOS_SUCCESS',
    FETCH_TODOS_ERROR= 'FETCH_TODOS_ERROR',
    SET_TODO_PAGE = 'SET_TODO_PAGE' // екшен для изменения текущей страницы
}

// интерфейсы для каждого екшена с полями для них 
interface FetchTodoAction {
    type: TodoActionTypes.FETCH_TODOS
}
interface FetchTodoSuccessAction {
    type: TodoActionTypes.FETCH_TODOS_SUCCESS;
    payload: any[];
}
interface FetchTodoErrorAction {
    type: TodoActionTypes.FETCH_TODOS_ERROR;
    payload: string;
}
interface SetTodoPage {
    type: TodoActionTypes.SET_TODO_PAGE;
    payload: number;
}

export type TodoAction = FetchTodoAction | FetchTodoErrorAction | FetchTodoSuccessAction | SetTodoPage