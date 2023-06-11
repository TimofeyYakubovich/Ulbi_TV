import React, { useContext, useState } from 'react';
import {Container, Button, Card, Form} from 'react-bootstrap'
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { login, registration } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '..';

const Auth = observer(() => {
    const {user} = useContext(Context)
    // в зависимости от того по какой ссылке мы находимся будет отрисовываться страница регистрации или авторизации
    // для этого используем хук useLocation из react-router-dom с помощью него можно получить маршрут в строке запроса
    const location = useLocation()
    // console.log(location)
    // после того как пользователь залогинился надо переводить его на страницу магазина
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE // isLogin будет true если маршрут совпадает с LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            let data;
            if(isLogin) {
                // const response = await login()
                // теперь в data будет приходить информация о пользователе декодированная из токена
                data = await login(email, password)
            } else {
                // const response = await registration(email, password)
                data = await registration(email, password)
                // console.log(response)
                // получаем response в теле ответа лежит токен теперь этот токен надо сохранить в локальное хранилище и пользователь будет авторизован
                // так же надо сохронять и информацию о пользователе что бы например на странице пользователя ее отрисоывать
                // для этого устанавливаем модуль npm i jwt-decode
            }
            // после того как запрос прошел в userStore сохроняем данные о пользователе и _isAuth ставим в true
            user.setUser(data)
            user.setIsAuth(true)
            // если запрос прошел успешно делаем редирект на страницу магазина
            navigate(SHOP_ROUTE)
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container 
            className='d-flex justify-content-center align-items-center'
            style={{height: window.innerHeight - 54}} // высоту контейнера получаем от высоты всего браузера - высоту новбара
        >   
            <Card style={{width: 600}} className='p-5'>
                <h2 className='m-auto'>{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className='d-flex flex-column'>
                    {/* Form.Control - инпут */}
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш email...'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите ваш пароль...'
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type='password'
                    />
                    {/* <Row className='d-flex justify-content-between mt-3'> */}
                    <Form className='d-flex justify-content-between'>
                        {isLogin ?
                            <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся!</NavLink>
                            </div>
                        :
                            <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
                            </div>
                        }
                        <Button
                            variant={'outline-success'}
                            onClick={click}
                        >
                            {isLogin ? 'Войти' : 'Регистрация'}
                        </Button>
                    </Form>
                    {/* </Row> */}
                </Form>
            </Card>
        </Container>
    );
});

export default Auth;