// при перехде на страницу треков пропадает навигационное меню что бы не добовлять navbar на все страницы
// используются так называемые лайауты присем для разных страниц они могут быть разные это своего рода обертка над каким то компанентом
// теперь на главной странице <Navbar/> удаляем и весь компанент главной страницы оборачиваем в MainLayout
import React from 'react';
import Navbar from '../components/Navbar';
import { Container } from '@mui/material';
import Player from '../components/Player';
import Head from 'next/head';

interface MainLayoutProps {
    title?: string;
    description?: string;
    keywords?: string;
    children: React.ReactNode;
}

// как пропс принимает children все что поещаем в середину компанента MainLayout будет являться children
const MainLayout: React.FC<MainLayoutProps> = ({children, title, description, keywords}) => { 
    return (
        <>  
            {/* мета теги дя сео оптимизации MainLayout будет пропсаи принимать данные для каждой страницы 
            если title не передан указываем 'Музыкальная площадка'*
            1 из самых важных метатегов <meta name='description'/>
            <meta name='robots'/> отвечает за то как робаты будут индексировать страницу как content можно указать 4 значения
            index: Разрешает роботам индексировать страницу. noindex: Запрещает роботам индексировать страницу. Используется, 
            когда вы не хотите, чтобы страница появлялась в результатах поиска 
            follow: Разрешает роботам следовать по ссылкам на странице. nofollow: Запрещает роботам следовать по ссылкам на странице.
            keywords ключевые слова когда то это был 1 из самых важных метатегов для сео оптимизации
            viewport так как большенство пользователей открываеют сайты с мобильных устройств для робтов каторые индексируют страницу
            важно что бы сайт был даптирован подд мобильные приложения*/}
            <Head>
                <title>{title || 'Музыкальная площадка'}</title>
                <meta name='description' content={'Музыкальная площадка. Здесь каждый может оставить свой трек и стать знаменитым.' + description}/>
                <meta name='robots' content='index follow'/>
                <meta name='keywords' content={keywords || "Музыка, треки, артисты"}/>
                <meta name='viewport' content="width=device-width, initial-scale=1"/>
            </Head>
            <Navbar/>
            {/* все что помещаем в children оборачиваем в конейнер */}
            <Container style={{margin: '90px auto'}}>
                {children}
            </Container>
            <Player/>
        </>
    );
};

export default MainLayout;