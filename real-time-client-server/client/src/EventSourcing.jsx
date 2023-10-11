import React, { useEffect, useState } from 'react';
import axios from 'axios'

const EventSourcing = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')

    useEffect(() => {
        subscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const subscribe = async () => {
        try {
            // создаем объект из класса EventSource в него передаем праметром юрл 
            const eventSource = new EventSource('http://localhost:5000/connect')
            // и у этого объекта есть слушатели можно отследить получение сообщений onmessage подключение onopen и ошибки onerror
            // передаем ему колбек он параметро принимает event этот колбек будет отрабатывать каждый раз когда какое то сообщение будет отправлено
            eventSource.onmessage = function (event) {
            // console.log(event.data) // поле data у event это само сообщение
            // в message парсим то что прилетел в событии из поля event.data
            const message = JSON.parse(event.data)
            // и перезаписываем состояние
            setMessages(prev => [message, ...prev])
        }
        } catch (e) {
            setTimeout(() => {
                subscribe()
            }, 500)
        }
        
    }

    const sendMessage = async () => {
        await axios.post('http://localhost:5000/new-messages', {
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

export default EventSourcing;