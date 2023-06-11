// сдесь будут описаны все маршруты к конкретным страницам каторые есть в приложении
// сдесь будет 2 массива authRouts список маршрутов только для тех страниц к катором имеет доступ авторизованый пользователь
// publicRouts маршруты на каторые может перейти любой пользователь

import Admin from "./pages/Admin"
import Auth from "./pages/Auth"
import Basket from "./pages/Basket"
import DevicePage from "./pages/DevicePage"
import Shop from "./pages/Shop"
import { ADMIN_ROUTE, BASKET_ROUTE, DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from "./utils/consts"

export const authRouts = [
    {
        // path: '/admin', // ссылка по каорой страница будет отрабатывать 
        path: ADMIN_ROUTE,
        Component: Admin // сама страница
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRouts = [
    { 
        path: SHOP_ROUTE,
        Component: Shop
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth 
        // для регистрации и логина один компанент но в зависимости от маршрута в строке запроса будем выводить либо регистрацию либо авторизацию
    },
    { 
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {
        path: DEVICE_ROUTE + '/:id', // для маршрута страницы просмотра отдельного устройства добовляем /:id что бы делаь по нему запрос на срвер
        Component: DevicePage
    }
]