import { createReducer } from "@reduxjs/toolkit";

import {
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} from '../actions';

const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
}

// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroesLoadingStatus = 'idle';
//             state.heroes = action.payload;
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroCreated, (state, action) => {
//             state.heroes.push(action.payload);
//         })
//         .addCase(heroDeleted, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload);
//         })
//         .addDefaultCase(() => {});
        
// })

 

const heroes = createReducer(initialState, {
    [heroesFetching]: state => { // записать в одну строку без {} нельзя потому что будет подразумеваться return
                    state.heroesLoadingStatus = 'loading';
                },
    [heroesFetched]: (state, action) => {
                    state.heroesLoadingStatus = 'idle';
                    state.heroes = action.payload;
                },
    [heroesFetchingError]: state => {state.heroesLoadingStatus = 'error'},
    [heroCreated]: (state, action) => {
                    state.heroes.push(action.payload);
                },
    [heroDeleted]: (state, action) => {
                    state.heroes = state.heroes.filter(item => item.id !== action.payload);
                }
    },
    [],
    state => state
    )



// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 // filteredHeroes: state.activeFilter === 'all' ?
//                 //                 action.payload :
//                 //                 action.payload.filter(item => item.element === state.activeFilter),
//                 heroesLoadingStatus: 'idle'
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HERO_DELETED':
//             // const newHeroList = state.heroes.filter(item => item.id !== action.payload)
//             return {
//                 ...state,
//                 // heroes: newHeroList,
//                 heroes: state.heroes.filter(item => item.id !== action.payload)
//                 // filteredHeroes: state.activeFilter === 'all' ? 
//                 //                 newHeroList : 
//                 //                 newHeroList.filter(item => item.element === state.activeFilter)
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 filtersLoadingStatus: 'error'
//             }
//         case 'HERO_CREATED':
//             // const newCreatedHeroList = [...state.heroes, action.payload]
//             return {
//                 ...state,
//                 // heroes: newCreatedHeroList,
//                 heroes: [...state.heroes, action.payload]
//                 // filteredHeroes: state.activeFilter === 'all' ? 
//                 //                 newCreatedHeroList : 
//                 //                 newCreatedHeroList.filter(item => item.element === state.activeFilter)
//             }
//         default: return state
//     }
// }

export default heroes;

// Redux Toolkit: createReducer() 
// при написании reducer получается много шаблонного кода 
// еще есть проблема в сильно вложенных конструкциях каторы лежат глубоко внутри изменять их надо иммутабельно и это не совсем удобно
// импортируем createReducer
// что бы использовать createReducer понадабятся экшенкриеторы каторые ипортируются в этот редьюсер

// у createReducer есть 2 формы использования, рассмотрим вариант "Builder Callback"

// createReducer требует что бы экшенкриеторы были созданы функцией createAction

// в createReducer 1 аргументом передаем initialState
// 2 аргумент в таком синтаксесе это функция каторая принимает аргумент builder подставляется автоматически
// builder это такой объект каторый позволяет строить reducer при помощи 3 встроенных в него методов

// вызываем объект builder и используем метод .addCase это аналог switch case он принимает в себя 2 аргумента экшенкриетор и функцию по изменению
// стейта каторая автоматически принимает в себя стйет и экшен

// когда используется createReducer то Toolkit автоматически активирует бибилиотеку Immer она упрощает работу с имутабельностью
// тоесть можно писать прямое изменение стейта и Immer будет соблюдать имутабельность state.heroesLoadingStatus = 'loading'
// без разворачиванияя ...state предыдущего стейта
// но если написать через return state.heroesLoadingStatus = 'loading' или state => state.heroesLoadingStatus = 'loading'
// то Immer работать не будет Toolkit будет думать что разработчик сам позоботился об имутабельности

// .addDefaultCase(() => {}); заменяет default: return state в него обычно помещают пустую функцию

// .addMatcher позволяет фильтровать воходящий action


// 2 вариант использования createReducer кароче но он работает только в нативном JS с TypeScript например он работать не будет
// в этом варианте в createReducer 2 аргументом будет не функция а объект ключами каторого будут экшенкриеторы и их свойствами будут
// выполняемые действия
// в таком использовании createReducer есть 3 аргумент массив функций сравнения оставляем пустым
// 4 аргумент функция для действий по умолчанию заменяет default: return state