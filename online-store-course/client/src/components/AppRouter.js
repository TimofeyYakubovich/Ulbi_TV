import React, { useContext } from 'react';
// import { Switch, Route, Redirect } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router-dom'
import { authRouts, publicRouts } from '../routes';
import { SHOP_ROUTE } from '../utils/consts';
import Shop from '../pages/Shop';
import { Context } from '..';
// в AppRouter будет описана логика навигации по страницам 
// на какие то страницы сможет зайти любой челвек на какие то только авторизованый

const AppRouter = () => {
    // const isAuth = true; // переменная заглушка показывает аворизован пользватель или нет в дальнейшем будем хранить это в store
    const {user} = useContext(Context) // таким образом можно в любом месте приложения получать данные из глобального хронилища

    console.log(user)

    return (
        // возвращаем отсюда копанент Switch он работает указываем несколько маршрутов например страница авторизации регистрации и магазина
        // если ни одни из этих маршрутов не отработал тоесть пользователь ввел какой о некоректный адрес то отработает поседний карый указан 
        // в этом свиче
        // <Switch> 
        //     {/* что бы эти пути были доступны только авторизованым пользователя делаем проверку isAuth && если isAuth будет true тогда этот
        //     код выполнится если false пропустится*/}
        //     {isAuth && authRouts.map(({path, Component}) => // пробегаемся по массиву authRouts мепом делаем диструктуризацию и вытаскиваем 
        //     // из объекта path, Component и для каждого элимента массива отрисовываем Route в катором указываем путь path={path} 
        //     // и компанент component={Component} каторый по этому пути должен отрисовывать
        //     // exact говорит о том чо путь должен точно совпадать в качесве ключа уазываем path так как он должен быть уникальным
        //         <Route key={path} path={path} component={Component} exact/>
        //     )}
        //     {/* для публичынй роутов в любом случае роуты будут созданы*/}
        //     {publicRouts.map(({path, Component}) =>
        //         <Route key={path} path={path} component={Component} exact/>
        //     )}
            // <Redirect to={SHOP_ROUTE}/>
        // </Switch>
        <Routes>
            {user.isAuth && authRouts.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            {/* <Route key={'/'} path='/' element={<Shop/>} exact/> */}
            {publicRouts.map(({path, Component}) =>
                <Route key={path} path={path} element={<Component/>} exact/>
            )}
            <Route path='*' element={<Navigate to={SHOP_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;