// npm i react-redux redux redux-thunk @types/react-redux next-redux-wrapper
// самый важный сдесь next-redux-wrapper так как при использовании next какая то часть кода генерируется на сервере какая то на клиенте
// и нам нужен один глобальный единый стейт и этот модуль next-redux-wrapper помогает это сделать и можно писать код не заморачиваясь 
// что и где выполняется при этом можно быть уверенным что стейт будет везде 1

import { Context, MakeStore, createWrapper } from "next-redux-wrapper";
import { AnyAction, Store, applyMiddleware, createStore } from "redux";
import { RootState, reducer } from "./reducers";
import thunk, { ThunkDispatch } from "redux-thunk";



// глобальный стор
// create a makeStore function
// так как будем делать асинхронные екшены для запоса на сервер подключаем applyMiddleware(thunk)
const makeStore: MakeStore<Store> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// const makeStore: MakeStore<RootState> = (context: Context) => createStore(reducer, applyMiddleware(thunk));

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootState>>(makeStore, {debug: true});
// export const wrapper = createWrapper<RootState>(makeStore, {debug: true});

// в реакте а бычном приложении оборачиваем корневой компанент в провайдер и прокидывали в него стор
// в Next в качетсве этого корневого компанента выступает компанент в файле с названием _app в папке pages

// специальный тип для dispatch
export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>