import React, { useEffect, useState } from 'react';
import axios from 'axios'

const LongPulling = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    // функция получения сообщений
    useEffect(() => {
        subscribe()
    }, [])

    // функция получения сообщений
    // грубо говоря на получения сообщений мы подписываемся
    const subscribe = async () => {
        try {
            // извлекаем из ответа от сервера данные диструктуризацией
            const {data} = await axios.get('http://localhost:5000/get-messages')
            // далее изменяем состояние дбовляем в него новое сообщение в setMessages передаем колбек в катором возвращаем новый массив 
            // в него добовляем полученное от сервера сообщение data и разворачиваем в него старые сообщения ...prev
            // тоесть 1 элиментом в массив добовляем новое значение
            setMessages(prev => [data, ...prev])
            // получили ответ от сервера и соединение с ним пропало поэтому сразу же отправляем запрос и ожидаем новые сообщения
            // опять оформляем подписку await subscribe()
            await subscribe()
        } catch (e) {
            // в случае если произошла ошибка сделаем таймаут 500 мс и опять оформляем подписку
            // чаще всего в блок catch будем попадать когда время ожидания от сервера истекло
            // тоесть подписка истекла оформляем заново
            setTimeout(() => {
                subscribe()
            }, 500)
        }
    }

    // отправления сообщения на сервер
    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
            // тело запроса
            message: value,
            id: Date.now()
        })
    }

    return (
        <div className='center'>
            <div>
                <div className="form">
                    <input value={value} onChange={e => setValue(e.target.value)} type='text'/>
                    <button onClick={sendMessage}>Отправить</button>
                </div>
                <div className="messages">
                    {messages.map(mess =>
                        <div className="message" key={mess.id}>
                            {mess.message}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LongPulling;