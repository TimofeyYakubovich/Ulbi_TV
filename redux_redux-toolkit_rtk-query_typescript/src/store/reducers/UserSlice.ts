// в редакс редьюсер это просто чистая функция каторая принимает стейт и екшен 
// и в зависимости от екшена как то изменяет стейт и возвращает его в обновленном виде 

import { IUser } from "../../models/IUser"
import {PayloadAction, createSlice} from '@reduxjs/toolkit'
import { fetchUsers } from "./ActionCreators";

// в @reduxjs/toolkit есть так называемые слайсы это обертка на редюсерами каторая добовляет дополнительный функционал и упрощает работу

// редьюсер будет работать с состоянием UserState с полями users: IUser[]; isLoading: boolean; error: string;
interface UserState {
    users: IUser[]; // users типа IUser[]
    isLoading: boolean;
    error: string;
    // count: number;
}

// начальное состояние в данном редьюсере указываем что оно будет типа UserState
const initialState: UserState = {
    users: [],
    isLoading: false,
    error: '',
    // count: 0
}

// создадим сам редьюсер в контексте @reduxjs/toolkit подобные редьюсеры называются слайасами с пмощью функции createSlice
// и принимают объект с опциями
export const userSlice = createSlice({
    name: 'user', // у каждого такова слайса должно быть уникальное называние 
    initialState, // дефолтное значения состояния
    reducers: {   // поле reducers аналогично конструкции switch case тут каждый case идет как отдельный редьюсер(функции) и внутри него определяется
                  // как изменяется состояние
        // increment(state, action: PayloadAction<number>) { // пейлоад екшена сразу можно типизировать PayloadAction<number>
        //     state.count += action.payload; // благодоря Redux Toolkit нарямую бращаемся к state.count и преплюсовываем то что пришло в action.payload
        // }

        // создадим редьюсеры каторые будут изменять стейт когда начинаем подгрузку пользователей когда уже подгрузились и ошибка
        // usersFetching(state) {
        //     state.isLoading = true;
        // },
        // usersFetchingSuccess(state, action: PayloadAction<IUser[]>) {
        //     state.isLoading = false;
        //     state.error = '';
        //     state.users = action.payload
        // },
        // usersFetchingError(state, action: PayloadAction<string>) {
        //     state.isLoading = false;
        //     state.error = action.payload
        // }
    },
    // если использовать функцию createAsyncThunk мы ничего не диспатчили как редакс узнанет какие данные ему куда помещать
    // для этого есть поле внутри слайса extraReducers
    // когда мы ипользуем createAsyncThunk для нас создается уже 3 состояния pending, rejected, fulfilled
    // на подобие тех 3 сценариев каторые мы обабатывали вручную
    // но функционал по присваиванию в стейт значений прописываем сами
    extraReducers: {
        [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => { // fulfilled успешная загрузка
            state.isLoading = false;
            state.error = '';
            state.users = action.payload
        },
        [fetchUsers.pending.type]: (state) => { // pending ожидание
            state.isLoading = true;
        },
        [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => { // rejected произошла ошибка
            state.isLoading = false;
            state.error = action.payload
        },
    }
})

// после создания слайася можно вытащить из него отдельно редьюсер и отдельно екшенкреаторы
export default userSlice.reducer // вытаскиваем reducer и экспортируем его подефолту


// Редакс пропогандирует иммутабельный подход тоесть редьюсер это чистая функция и каждый раз она должна возврощать новое состояние 
// return {...state, field: action.payload} тоесть мы возвращаем новый объект в него разварачиваем старое состояние и изменяем какое то поле
// у этого объекта

// в Redux Toolkit наооборот можно взять и изменить конкретное поле у состояния state.field = action.payload 
// такова поведения можно добиться используя библиотеку Immer js но в Redux Toolkit она идет под капотом

// например когда есть стейт в нем вложен какой то объект и в этом объекте надо изменить какое то поле 
// без Redux Toolkit получается такая конструкция разварачиваем стейт потом развараачиваем объект и только потом изменяем у него поле
// return {
//     ...state,
//     object: {
//     ...state.object,
//     field: action.payload
//     }
// }

// с Redux Toolkit можно напрямую обоатиться к этому объекту и изменить у него нужное свойство