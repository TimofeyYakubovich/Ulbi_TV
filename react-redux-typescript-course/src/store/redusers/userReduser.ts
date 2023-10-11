// взаимодействие со списком пользоваелей приложения

import {UserAction, UserActionTypes, UserState} from "../../types/user";

const initialState: UserState = { // дефолтное состояние в редьюсере указываем тип : UserState
    users: [],
    loading: false,
    error: null
}

export const userReducer = (state = initialState, action: UserAction): UserState => { // как возвращаемое значение указываем : UserState
    switch (action.type) {
        // case "FETCH_USERS":
        //     return {loading: true, error: null, users: []}
        // case FETCH_USERS:
        //     return {loading: true, error: null, users: []}
        // case FETCH_USERS_SUCCESS:
        //     return {loading: false, error: null, users: action.payload} // если загрузка прошла успешно в users передаем данные каторые будем 
        // case FETCH_USERS_ERROR:                                         // получать с сервера action.payload
        //     return {loading: false, error: action.payload, users: []}

        // в зависимсоти от того в какой тип мы попадаем будет трабатывать тот или иной екшен
        case UserActionTypes.FETCH_USERS:
            return {loading: true, error: null, users: []}
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {loading: false, error: null, users: action.payload}
        case UserActionTypes.FETCH_USERS_ERROR:
            return {loading: false, error: action.payload, users: []}
        default:
            return state
    }
}