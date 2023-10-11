import React, {FC} from 'react';
import { IPost } from '../models/IPost';

interface PostItemProps {
    post: IPost;
    // сами функции будем принимать выше с компанента PostJsonContainer
    remove: (post: IPost) => void;
    updata: (post: IPost) => void;
}

const PostJsonItem: FC<PostItemProps> = ({post, remove, updata}) => {

    const hendleRemove = (event: React.MouseEvent) => {
        event.stopPropagation() // у event вызываем stopPropagation что бы предотвратить всплыте
        remove(post) // затем вызываем функцию remove куда передаем пост
    }

    const hendleUpdate = (event: React.MouseEvent) => {
        const title = prompt() || "" // с помощью функции prompt будем изменять как то заголовок поста
        updata({...post, title}) // затем вызываем функцию updata тудапередаем сам post но у него заменяем title
    }

    return (
        <div>
           <div className='post' onClick={hendleUpdate}>
                {post.id}. {post.title}
                <button onClick={hendleRemove}>Delete</button>
            </div> 
        </div>
    );
};

export default PostJsonItem;