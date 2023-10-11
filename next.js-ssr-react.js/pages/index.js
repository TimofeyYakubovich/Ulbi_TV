// есть утилита для создания приложения на next npx create-next-app но создадим приложение с 0
// npm init -y  npm i next react react-dom

import Link from "next/link";
import A from "../components/A";
import Head from "next/head";
import MainContainer from "../components/MainContainer";

// обезательныым условием папка pages в корне проекта сдесь будут распологаться все страницы в приложении
// так же обезательно должен быть файл index.js
// импорт ректа сдесь не понадобется в next можно обойтись без него

const Index = () => {
    return (
        <>  
            {/* сео оптимизация основная проблема каторую решает SSR 
            что бы добавить меатеги на страницу добаваляем копанент Head в нем тег meta и в нем ключевые слова в keywords*/}

            {/* <Head>
                <meta keywords="ulbi tv, nextjs"></meta>
                <title>Главная страница</title>
            </Head> */}

            <MainContainer keywords={"main page"}>

                {/* навигационная панель для переключения между страницами */}
                {/* но при переходе между страницаи идет обновления страницы в next есть специальный компанент каторый отключает 
                действия браузера поумолчанию <Link> и уже внутрь этого компанента добовляем ссылку и атрибут href добовляем линку*/}

                {/* <div className="navbar"> */}
                    {/* <Link href="/" legacyBehavior>
                        <a className="link">Главная</a>
                    </Link>
                    <Link href="/users" legacyBehavior>
                        <a className="link">Пользователи</a>
                    </Link> */}
                    {/* используем кастомные ссылки */}
                    {/* <A href={'/'} text="Главная"/>
                    <A href={'/users'} text="Пользователи"/> */}
                {/* </div> */}
                
                <h1>Главная страница</h1>
                {/* что бы стилизовать навигационную панель стили писать можно прямо сдесь в тег style добовляем пропс jsx
                пишутся так же как и в css*/}
                {/* <style jsx>
                    {`
                        .navbar {
                            background: orange;
                            padding: 15px;
                        }
                        .link {
                            text-decoration: none;
                            color: white;
                            font-size: 28px;
                            margin: 10px;
                        }
                        
                    `}
                </style> */}
            </MainContainer>
        </>
    );
};

export default Index;

// сделаем еще 2 скрипат в package.json 
// "build" : "next build", делает финальную сборку приложения минифицировать файлы и тд.
// "start": "next start" будет приложения запускать

// "dev": "next dev", запускает приложение в режиме разработки