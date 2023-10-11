import React, {useState, useEffect} from 'react';
import { postAPIjson } from '../services/PostService';
import PostJsonItem from './PostJsonItem';
import { IPost } from '../models/IPost';


const PostJsonContainer = () => {
    const [limit, setLimit] = useState<number>(10)
    const [page, setPege] = useState<number>(1)

    const {data: posts, data: comments, error, isLoading, refetch} = postAPIjson.useFetchAllPostsQuery(limit)
    // так как мы описали эндпинт был сгенирировани автоматчески хук useCreatePostMutation в опциях {} к нему можно указывать селектор
    // и получать какие то определенные данные например отфильтрованные по какому то условию
    // этот хук возвращает массив 1 элимент это функция каторую можно взвать для того что бы произошла мутация 
    // 2 элимент объект в катором находятся поля isLoading data error и тд. чо бы обрабатывать ошибку  и индикацию загрузки
    // только при загрузке данных поле называется error и при создании поста так же error поэтому через : надо менять название error: createError
    // что бы не было пересечений и мы могли в одном компаненте обрабатывать разыне запросы
    const [createPost, {error: createError, isLoading: isCreateLoading}] = postAPIjson.useCreatePostMutation()

    // используем автосгенерированые хуки для обновления и удаления 
    const [updataPost, {}] = postAPIjson.useUpdataPostMutation()
    const [deletePost, {}] = postAPIjson.useDeletePostMutation()

    const handleCreate = async () => {
        const title = prompt() // получать название статьи будем с помощью функции prompt каторая вызывает браузерное окно в каторое что то вводят
        await createPost({title, body: title} as IPost) // соответственно в оброботке нажатия вызываем функцию createPost и туда передаем объект
                                                        // с title и body id будет генерировать сервер явно указываем что эо объект типа IPost
    }

    const hendleRemove = (post: IPost) => {
        deletePost(post)
    }

    const hendleUpdate = (post: IPost) => {
        updataPost(post)
    }

    return (
        <div>
            {/* <button onClick={() => refetch()}>refetch</button> */}
            <button onClick={handleCreate}>Add new post</button>
            {isLoading && <h1>Идет загрузка...</h1>}
            {error && <h1>Произошла ошибка...</h1>}
            {posts && posts.map(post => // posts && posts.map(post => если есть посты и они не undefined и не null то тогда итерируемся
                <PostJsonItem remove={hendleRemove} updata={hendleUpdate} key={post.id} post={post}/>
            )}
        </div>
    );
};

export default PostJsonContainer;