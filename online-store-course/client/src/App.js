import React, { useContext, useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { observer } from "mobx-react-lite";
import { Context } from ".";
import { check } from "./http/userAPI";
import { Spinner } from "react-bootstrap";
// npm i axios react-router-dom mobx mobx-react-lite
// react=router-dom для посраничной навигации mobx стейт менеджер mobx-react-lite что бы связать mobx с функциональными компанентами реакта
// npm install react-bootstrap bootstrap

const App = observer(() => {
  const {user} = useContext(Context)
  // локальное состояние идет загрузка страниы или нет 
  // подефолту это состояние true на страницу добвяем какую нибудь крутилку затем отправляется запрос на проверку пользователя
  // и после того как вернулся ответ это состояние делаем false и страница загружается
  const [loading, setLoading] = useState(true) 

  // отправляем запрос 1 раз при первом открытии приложения , []
  // токен находиится в локальном хранилище и пользователь авторизован после того как обновится страница запрос улетит на сервер 
  // этот токен проверится и после этого узнаем авторизован пользователь или нет эта опреация не мгновенная запрос на сервер занимает 
  // какое то время
  // изначально переменная _isAuth = false но так как пользователь авторизован запрос проходит успешно _isAuth становится true
  // из за этогопроисходит перерендеренг
  useEffect(() => {
      // вызываем функцию check если она выполнилась успешно делаем setUser(true) и setIsAuth(true) тоесть пользователь залогинился
      check().then(data => {
        user.setUser(true)
        user.setIsAuth(true)
      }).finally(() => setLoading(false)) // loading в false неважно призошла ошибка или нет
  }, [])

  if (loading) { // если loading true возвращаем Spinner из bootstrap
    return <Spinner animation={"grow"}/>
  }

  return (
    <BrowserRouter> {/* что бы навигация по страницам была возможна все приложение оборачиваем в BrowserRouter */}
      <NavBar/>
      <AppRouter/>
    </BrowserRouter>
  );
});

export default App;
