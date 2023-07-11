// import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
// import ReduxThunk from 'redux-thunk'
// import reducer from '../reducers';
// import heroes from '../reducers/heroes';
import heroes from '../components/heroesList/heroesSlice';
// теперь вместо импорта редьсера из файла heroes импортируем редьюсер из среза heroesSlice
// import filters from '../reducers/filters';
import filters from '../components/heroesFilters/filtersSlice';

const enhancer = (createStore) => (...args) => { 
    // функция enhancer принимает как аргумент createStore и возвращает новую функцию каторая тоже принимает какие то аргументы
    const store = createStore(...args);

    const oldDispatch = store.dispatch; // в переменную oldDispatch ложим оригинальный dispatch из стора
    store.dispatch = (action) => {        // изменяем обычный вызов dispatch
        if(typeof action === 'string') {  // если в dispatch придет акшен как строка
            return oldDispatch({          // то вызывается оригинальный dispatch в переменной oldDispatch и в него передается объект с полем type
                type: action
            })
        }
        return oldDispatch(action);       // если пришла не строка то просто возвращаем вызов oldDispatch с акшеном
    }
    return store;
}

// const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
// const store = createStore(combineReducers({heroes, filters}), 
//     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// сдесь создается store через createStore с одной функцией reducer
// теперрь store будет создаваться из двух функций heroes и filters с помощью функции combineReducers в нее нужно передать объект с функциями

// Lesson 201 Store enhancers уселители стора
// если в dispatch надо передать не объект с поле type а строку или функцию или еще что то

// что бы применить enhancer передаем его вторым аргументом в функцию createStore
// createStore устроена так что если передается 2 аргумент то он является уселителем стора

// const store = createStore(combineReducers({heroes, filters}), enhancer);

// теперь если добавить 3 аргументом настройку для REDUX_DEVTOOLS то работать не будет для этого в редаксе есть специальная функция compose
// она принимает в себя функции в качестве аргументов функции каторые надо скомбинировать
// но надо учитывать только порядок функций сначало усилители потом REDUX_DEVTOOLS

// енхенсеры могут изменять работу стора как угодно просто в этом случае мы меням работу только функции dispatch
// и так будет почти всегда нам не особо интересно менять работу стора
// механизм каторый работает так же но меняет только функцию dispatch называется Middleware

// const store = createStore(
//                     combineReducers({heroes, filters}), 
//                     compose(
//                         enhancer,
//                         window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//                     ));

// export default store;

// Lesson 202 Middleware занимается именно функцией dispatch, enhancers расширяет любую часть стора
// Middleware это функции по добаавлению функционала и изменению работы dispatch что бы они могли принимать не только объекты
// почти никогда не придется создавать их вручную в реакте есть много готовых

const stringMiddleware = (store) => (next) => (action) => {  // последняя функция возвращает уже новый dispatch
    // сдесь как store в первой функции передается не весть стор а только dispatch и getState
    // next это dispatch пишется next потому что вместо него вызывается dispatch из следующего мидлвеера в цепочке мидлвееров
        if(typeof action === 'string') {  // если action пришел как строка 
            return next({             // то возвращаем обычный dispatch с объектом где строка записана в поле type
                type: action
            })
        }
        return next(action);      
}

// самый популярный Middleware redux-thunk

// функия applyMiddleware последовательно вызывает цепочку мидлвееров но REDUX_DEVTOOLS включать в нее нельзя
// applyMiddleware и REDUX_DEVTOOLS надо передавать в compose

// const store = createStore(
//     combineReducers({heroes, filters}),
//     // applyMiddleware(stringMiddleware)
//     compose(applyMiddleware(ReduxThunk, stringMiddleware),
//             window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
//     // compose(
//     //     enhancer,
//     //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
//     );

// export default store;

// Lesson 203 Redux-thunk Middleware
// он позволяет в качетсве действий в dispatch отправлять не объекты а функции
// в этих функциях может быть чо угодно в том числе и асинхронные операции чаще всего из за них и используется Redux-thunk
// устанавливаем npm i redux-thunk --save импортируем import ReduxThunk from 'redux-thunk'

// что бы включить ReduxThunk в работу стора добовляем его в applyMiddleware



// Lesson 203 Redux Toolkit: configureStore()
// Redux Toolkit это просто инструмент для того что бы код писать немного удобнее и лаконичнее он ничего не вносит в логику работы с хранилищем
// а просто дает удобные инструменты для написания кода

// функция createSelector включена в reduxjs/toolkit теперь ее ненадо вытаскивать из reselect
// этот проект создавался с помощю шаблона npx create-react-app my-app --template redux
// приставка --template redux устанавливает заготовку каторая ориентирована на работу с редаксом и там автоматически устанавливается @reduxjs/toolkit
// npx create-react-app my-app --template redux-typescript 
// typescript это тихнология по введению статической типизации в JS

// функция configureStore() предназначена для того что удобно и автоматически комбинировать редьюсеры, подключать Middleware и enhancers
// и подключать REDUX_DEVTOOLS
// импортируем configureStore из @reduxjs/toolkit

const store = configureStore({
    // configureStore приниает в себя объект с настройками
    reducer: {heroes, filters}, // в поле reducer передается объект с редьюсерами пары ключ значение как в combineReducers
    // middleware: [ReduxThunk, stringMiddleware], // middleware включает мидлвееры и принимает массив
    // в @reduxjs/toolkit уже включены самые популярные мидлвееры Redux-thunk Middleware, getDefaultMiddleware, Immutability Middleware, 
    // Serializability Middleware, createListenerMiddleware
    // Serializability Middleware проверяет что в сторе нет данных каторые не должны быть там символы промисы функции и тд.
    // Immutability Middleware служит для обнаружения мутаций каторые могут возникнуть в сторе
    // что бы включить все мидлвееры каторые изначально есть в Toolkit есть команда getDefaultMiddleware она возвращает массив мидлвееров в Toolkit
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(stringMiddleware),
    // в поле middleware будет приходить функция каторая автоматически принимает аргумент getDefaultMiddleware в функции 
    // запускается getDefaultMiddleware() получаем массив встроенных мидлвееров и дальше к этому массиву добовляем наш собственнй мидлвеер
    // .concat(stringMiddleware)
    devTools: process.env.NODE_ENV !== 'production',
    // поле devTools принимает булевое значение но если оставить просто true то в таком случае и когда будет создан продакшен билд то там 
    // devTools тоже будет активен поэто чаще всего прописывают конструкцию каторая будет автоматически вычислять нужен щас devTools или нет
    // process.env.NODE_ENV !== 'production' если режим каторый щас стоит не production то devTools включается 
    // process.env.NODE_ENV это переменная окружения в node.js

    // в configureStore есть еще preloadedState это опциональный параметр задающий начальное состояние хранилища
    // enhancers передается массив
})

export default store;