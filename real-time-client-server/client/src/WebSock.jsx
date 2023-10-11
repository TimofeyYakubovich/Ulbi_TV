import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios'

const WebSock = () => {
    const [messages, setMessages] = useState([])
    const [value, setValue] = useState('')
    // состояние каторое будет отображать подключены мы к серверу или нет
    const [connected, setConnected] = useState(false)
    const [username, setUsername] = useState('')

    // сдесь будем устанавливать соединение по вебсокет протоколу
    // этот вебсокет надо будет где то хранить и что бы от рендера к рендеру он не пропадал с помощью хука useRef создаем референс
    const socket = useRef()

    function connect() {
    // в useEffect прописали логику пдключения и сразу подключение происходит меняется форма поэтому всю логику пдключения переносим в 
    // функцию connect и вызываем ее при нажатии кнопкии Войти
    // useEffect(() => { 
        // в поле current будеем создавать новый объект сокета параметром в конструктор передаем адрес сервера
        // но протокол уже не http в ws
        socket.current = new WebSocket('ws://localhost:5000')
        // теперь можем на этот сокет повесить несколько слушателей
        // слушатель onopen отработает в момент подключения
        socket.current.onopen = () => {
            // после того как подключение установилось меняем состояние на true
            setConnected(true);
            // в момент когда мы подключились сразу будем отправлять сообщение создаем объект с этим сообщением
            const message = {
                event: 'connection', // event для конструкции switch case
                username,
                id: Date.now()
            }
            // и отправляем это сообщение на сервер функцией send перегоняем его в строку
            socket.current.send(JSON.stringify(message))
            // console.log('Подключение установлено')
        }
        // слушатель onmessage отработает когда плучаем какое то сообщение параметром колбек принимает event
        socket.current.onmessage = (event) => {
            // случай когда сообщение получили у event есть поле data весь обмен собщениями поисходит в строковом формате поэтому data
            // парсим в сообщение как объект
            const message = JSON.parse(event.data)
            // затем добовляем его в состояние
            setMessages(prev => [message, ...prev])
        }
        // слушатель onclose отработает когда подключение закрылось
        socket.current.onclose = () => {
            console.log('socket закрыт')
        }
        // слушатель onerror отработает когда произошла ошибка
        socket.current.onerror = () => {
            console.log('socket произошла ошибка')
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    }
    

    const sendMessage = async () => {
       // отправку сообщений уже делаем через ws
       const message = {
        username,
        message: value, // message получаем из value из input
        id: Date.now(),
        event: 'message'
       }
       // и отправляем сообщение на сервер
       socket.current.send(JSON.stringify(message))
       // и очищаем инпут
       setValue('')
    }

    // если подключение не установлено то будем возвращать другую разметку
    if(!connected) {
        return (
            <div className="center">
                <div className="form">
                    {/* инпут для имени пользователя */}
                    <input 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        type='text' 
                        placeholder='Введите ваше имя'/>
                    <button onClick={connect}>Войти</button>
                </div>
            </div>
        )
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
                        <div key={mess.id}>
                            {/* если mess.event === 'connection' то сообщение будет отображаться одним способом если message то другим */}
                            {mess.event === 'connection'
                                ? <div className='connection_message'>Пользователь {mess.username} подключился</div>
                                : <div className='message'>{mess.username}. {mess.message}</div>
                            }
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default WebSock;