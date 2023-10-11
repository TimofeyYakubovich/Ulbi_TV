import React from 'react';
import { postAPI } from '../services/PostService';
import PostItem from './PostItem';

const PostContainer2 = () => {
    // оброщпемся к postAPI у него есть ряд полей но самое интересное это авосгенерированые хуки useFetchAllPostsQuery каторые генерируются
    // на основании тех эндпоинтов каторые мы описываем
    // то что возвращает этот хук сразу диструктуризируем нас интересует поле data это тот самый список постов
    // ошибки обрабатываются автоматически и индекация загрузки делается автоатичски
    const {data: posts, error, isLoading} = postAPI.useFetchAllPostsQuery(10) // 1 аргументом этот хук ожидает параметр каторый будет как то 
                                                 // использоваться в запросе у нас таких параметов нет поэтому осталяем пустую строку
    return (
        <div>
            <div className="post__list">
                {isLoading && <h1>Идет загрузка...</h1>}
                {error && <h1>Произошла ошибка...</h1>}
                {posts && posts.map(post => // posts && posts.map(post => если есть посты и они не undefined и не null то тогда итерируемся
                    <PostItem key={post.id} post={post}/>
                )}
            </div>
        </div>
    );
};

export default PostContainer2;