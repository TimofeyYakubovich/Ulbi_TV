import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png'
// import { useHistory } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/consts';


const DeviceItem = ({device}) => {
    // сделаем устройства кликабельными что бы переходить на страницу детального просмотра
    // используем хук useNavigate с помощью него можно динамически передвигаться по страницам
    // const history = useHistory()
    // console.log(history)
    // теперь и history есть функция push
    const navigate = useNavigate()
    console.log(navigate)

    return (
        // <Col md={3} className='mt-3' onClick={() => history.push(DEVICE_ROUTE + '/' + device.id)}></Col>
        // в onClick вызываем функцию navigate туда передаем путь страницы просмотра отдельного устройства добовляем /:id для запроса на сервер
        <Col md={3} className='mt-3' onClick={() => navigate(DEVICE_ROUTE + '/' + device.id)}>
            <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
                {/* <Image width={150} height={150} src={device.img}/> */}
                <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img}/>
                <div className='text-black-50 mt-1 d-flex justify-content-between align-items-center'>
                    <div>Samsung...</div>
                    <div className='d-flex align-items-center'>
                        <div>{device.rating}</div>
                        <Image width={18} height={18} src={star}/>
                    </div>
                </div>
                <div>{device.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;