// компанент users этот компанент будет доступен по адресу http://localhost:3000/users
// тоесть наименование файла является частью маршрута
// тут будет список пользователей каторые есть в приложении

// сделаем динмаическую маршрутизацию
import Link from "next/link";
import { useEffect, useState } from "react";
import MainContainer from "../components/MainContainer";

const Users = ({users}) => { // принимает пропсом массив из getStaticProps
        // const [users, setUsers] = useState([
        //     {id: 1, name: 'petya'},
        //     {id: 2, name: 'vasya'},
        // ])

    // запросы на сервер в next

    // как бы это делали в реакт useEffect получили 10 пользователей но в коде страницы попрежнему находятся petya и vasya
    // <ul><li><a href="/users/1">petya</a></li><li><a href="/users/2">vasya</a></li></ul> хотя пофакту на странице уже совсем другие пользователи
    // тоесть серверный рендеринг не произашел и вся махинация с подгрузкой данных с серера произашла уже на клиентской части
    // есть функция getInitialProps каторая пзволяет получать данные но как рекомендуют сами разработчики лучше использовать
    // getStaticProps и getServerSideProps

    // делая запрос из getStaticProps получаем имена пользователей только с сервера тоесть в данной ситуации рендеринг произащел уже на 
    // серверной части

    // useEffect(async () => {
        // const response = await fetch('https://jsonplaceholder.typicode.com/users')
        // const data = await response.json() // приводим ответ к джейсону
        // setUsers(data)
    // }, [])

        
    
    return (
        <MainContainer keywords={"user page"}>
            <h1>Список пользователей</h1>
            <ul>
            {/* допустим мы хотим открыть профиль этих пользователей http://localhost:3000/users/1 и посмотреть тоесть в ссылке должен быть их id
            для каждого пользователя должна быть уникальная ссылка
            с помощью папок можно создавать вложенные маршруты создаем папку users и в ней файл по шаблону в квадратных скобках id [id].js
            потом этот id сможем доставать из URL теперь ссылки кликабельны*/}
                {users.map(user => 
                    // <li key={user.id}>
                    //     {user.name}
                    // </li>
                    <li key={user.id}>
                        <Link href={`/users/${user.id}`} legacyBehavior>
                            <a>{user.name}</a>
                        </Link>
                    </li>
                    
                )}
            </ul>
        </MainContainer>
    );
};

export default Users;

// getStaticProps безательно поитогу должна возвращать пропсы и они попадут в компанент
export async function getStaticProps(context) {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    const users = await response.json() // приводим ответ к джейсону
    return {
        props: {users}, //will be passed to the page component as props
    }
}