// экшенкреаторы каторые связаны с пользователями

import axios from "axios"
import { UserAction, UserActionTypes } from "../../types/user"
import { Dispatch } from "redux"

// экшенкреатор каторым будем получать данные от сервера

export const fetchUsers = () => { // функция fetchUsers возвращает новую функцию каторая параметром принимает dispatch
    return async (dispatch: Dispatch<UserAction>) => {  // и уже внутри этой функции делаем запрос на сервер
        try {
            // теперь в dispatch надо передать екшен FETCH_USERS каторый loading: сделает true и на сайте появится какая нибудь крутилка
            dispatch({type: UserActionTypes.FETCH_USERS})
            // и axios получаем данные в response из jsonplaceholder
            const response = await axios.get('https://jsonplaceholder.typicode.com/users')
            setTimeout(() => {
            // так как запрос прошел успешно передаем в dispatch FETCH_USERS_SUCCESS и как payload данные каторые получили в теле отета от сервера
                dispatch({type: UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
            }, 500)
        } catch (e) {
            // если возникла ошибка передаем в dispatch FETCH_USERS_ERROR
            dispatch({
                type: UserActionTypes.FETCH_USERS_ERROR, 
                payload: 'Произошла ошибка при загрузке пользователей'
            })
        }
    }
}