import React, { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import { Context } from '..';
import { Pagination } from 'react-bootstrap';

const Pages = observer(() => {
    const {device} = useContext(Context)
    // const pages = [1,2,3,4,5]
    // общее количество страниц = общее количество товаров / на количество товаров на 1 странице Math.ceil округляем в большую сторону
    const pageCount = Math.ceil(device.totalCount / device.limit) 
    const pages = []

    for (let i = 0; i < pageCount; i++) { // пробегаемся циклом по количеству страниц и в массив pages дбовляем количесво страниц
        pages.push(i + 1)                 // как текущий счетчик в цикле + 1 тоесть номер страницы
    }

    return (
        <Pagination className='mt-5'>
            {pages.map(page => 
                <Pagination.Item
                    key={page}
                    active={device.page === page} // если страница из стора = текущая страница о она будет активной
                    onClick={() => device.setPage(page)} // при нажати помещаем текущую страницу в стор
                >
                    {page}
                </Pagination.Item>
            )}
        </Pagination>
    );
});

export default Pages;