import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Form, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png'
import { useParams } from 'react-router-dom';
import { fetchOneDevice } from '../http/deviseAPI';


const DevicePage = () => {
    const [device, setDevice] = useState({info: []})
    // const params = useParams();
    // console.log(params) // в лог приходит Object { id: "1" }
    const {id} = useParams();


    useEffect(() => {
        // при открытии страницы каждый раз единажды надо подгржать устрйство
        // для запроса на сервер надо знать id устройтсва для этого используем хук useParams
        fetchOneDevice(id).then(data => setDevice(data))
    }, [])

    // const device = {id: 1, name: "Iphone 12 pro", price: 25000, rating: 5,	img: 'https://www.purposechurch.com/wp-content/uploads/2017/10/fpo400x300.png'}
    // const description = [
    //     {id:1, title: 'Оперативная память', description: '5 гб'},
    //     {id:2, title: 'Камера', description: '12 мп'},
    //     {id:3, title: 'Процессор', description: 'Пентиум 3'},
    //     {id:4, title: 'Кол-во ядер', description: '2'},
    //     {id:5, title: 'Аккумулятор', description: '4000'},
    // ]

    return (
        <Container className='mt-3'>
            {/* что бы колонки не переходили на новую строку оборачиваем их в Row */}
            <Row>
                <Col md={4} className='d-flex flex-column align-items-center'>
                    {/* <Image width={300} height={300} src={device.img}/> */}
                    <Image width={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
                </Col>
                <Col md={4}>
                    <Form className='d-flex flex-column align-items-center'>
                        <h2>{device.name}</h2>
                        <div 
                            className='d-flex justify-content-center align-items-center' 
                            style={{background: `url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize: 'cover', fontSize:64}}
                        >
                            {device.rating}
                        </div>
                    </Form>
                </Col>
                <Col md={4} className='d-flex flex-column align-items-center'>
                    <Card 
                        className='d-flex flex-column align-items-center justify-content-around'
                        style={{width: 300, height: 300, fontSize: 32, border: '5px solid lightgray'}}
                    >
                        <h3>От: {device.price} руб.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className='d-flex flex-column m-3'>
                <h1>Характеристики</h1>
                {device.info.map((info, index) =>
                    <Row key={info.id} style={{background: index % 2 === 0 ? 'lightgray' : 'transparent', padding: 10}}>
                        {info.title}: {info.description}
                    </Row>
                )}
            </Row>
        </Container>
    );
};

export default DevicePage;