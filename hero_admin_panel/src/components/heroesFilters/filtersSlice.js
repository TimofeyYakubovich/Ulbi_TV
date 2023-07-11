import { createSlice, createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    filtersLoadingStatus: 'idle',
    activeFilter: 'all'
});

// const initialState = {
//     filters: [],
//     filtersLoadingStatus: 'idle',
//     activeFilter: 'all',
// }

export const fetchFilters = createAsyncThunk(
    'heroes/fetchFilters',
    () => {
        const {request} = useHttp(); // вытаскиваем request из собственного хука тогда когда запуститься функция fetchHeroes
        return request("http://localhost:3001/filters")
    }
);

const filtersSlice = createSlice({
    name: 'filters',
    initialState,
    reducers: {
        // filtersFetching: state => {state.filtersLoadingStatus = 'loading'},
        // filtersFetched: (state, action) => {
        //     state.filtersLoadingStatus = 'idle';
        //     state.filters = action.payload;
        // },
        // filtersFetchingError: state => {
        //     state.filtersLoadingStatus = 'error';
        // },
        filtersChanged: (state, action) => {
            state.activeFilter = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFilters.pending, state => {state.filtersLoadingStatus = 'loading'})
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = 'idle';
                // state.filters = action.payload;
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {state.filtersLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

// export const getFilters = selectAll(store.getSate());
// можно было бы попробывать сразу в слайсе создать такую переменную для получения filters и в ней передавать в selectAll(store.getSate())
// и только в слайс импортировать store и не в каждый конкретный файл и уже экспортировать эту getFilters как готовую переменную с filters
// но так будет ошибка так как store формируется из этого слайса и в store сдесь придет undefined так как он еще не создан

export default reducer;
export const {
    filtersFetching,
    filtersFetched,
    filtersFetchingError,
    filtersChanged
} = actions;