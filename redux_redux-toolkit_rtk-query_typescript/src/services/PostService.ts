// расмотрим RTK query
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react'
import { IPost } from '../models/IPost'

// экспортируем константу postAPI и испльзуем функцию createApi
// при вызове этой функции надо передать ряд опций
export const postAPI = createApi({
    reducerPath: 'postAPI', // ключ каорый будет определять текущий сервис

    // в baseQuery необходимо воспользоваться функцией fetchBaseQuery() и в нее так же передать ряд опций самое важное базовый юрл
    // на каторый этот сервис будет отправлять запросы
    baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
    // endpoints это функция каторая возвращает объект в ней описываются все эндпоинты на каторые будем отправляь запросы 
    // и как то изменять состояние
    endpoints: (build) => ({
        // в этой объекте указываем как ключ указываем название метда спомощью каторого будем получать или изменять какие то данные
        // а в значение передаем результат вызова метода query или mutation
        // query это get запрос предназаначен что бы получать какие то данные от сервера
        // mutation это post или put запрос предназаначен для того что бы их изменять 
        fetchAllPosts: build.query<IPost[], number>({ // как джейнерик указываем что хук будет возвращать нам список постов
                                                      // в качестве 2 джейнерика указываем тип аргумента каторый будет ожидать этот хук
            // далее указываем поле query у объекта это должна быть стрелочная функция каторая взвращает объект
            query: (limit: number = 5) => ({ // в данном случае будет делать пагинацию указываем лимит на количество получаемых постов
                // сама эта функция будет принимать аргументы каторые необхдимы для запроса тело запроса параметры юрл 
                // указываем юрд до конкретного эндпоинта будет приплюсовываться к базовому
                url: '/posts',
                params: {
                    _limit: limit // указываем куери параметр каторый будет уходить на сервер
                }
            })
        })
    })
})

export const postAPIjson = createApi({
    reducerPath: 'postAPIjson',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:5000'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({ 
            query: (limit: number = 5, page: number = 2) => ({ 
                url: '/posts',
                params: {
                _limit: limit,
                _page: page
                }
            }),
            providesTags: result => ['Post']
        }),
        createPost: build.mutation<IPost, IPost>({ // эндпоинт каторым будем пост создавать используем mutation
                                                   // как джейнерик указываем тип объекта каторый нам вернется и тип объекта каторый ожидаем аргументом
            query: (post) => ({ // сдесь аргументом принимаем post аргумент каторый хотим сохранить в бд
                url: '/posts',
                method: 'POST', // так как POST запрос указываем метод
                body: post      // как тело запроса указываем сам объект из аргуента
            }),
            invalidatesTags: ['Post']
        }),
        // после отправки post запроса он появился на странцие только после обнавления страницы хотя в бд он появился
        // поумолчанию Redux Toolkit не знает куда надо этот объект добавить для этого необходимо проставить определенные теги
        // в данном случае у нас всего 1 тег tagTypes: ['Post'] в массиве можно указать несколько тегов
        // теперь надо указать что эндпоинт fetchAllPosts работает с тегом Post providesTags: result => ['Post']
        // тоесть может быть несколко эндпоинтов каторые работают с разными данными
        // при получении данных указвыаем что эндпоинт fetchAllPosts обеспечивает дставку данных providesTags: result => ['Post']
        // при создании поста указываем что эти данные становятся неактуальными и соответственно RTK query должен эти данные заново плучить
        updataPost: build.mutation<IPost, IPost>({ // эндпоинт каторым будем пост обновлять используем mutation
            query: (post) => ({
                url: `/posts/${post.id}`, // указываем id поста каторый хотим обновить
                method: 'PUT', 
                body: post      
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, IPost>({ // эндпоинт каторым будем пост удалять используем mutation
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE'    
            }),
            invalidatesTags: ['Post']
        }),
    })
})