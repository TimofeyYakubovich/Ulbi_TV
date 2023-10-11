// конфигурация стора 
// создадим корневой редюсер
// поумолчанию всегда использется в Redux функция combineReducers для того что бы объеденить все редьюсеры в 1 
// в Redux Toolkit это делать не обезательно в качестве корневого редьюсера можно использовать просто объект но можно оставить и так

import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './reducers/UserSlice'
import { postAPI, postAPIjson } from "../services/PostService";
import { CurriedGetDefaultMiddleware } from "@reduxjs/toolkit/dist/getDefaultMiddleware";

const rootReducer = combineReducers({
    userReducer,
    //регестрируем редьюсер из ртк как ключ в объект указываем reducerPath путь этого редьюсера как значение сам редьюсер
    [postAPI.reducerPath]: postAPI.reducer,
    [postAPIjson.reducerPath]: postAPIjson.reducer
})

// следующи этапом создадим фнкцию setupStore внутри ее будем кофигурировать редакс хранилище 
// без использования Redux Toolkit для создания стора использовали функцию createStore
// вданном случае используем функцию configureStore из @reduxjs/toolkit опции в нее передаются те же самые devTools, middleware, reducer и тд
// когда используем @reduxjs/toolkit нет нужды подключать инструменты разработчика редакс для отладки и redux thunk middleware так как 
// все это идет из каробки

export const setupStore = () => {
    return configureStore({
        // в качесвте reducer указываем корневой педьюсер rootReducer
        reducer: rootReducer,
        // так же с RTK query над добавить мидлвеер
        // при конфигураци сора есть поле middleware это будет стрелочная функция катрая аргументом принимает так же функцию getDefaultMiddleware
        // с помощью каторой можно получить дефолтные мидлвееры каорые уже подключены к Redux Toolkit поумолчанию там идет redux thunk
        middleware: (getDefaultMiddleware) => 
            // с помощью функции добовляем туда мидлвеер каторый получае из postAPI
            getDefaultMiddleware().concat(postAPI.middleware, postAPIjson.middleware)
    })
}

// далее понадобятся типы с помощью каторых будем взаимодействовать с хранилищем

// тип состояния можно получить из редьюсера или напрямую из самого стора
export type RootState = ReturnType<typeof rootReducer>
// тип самого стора с помощью ReturnType получаем тот тип катрый вернет функция setupStore
export type AppStore = ReturnType<typeof setupStore>
// тип диспатча нашего хранилища
// определив тип диспатча мы не сможем задиспатчить те екшены каорые мы не определили
export type AppDispatch = AppStore['dispatch']