import React from 'react';
import {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../store/action-creators/user';
import type {} from 'redux-thunk/extend-redux';
import { useActions } from '../hooks/useActions';

const UserList: React.FC = () => { // React.FC указываем что это функциональный компанент
    // данные из состояния достются хуком useSelector
    // const state = useSelector(state => state.users) // в дефолтном root стейте поле users не существует потому что useSelector с типами не дружит
    // теперь в место обычного useSelector используем useTypedSelector
    const {error, loading, users} = useTypedSelector(state => state.user)
    // const dispatch = useDispatch()
    // теперь const dispatch = useDispatch() уже не нужен вызываем свой хук useActions() и из него можно достать все екшенкриаторы
    const {fetchUsers} = useActions()

    // используем екшенкриатор fetchUsers в хуке useEffect при первом рендере компанента
    useEffect(() => {
        // достаем dispatch хуком useDispatch и в него передаем екшенкриатор fetchUsers
        // dispatch(fetchUsers())
        fetchUsers()
    }, [])

    if (loading) {
        return <h1>Идет загрузка</h1>
    }

    if(error) {
        return <h1>{error}</h1>
    }

    // если пользователи подгрузились и ошибка не возникла то отрисовываем пользователей
    return (
        <div>
            {users.map(user => 
                <div key={user.id}>{user.name}</div>
            )}
        </div>
    );
};

export default UserList;