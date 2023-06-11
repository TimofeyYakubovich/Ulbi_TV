// сдесь реаизуем функции авторзации регистрации и проверки токена на валидность
import { $authHost, $host } from "."
import jwt_decode from "jwt-decode"

export const registration = async (email, password) => {
    // const response = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    // return response

    // получаем response в теле ответа лежит токен теперь этот токен надо сохранить в локальное хранилище и пользователь будет авторизован
    // так же надо сохронять и информацию о пользователе что бы например на странице пользователя ее отрисоывать
    // для этого устанавливаем модуль npm i jwt-decode

    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token) // возвращать уже будем результат декодрования токена
}

export const login = async (email, password) => {
    // const response = await $host.post('api/user/login', {email, password})
    // return response

    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

// используем $authHost так как к запросу будем прикреплять токен
// пользователь авторизовался токен сохронился в localStorage и затем каждый раз при обнавлении страницы будет вызываться функция check
// если токен не валидный то пользователь будет разлогиниваться
// если валидный пользователь будет попадать на страницу магазина под своим аккаунтом
export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}