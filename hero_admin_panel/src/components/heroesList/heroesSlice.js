import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
import {useHttp} from '../../hooks/http.hook';

// lesson 207 Redux Toolkit: createSlice()

// createSlice объеденяет функционал createReducer и createAction
// в резултате работы createSlice получается объект Slice (срез)
// обычно такой функционал помещают в вайлы с назаванием что тоSlice
// в этом случае такой функционал помещаем в вайл heroesSlice и помещаем к компаненту каторый будет его использовать

// createSlice принимает в себя 4 аргумента для настройки

// name - имя среза пространство имен создаваемых действий именно экшенов
// в том числе название среза нужно для того что бы в стейте создавалось свойство state.heroes в этом случае
// initialState - начальное состояние редьюсера
// reducers - объект с обработчиками
// extraReducers объект каторый содержит редьюсеры другова среза может понадобиться в случае необходимости обновления объекта отосящегося к другому
// срезу допустим если бы что то над был поменять в фильтрах

// когда createSlice закончит работу получаем объект с 3 полями имя среза, reducer, actions

// createSlice объеденяет создание редьюсеров, экшенкриееторов, возвращает имя среза в одном файле но принцип работы редакса не меняется 

// в reducers должен лежать объект с редьюсерами тоесть свойства экшенкриеторы внутри каторых лежит функция принимающая аргументами стейт и экшен
// главно придерживаться правила названия этих экшенов 
// что бы создавать какие то действия внутри reducers сначало прописывается пространство имен heroes и дальше действие каторое будет выполняться
// Fetching тоесть heroesFetching: и дальше функция каторая изменяет стейт
// так createSlice фрмирует экшенкриетор heroesFetching и то действие каторое изменяет стейт
// createSlice так же использует библиотеку Immer

const heroesAdapter = createEntityAdapter()

// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle'
// }

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});
console.log(initialState);

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    () => {
        const {request} = useHttp(); // вытаскиваем request из собственного хука тогда когда запуститься функция fetchHeroes
        return request("http://localhost:3001/heroes")
    }
);

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        // heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        // heroesFetched: (state, action) => {
        //     state.heroesLoadingStatus = 'idle';
        //     state.heroes = action.payload;
        // },
        // heroesFetchingError: state => {state.heroesLoadingStatus = 'error'},
        heroCreated: (state, action) => {
                    // state.heroes.push(action.payload);
                    heroesAdapter.addOne(state, action.payload); // addOne: принимает одну сущность и добавляет ее, если ее еще нет 
                },
        heroDeleted: (state, action) => {
                    // state.heroes = state.heroes.filter(item => item.id !== action.payload);
                    heroesAdapter.removeOne(state, action.payload);
                }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
            .addCase(fetchHeroes.fulfilled, (state, action) => {
                state.heroesLoadingStatus = 'idle';
                // state.heroes = action.payload;
                heroesAdapter.setAll(state, action.payload); // setAll заменяет все что было изночально на то что пришло от сервера 
            })
            .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
            .addDefaultCase(() => {})
    }
})

// когда createSlice закончит работу получаем объект с 3 полями имя среза name: 'heroes', reducer, actions
// что бы использовать heroesSlice диструктурируем объект каторый получается в результате работы функции createSlice

const {actions, reducer} = heroesSlice;

export default reducer; // экспортируем по умолчанию редьюсер

// export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes); // селекторы сразу привязываем к heroes
const {selectAll} = heroesAdapter.getSelectors(state => state.heroes); // так как selectAll используется уже только в этом файле экспортировать
// его уже не надо

export const filteredHeroesSelector = createSelector( // экспортируем уже готовый селектор каторый паом будет помещаться в useSelector
        (state) => state.filters.activeFilter,
        selectAll,
        (filter, heroes) => {
                if (filter === 'all') {
                    console.log('render'); 
                    return heroes;
                } else {
                    return heroes.filter(item => item.element === filter);
                }
        }
    )

export const { // сгенерированые экшенкриеторы диструктурируем из объекта actions экспортируем иминованым экспортом
    heroesFetching,
    heroesFetched,
    heroesFetchingError,
    heroCreated,
    heroDeleted
} = actions;

// теперь фаил heroes.js не нужен его функциоанл реализован сдесь

// еще есть особенность createSlice когда нужно предварительно сделать что то с данными

// если надо предварительно сгенерировать какой то payload то когда создается экшен в него помещается не функция а объект внутри объекта 2 поля
// 1 поле reducer то что надо сделать со стейтом
// 2 поле prepare в катром функция каторая получает какой то аргумент из вне при вызове экшенкриетора text и эта функция возвращает объект со 
// свойством payload

