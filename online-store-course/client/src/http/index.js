import axios from 'axios'

// создадим 2 инстанса 1 для обычных запросов каторые не требуют авторизации
// к 2 автоматически authHost будет подставляться и туда будет добовляться токен

const $host = axios.create({
    // юрл на каторый будут отправляться запросы
    baseURL: process.env.REACT_APP_API_URL
})

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

// что бы автоматически подставлять токен к каждлму запросу используем интерцептор это функцию каторая параметром приниает config
const authInterceptor = config => {
    // в config в headers добовляем authorization и указываем токен каторый получаем из localStorage пол ключу 'token'
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`
    return config
}

// для инстанса authHost добовляем интерцептор для запроса он будет отрабатывать перед каждым запросам и подставлять токен в headers.authorization
$authHost.interceptors.request.use(authInterceptor)

export {
    $host,
    $authHost
}