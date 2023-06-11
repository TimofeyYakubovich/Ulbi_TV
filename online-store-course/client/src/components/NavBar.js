import React, { useContext } from 'react';
import { Context } from '..';
import {Navbar, Nav, Container, Button} from 'react-bootstrap'
import { NavLink } from 'react-router-dom';
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';
// import Nav from 'react-bootstrap'

// что бы панель перерендеревалась в режиме рельног вреени что бы mobx мог отслеживать изменение значений оборачиваем компанент в функцию observer
const NavBar = observer(() => {
    const {user} = useContext(Context)
    const navigate = useNavigate()

    const logOut = () => {
        user.setUser({})
        user.setIsAuth(false)
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
            {/* <Navbar.Brand href="#home">Navbar</Navbar.Brand> */}
            <NavLink style={{color: 'white'}} to={SHOP_ROUTE}>КупиДевайс</NavLink>
            {user.isAuth ? // если ползователь авторизовани будем отбражать 1 блок если нет о 2 блок
                <Nav className="ml-auto" style={{color: 'white'}}>
                    <Button variant={'outline-light'} onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Button>
                    {/* <Button variant={'outline-light'} className="ms-2" onClick={() => navigate(LOGIN_ROUTE)}>Выйти</Button> */}
                    <Button variant={'outline-light'} className="ms-2" onClick={() => logOut()}>Выйти</Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color: 'white'}}>
                    {/* <Button variant={'outline-light'} onClick={() => user.setIsAuth(!user.isAuth)}>Авторизация</Button> */}
                    <Button variant={'outline-light'} onClick={() => navigate(LOGIN_ROUTE)}>Авторизация</Button>
                </Nav>
            }
            </Container>
        </Navbar>
    );
});

export default NavBar;