import { createAction } from "@reduxjs/toolkit";
import { heroesFetching, heroesFetched, heroesFetchingError } from "../components/heroesList/heroesSlice";
// теперь экшенкриеторы для heroes уже не нужны они импортируются из heroesSlice
import { filtersFetching, filtersFetched, filtersFetchingError } from "../components/heroesFilters/filtersSlice";

export const fetchHeroes = (request) => (dispatch) => {
    // первая функция будет приниамть request функцию запроса на сервер
    // возвращаемая функция автоматически принимает dispatch так как используем ReduxThunk
    dispatch(heroesFetching()); // в dispatch передаем другой экшенкреетор heroesFetching устанавливаем индикатор загрузки
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data))) // когда уже сделали запрос вызываем другой экшенкреетор и в него передаем данные от сервера
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetching = createAction('HEROES_FETCHING'); // так как heroesFetching простой экшенкриетор в createAction просто передаем 
// тип действия

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED'); // даже если не передавть никокой дополнительный heroes все работает
// createAction так устроена если приходит какой нибудь аргумент в экшенкриетор heroesFetched(data) он автоматически передается в поле payload
// но если добавить дополнительные аргументы в вызов экшенкриетора например dispatch(heroesFetched(data, 'fsgfsgsg')) то они не будут никуда 
// передаваться
// 2 аргументом в createAction можно передавать другую функцию каторая будет подготавливать payload

// в Toolkit есть библиотека nanoid() для создания id

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');

// export const heroCreated = (hero) => {
//     return {
//         type: 'HERO_CREATED',
//         payload: hero
//     }
// }

// export const heroCreated = createAction('HERO_CREATED');

// export const heroDeleted = (id) => {
//     return {
//         type: 'HERO_DELETED',
//         payload: id
//     }
// }

// export const heroDeleted = createAction('HERO_DELETED');

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }

// export const filtersFetched = (hero) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: hero
//     }
// }

// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }

// export const activeFilterChanged = (filter) => {
// // export const activeFilterChanged = (filter) => (dispatch) => {
// // теперь когда запускается экшенкриетор activeFilterChanged он будет возвращать функцию каторая в себя принимает dispatch
// // с использованием ReduxThunk dispatch приходит сюда автоматически
// // функция будет запускать setTimeout каторый через 1 секунду будет запускать dispatch изменять активный фильтр
//     // setTimeout(() => {
//     //     dispatch({
//     //         type: 'ACTIVE_FILTER_CHANGED',
//     //         payload: filter
//     //     })
//     // }, 1000)
//     return {
//         type: 'ACTIVE_FILTER_CHANGED',
//         payload: filter
//     }
// }


// Lesson 205 Redux Toolkit: createAction() 

// createAction() и createReducer() испльзуются давльно редко в Toolkit есть функция createSlice() каторая объеденяет 2 этих функционала
// импортруем createAction 
// createAction приниает 2 аргумента тип действия и вспомогательную функцию  