// combineReducers объеденяет все редьюсеры приложения
import {combineReducers} from "redux";
import { userReducer } from "./userReduser";
import { todoReduser } from "./todoReduser";


export const rootReducer = combineReducers({
    user: userReducer,
    todo: todoReduser
})

// сделаем собственный хук
// с помощью тайпскриптовского ReturnType получаем тим нашего редьюсера rootReducer
// теперь можем сделать свой хук каторый будет работать уже с типизированным useSelector
export type RootState = ReturnType<typeof rootReducer> 