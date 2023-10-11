// частовстресающийся кейс каторый приходится обрабатывать получение данных с сервера обработка ошибки и загрузки
// получение данных от сервера это асинхрнный процесс поэтому сделаем асинхронный екшенкреатор
// по класике асинхронные екшены создаются с помощью мидлвеера redux thunk но в Redux Toolkit он включон

import axios from "axios";
import { AppDispatch } from "../store";
import { IUser } from "../../models/IUser";
import {userSlice} from "./UserSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";

// что бы этим функционалом (redux thunk) пользоваться мы из екшенкреатора не возвращае сразу екшен в возврощаем другую функцию каторая аргуентом
// принимает dispatch и уже из нее производим асинхронные действия
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//     try {
//         dispatch(userSlice.actions.usersFetching())
//         // с помощью джейнерика <IUser> указываем что мы будем ожидать в поле data у response
//         const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
//         dispatch(userSlice.actions.usersFetchingSuccess(response.data))
//     } catch (e: any) {
//         dispatch(userSlice.actions.usersFetchingError(e.message))
//     }
// }

// обработали 3 сценария подгрузку пользователей когда уже подгрузились и ошибка
// Redux Toolkit позволяет немного упростить обработку этих сценариев
// что использовать redux thunk мы создавали функцию каторая аргуентом принимает dispatch и возврощаем другую функцию

// в Redux Toolkit можно воспользоваться функцией createAsyncThunk каторая сделает это за нас
export const fetchUsers = createAsyncThunk(
    'user/fetchAll', // 1 аргумент название этого асинхронного Thunk
    async (_, thunkAPI) => { // 2 аргумент сам колбек внутри каторого реализовываем какие то действия
        try {
            const response = await axios.get<IUser[]>('https://jsonplaceholder.typicode.com/users')
            return response.data;
        } catch (e) {
            // в блоке catch возвращаем результат вызова функции rejectWithValue каторую получаем у thunkAPI это 2 аргумент этого колбека
            return thunkAPI.rejectWithValue('Не удалось загрузить пользователей')
        }
        // отправляем запрос и возвращаем данные
    }

)