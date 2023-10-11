// export interface UserState {
//     users: any[];
//     loading: boolean;
//     error: null | string;
// }
// export enum UserActionTypes {
//     FETCH_USERS = 'FETCH_USERS',
//     FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
//     FETCH_USERS_ERROR = 'FETCH_USERS_FETCH_USERS_ERROR',
// }
// interface FetchUsersAction {
//     type: UserActionTypes.FETCH_USERS;
// }
// interface FetchUsersSuccessAction {
//     type: UserActionTypes.FETCH_USERS_SUCCESS;
//     payload: any[]
// }
// interface FetchUsersErrorAction {
//     type: UserActionTypes.FETCH_USERS_ERROR;
//     payload: string;
// }
// export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction




// выносим название типов экшенов в отдельные константы
// const FETCH_USERS = 'FETCH_USERS';
// const FETCH_USERS_SUCCESS = 'FETCH_USERS';
// const FETCH_USERS_ERROR = 'FETCH_USERS';

// в error кроме null может быть и сообщение об ошибке поэтому описываем тип состояния initialState
// если поместить в любое их этих плей значение не соответствующее его типу то TypeScript будет ругаться
export interface UserState {
    users: any[]; // users массив любого типа
    loading: boolean;
    error: null | string; // либо null либо string
}

export enum UserActionTypes {
    FETCH_USERS = 'FETCH_USERS',
    FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS',
    FETCH_USERS_ERROR = 'FETCH_USERS_ERROR',
}
// так как в payload может находится что угодно сделаем интерфейс для каждого экшена
interface FetchUsersAction { // у екшена FetchUsersAction type будет строго FETCH_USERS
    // type: typeof FETCH_USERS; // что бы TypeScript не ругался на константный тип можно использовать оператор typeof он вернет именно тип этой константы
                                 // или создать перечисление enum каторое содержит в себе все типы екшенов UserActionTypes
    type: UserActionTypes.FETCH_USERS;

}                             

interface FetchUsersSuccessAction { 
    // type: FETCH_USERS_SUCCESS;
    type: UserActionTypes.FETCH_USERS_SUCCESS;
    payload: any[]; // когда пользователи подгрузились payload массив любого типа
}

interface FetchUsersErrorAction { // у екшена FetchUsersAction type будет строго FETCH_USERS
    // type: FETCH_USERS;
    type: UserActionTypes.FETCH_USERS_ERROR;
    payload: string; // в случае ошибки payload string
}


// interface UserAction { // интерфейс для екшена
//     type: string; // type обезатеьное условие для любого экшена
//     payload?: any; // ? значит не обезательный any любого типа
// }

// сейчас у нас есть 3 рахных екшена что бы объединить их сделаем одноименный тип UserAction и в нем перечисляем какие типы он может принимать
// так UserAction может принимать 1 из 3 описаных типов
export type UserAction = FetchUsersAction | FetchUsersErrorAction | FetchUsersSuccessAction;