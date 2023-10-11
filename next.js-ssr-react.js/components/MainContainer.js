// при переходе на страницу пользователя пропадает навигационна панель и нельзя вернуться на главную страницу
// чо бы не дублировать navbar в каждый компанент использую контейнеры своео рода обертка каторая содержит в себе 
// неизменяемые части каждой страницы
// создадим MainContainer
// страницы Index Users User оборачиваем в MainContainer

import Head from "next/head";
import A from "./A";

const MainContainer = ({children, keywords}) => { // пропсами он будет принимать children что бы можно было в этот контейнер добовлять другие компаненты
    return (
        <>  
            {/* что бы отдлеьно для каждой страницы не писать meta title и тд помешщаем Head в MainContainer */}
            <Head>
                <meta keywords={"ulbi tv, nextjs" + keywords}></meta> {/*уникальные ключевые слова для каждой страницы будем доставать из пропсов*/}
                <title>Главная страница</title>
            </Head>

            {/* копируем сюда navbar */}
            <div className="navbar">
                <A href={'/'} text="Главная"/>
                <A href={'/users'} text="Пользователи"/>
            </div>
            <div>
                {children}
            </div>
            <style jsx>
                {`
                    .navbar {
                        background: orange;
                        padding: 15px;
                    }
                    
                `}
            </style>
        </>
    );
};

export default MainContainer;