// import { createSlice, nanoid } from '@reduxjs/toolkit'
// import type { PayloadAction } from '@reduxjs/toolkit'

// interface Item {
//   id: string
//   text: string
// }

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState: [] as Item[],
//   reducers: {
//     addTodo: {
//       reducer: (state, action: PayloadAction<Item>) => {
//         state.push(action.payload)
//       },
//       prepare: (text: string) => {
//         const id = nanoid()
//         return { payload: { id, text } }
//       },
//     },
//   },
// })

// extraReducers используется так же в 2 видах как и функция createReducer
// экшены импортируются из других срезов



// Lesson 208 Redux Toolkit: createAsyncThunk()

// createAsyncThunk() позволяет создавать стандартные Redux-thunk экшенкриетор с дополнительными свойствами для работы с промисами

// создадим внутри этого слайса такой же функционал как экшенкриетор fetchHeroes
// импортируем createAsyncThunk и хук useHttp 
// вобще можно было бы просто перенести сюда fetchHeroes и подвязать к ней нужные экшенкриеторы это будет рабочий вариант но не совсем красивый

// создадим переменную fetchHeroes в нее помещаем результат работы createAsyncThunk (pending fulfilled rejected)
// 1 аргумент тип действия в формате 'имя среза/тип действия'
// 2 аргумент функция payloadCreator каторая должна вернуть промис асинхронный код 
// но в эту функцию можно прописать и синхронный код но в таком случае надо будет вручную вернуть ошибку ели что то пошло не так 
// эта функция так же принимает в себя 2 арнгумента 
// 1 аргумент это то что приходит при диспатче этого действия например id или как щас request
// 2 аргумент это API самого Thunk thunkAPI каторый можно использовать для своих каких то нужд тоесть получать доступ к dispatch getState 
// и много еще к чему редко используется
// в этом случае эта функция будет вызываться просто без аргументов они тут не нужны 
// так как этф функция должна вернуть промис оставляем return request("http://localhost:3001/heroes") возвращаем рельтат работы этого запроса
// тут можно использовать async await но они используются в собственном хуке за счет этого в результате request получаем промис response.json()
// каторый где то уже можно обрабатывать 

// createAsyncThunk возвращает 3 экшенкриетора pending fulfilled rejected каторые записываются в переменную fetchHeroes
// pending когда запрос или что то асинхронное только формируется
// fulfilled когда запрос или что то асинхронное выполнилась успешно данные каторые получены от сервера так же перейдут в action.payload
// rejected если произошла ошибка
// так как они не созданы внутри createSlice они не обрабатываются 
// внутри reducers они как бы сторонние поэтому они записываются в extraReducers каторый принмает аргумент builder каторый содержит методы 
// addCase addDefaultCase addMatcher как функция createReducer 
// и уже в extraReducers обрабатываем fetchHeroes.pending fetchHeroes.fulfilled fetchHeroes.rejected

// теперь экшенкриеторы heroesFetching heroesFetched heroesFetchingError в reducers уже не нужны их заменяет fetchHeroes

// сейчас выдает ошибку загрузки персонажей но при этом в девтулзе выполняется heroes/fetchHeroes/pending и сразу heroes/fetchHeroes/rejected
// это происходит потому что из useHttp возвращаем функцию обернутую в useCallback и мемоизироанная функция внутри createAsyncThunk работать
// не будет




// Lesson 209 Redux Toolkit: createEntityAdapter()
// это функция каторя возвращает объект адаптер с готовыми меодами колбеками мемоизироваными селекторами и тд. большая чась методов это
// CRUD операции (создание, чтение, модификация, удаление данных)

// действия в heroCreated heroDeleted можно заменить на готовые команды каторые дает createEntityAdapter
// createEntityAdapter возвращает обект у которго есть массив с id ids: [] и объект с различными сущностями каторые будут соответствовать этим id
// entities: {}
// импортируем createEntityAdapter

// создадим переменную heroesAdapter катороя будет включать в себя этот адаптер

// обычно этот адаптер передается в качестве начального значения при создании слайса
// созадем переменную initialState и в ней в heroesAdapter обращаемся к методу getInitialState таким образом генерируется начальное состояние
// на основании адаптера в консоль initialState выдает Object { ids: [], entities: {} }
// что бы добовлять дополнительные свойства в это состояние в getInitialState передаем объект с нужными свойствами heroesLoadingStatus: 'idle'
// массив с героями будет хрониться в entities: {}

