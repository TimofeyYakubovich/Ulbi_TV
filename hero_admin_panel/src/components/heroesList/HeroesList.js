import {useHttp} from '../../hooks/http.hook';
import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { createSelector } from 'reselect';
// import { createSelector } from '@reduxjs/toolkit';

// import { heroesFetching, heroesFetched, heroesFetchingError, heroDeleted } from '../../actions';
// теперь экшенекрееторы heroesFetching, heroesFetched, heroesFetchingError уже не нужны они испольхуются в одном fetchHeroes
// import { fetchHeroes, heroDeleted } from '../../actions';
// import { fetchHeroes } from '../../actions';
// import { heroDeleted } from './heroesSlice';
// fetchHeroes остаётся а heroDeleted импортируем из heroesSlice
// import { heroDeleted, fetchHeroes, selectAll } from './heroesSlice';
// теперь fetchHeroes импртируем тоже из heroesSlice
import { heroDeleted, fetchHeroes, filteredHeroesSelector } from './heroesSlice';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    // const someState = useSelector(state => ({
    //     activeFilter: state.filters.activeFilter,
    //     heroes: state.heroes.heroes
    //     // если таким способом доставать стейты из двух разных кусков стейта heroes и filters то этот компанент HeroesList будет 
    //     // перересовываться при каждом изменении потому что в хуке useSelector идет строгое сравнение а новые объекты никогда не равны
    // }))

    // const filteredHeroes = useSelector(state => {
    //     // if (state.activeFilter === 'all') {
    //     if (state.filters.activeFilter === 'all') {
    //         // return state.heroes
    //         console.log('render'); // но в такм случае при постоянном нажатии фильтра все идет перерендер компанента даже если в activeFilter
    //         // остается лежать строка 'all' что бы этого избежать можно использовать бибилиотеку reselect функцию createSelector
    //         // npm install reselect --save
    //         return state.heroes.heroes;
    //     } else {
    //         // return state.heroes.filter(item => item.element === state.activeFilter)
    //         return state.heroes.heroes.filter(item => item.element === state.filters.activeFilter);
    //         // можно обращаться прямо сдесь к каждому файлу отдельно heroes и filters и из них доставать нужные состояния
    //     }
    //     // теперь фильтрация будет проходить на уровне компанента а не в reducer
    //     // в filteredHeroes поподают сразу отфильтрованные данные
    // })

    // const {filteredHeroes, heroesLoadingStatus} = useSelector(state => state);

    // createSelector мемоизирует значения сейта если значения поля стейта каторое проверяется не изменилось то перерендер не будет вызываться
    // const filteredHeroesSelector = createSelector( // в функции CreateSelector вызываются функции катрые возвращают нужные состояния из стейта
    // // как итог получиться в filteredHeroesSelector фун кция селектор
    //     (state) => state.filters.activeFilter,
    //     // (state) => state.heroes.heroes, // такая функция по получению массива героев уже не нужна ее можно заменить на selectAll 
    //     selectAll, // созданную разработчиками редакса selectAll так же возвращает массив entities
    //     // (state) в selectAll придет автоматически как и в (state) => state.filters.activeFilter потому что она вызывается в createSelector 
    //     // createSelector так устроена 1 аргумент из (state) => state.filters.activeFilter будет filter 2 аргумент из selectAll будет heroes
    //     (filter, heroes) => { // аргумент filter результат 1 функции state.filters.activeFilter аргумент heroes результат 2 функции state.heroes.heroes
    //             console.log(heroes);
    //             if (filter === 'all') {
    //                 console.log('render'); 
    //                 return heroes;
    //             } else {
    //                 return heroes.filter(item => item.element === filter);
    //             }
    //     }
    // )  // теперь при нажатии несколько раз фильтра все не идет перерендер компанента

    // если с ростом приложения надо опять где то получить этот массив heroes придется копировать этот код filteredHeroesSelector
    // его можно перенести в heroesSlice и от туда импортировать уже куда угодно 

    const filteredHeroes = useSelector(filteredHeroesSelector); // помещаем функцию filteredHeroesSelector в useSelector

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        // dispatch(heroesFetching());
        // dispatch('HEROES_FETCHING'); // допустим в dispatch надо передать просто строку
        // dispatch(heroesFetching); // теперь с использованием ReduxThunk можно в dispatch передать экшенкриетор без вызыва и все будет работать
        // request("http://localhost:3001/heroes")
        //     .then(data => dispatch(heroesFetched(data)))
        //     .catch(() => dispatch(heroesFetchingError()))
        // теперь с использованием ReduxThunk можно создать один экшенкриетор с получением данных от сервера 
        // теперь вместо всего этого функционала по получению данных от сервера вызываем один экшенкриетор fetchHeroes в катором уже все реализовано
        // dispatch(fetchHeroes(request));
        // сдесь request уже передавать не нужно он импортируеся в slice
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    const onDelete = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, "DELETE")
            .then(data => console.log(data, 'Deleted'))
            .then(dispatch(heroDeleted(id)))
            .catch(err => console.log(err));
            // eslint-disable-next-line
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;