// при своем создании адаптер омжет принять в себя объект с колбеками selectId: sortComparer: 2 эти функции уже встроены в createEntityAdapter
// и работают они по своему стандарту например selectId: (book) => book.bookId если надо получить какой то id то структутра проекта должна быть
// такой что путь к id должен быть book.bookId тогда это команда будет правильно отрабатывать сейчас в этом проекте в джейсон файле так и есть 
// но иногда id лежат в каком то отдельном свойстве и сдесь в этом объекте при создании createEntityAdapter можно переназначить эту функцию 
// тоже самое и с sortComparer:

// теперь когда адпатер создан heroesAdapter мы его поместили в качестве начального состояния можно использовать готоые методы 

// CRUD Functions:
// addOne: принимает одну сущность и добавляет ее, если ее еще нет.
// addMany: принимает массив сущностей или объект в форме Record<EntityId, T> и добавляет их, если они еще не представлены.
// setOne: принимает один объект и добавляет или заменяет его
// setMany: принимает массив сущностей или объект в форме Record<EntityId, T> и добавляет или заменяет их.
// setAll: принимает массив сущностей или объект в форме Record<EntityId, T> и заменяет все существующие сущности значениями в массиве.
// removeOne: принимает одно значение идентификатора объекта и удаляет объект с этим идентификатором, если он существует.
// removeMany: принимает массив значений идентификаторов объектов и удаляет каждый объект с этими идентификаторами, если они существуют.
// removeAll: удаляет все сущности из объекта состояния сущности.
// updateOne: принимает «объект обновления», содержащий идентификатор объекта, и объект, содержащий одно или несколько новых значений поля 
// для обновления внутри поля изменений, и выполняет неглубокое обновление соответствующего объекта.
// updateMany: принимает массив объектов обновления и выполняет неглубокие обновления для всех соответствующих сущностей.
// upsertOne: принимает один объект. Если объект с таким идентификатором существует, он выполнит неглубокое обновление, и указанные поля 
// будут объединены с существующим объектом, при этом любые совпадающие поля перезапишут существующие значения. Если сущность не существует, 
// она будет добавлена.
// upsertMany: ринимает массив сущностей или объект в форме Record<EntityId, T>, который будет неглубоко обновлен.

// адаптер позволяет сделать нормализацию данных привидение всех даных к одному формату и при этом избовляемся от дублей

// когда используются эти команды в них передаются 2 аргумента глобальный стейт и сами данные heroesAdapter.setAll(state, action.payload);


// теперь герои от сервера приходят в объект entities и перебирать объект как массив уже нельзя можно было бы перевести объект в массив 
// но можно испольховать функции адаптера каторые получают кусочки из стора функции сселекторы

// Selector Functions
// selectIds: возвращает массив state.ids.
// selectEntities: возвращает таблицу поиска state.entities.
// selectAll: сопоставляется с массивом state.ids и возвращает массив сущностей в том же порядке.
// selectTotal: возвращает общее количество сущностей, хранящихся в этом состоянии.
// selectById: учитывая состояние и идентификатор объекта, возвращает объект с этим идентификатором или undefined.

// что бы применить какой то селектор надо сначало применить функцию getSelectors() эта функция вытаскивает селекторы из адаптера
// есть 2 способа приминения getSelectors()

// const store = configureStore({
//     reducer: {
//       books: booksReducer,
//     },
//   })
     
//   1 вариант
//   const simpleSelectors = booksAdapter.getSelectors() // сдесь на адапторе booksAdapter запускаем getSelectors() и плучаем объект simpleSelectors
//   с слелекторами
//   2 вариант 
//   const globalizedSelectors = booksAdapter.getSelectors((state) => state.books) в getSelectors передаем функцию каторая сразу будет получать
//   какой то кусок стейта или срез
  
//   1 вариант
//   // Need to manually pass the correct entity state object in to this selector
//   const bookIds = simpleSelectors.selectIds(store.getState().books) // используем метод selectIds и объекта simpleSelectors
//   но в таком варианте нет привязки к какому о кусочку стейта поэетому в него передается обращение к стору получение стейта .getState 
//   и с каким срезом будет работать эта команда .books
  
//   2 вариант 
//   // This selector already knows how to find the books entity state
//   const allBooks = globalizedSelectors.selectAll(store.getState()) тут уже не надо указывать из какова среза получать данные

// экспортируем команды каторые нам понадобятся в HeroesList что бы переводить объект в массив 
// export const {selectAll} = heroesAdapter.getSelectors(state => state.heroes); селекторы сразу привязываем к heroes