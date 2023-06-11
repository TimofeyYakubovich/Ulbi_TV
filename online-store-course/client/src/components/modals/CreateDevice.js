import React, { useContext, useEffect, useState } from 'react';
import { Button, Dropdown, Form, Modal, Row, Col } from 'react-bootstrap';
import { Context } from '../..';
import { createDevice, fetchBrands, fetchTypes } from '../../http/deviseAPI';
import { observer } from 'mobx-react-lite';
import { json } from 'react-router-dom';

const CreateDevice = observer(({show, onHide}) => {
    const {device} = useContext(Context)

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [file, setFile] = useState(null)
    // const [brand, setBrands] = useState(null) // использовать не будем так как в стор усть 2 состояния с выбраными типам и брендом
    // const [type, setTypes] = useState(null)

    // массив характеристик
    const [info, setInfo] = useState([])

    useEffect(() => {
        fetchTypes().then(data => device.setTypes(data))
        fetchBrands().then(data => device.setBrands(data))
    }, [])

    const addInfo = () => {
        setInfo([...info, {title: '', description: '', number: Date.now()}]) 
        // чтоо бы не паряться с id добавим поле number каторое будем полу чать из времени
        console.log(info)
    }
    const removeInfo = (number) => {
        // по существующему массиву info пробегаемся фильтром и проверяем совпадает ли номер элмента с номером каторый мы передали параметром
        setInfo(info.filter(i => i.number !== number))
    }

    // свйства в ассив добовдяются но title и description для каждого объекта пустые
    // для этого сделам функцию changeInfo key это либо title либо description value - значение каторое будем по этому ключу устанавливать
    // number - номер характеристики по каторой это значение будем изменять
    const changeInfo = (key, value, number) => {
        // мепом проббегаемся по массиву info если номер элимента совпадает с номером элимента итерации 
        // то возвращаем новый объект разварачиваем в него характеристику ...i и по ключу [key] заменяем у него поле value
        // тоесть если ключ был title то мы заменяем на новое значение
        // если номер не совпадает возвращаем объект не измененным
        setInfo(info.map(i => i.number === number ? {...i, [key]: value} : i))
    }

    const selectFile = e => {
        // console.log(e.target.files)
        setFile(e.target.files[0]) // сохроняем файл в состояние
    }

    const addDevice = () => { // отправка запроса на создание девайса
        const formData = new FormData() // создаем объект формдаты
        formData.append('name', name) // у formData вызываем функцию append по ключу создаем 1 ключ 'name' 2 значение
        // значение должно либо строковым либо блоп блоп это набор битов что бы отправдять файл поэтому стоимость сконвертируем в строку
        formData.append('price', `${price}`)
        formData.append('img', file)
        formData.append('brandId', device.selectedBrand.id)
        formData.append('typeId', device.selectedType.id)
        // массив невозможно передать так как либо строка либо блоп массив перегоняем в JSON строку JSON.stringify(info)
        // а на сервере эта JSON строка будет парсится обратно в массив
        formData.append('info', JSON.stringify(info))
        // передаем formData в функнцию createDevice если запрос прошел успешно закрываем модальное окно
        createDevice(formData).then(data => onHide())
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Добавить устройство
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    {/* Dropdown выпадающее меню с помощью него будем выбирать тип и бренд для нового устройства*/}
                    <Dropdown className='mt-3'>
                        {/* если тип выбран оставляем как название кнопки выбраный тип */}
                        <Dropdown.Toggle>{device.selectedType.name || "Выберите тип"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.types.map(type => 
                                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className='mt-3'>
                        <Dropdown.Toggle>{device.selectedBrand.name || "Выберите бренд"}</Dropdown.Toggle>
                        <Dropdown.Menu>
                            {device.brands.map(brand => 
                                <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
                            )}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Form.Control
                        className='mt-3'
                        placeholder='Введите название устройства'
                        value={name}
                        onChange={e => setName(e.target.value)}        
                    />
                    <Form.Control
                        value={price}
                        onChange={e => setPrice(Number(e.target.value))} // сразу приводим к числовому значению
                        className='mt-3'
                        placeholder='Введите стоимость устройства'
                        type='number'
                    />
                    <Form.Control
                        className='mt-3'
                        type='file'
                        onChange={selectFile}
                    />
                    <hr/>
                    <Button variant='outline-dark' onClick={addInfo}>Добавить новое свойство</Button>
                    {info.map(i => 
                        <Row className='mt-2' key={i.number}>
                            <Col md={4}>
                                <Form.Control
                                    value={i.title}
                                    onChange={(e) => changeInfo('title', e.target.value, i.number)}
                                    placeholder='Введите название свойства'
                                />
                            </Col>
                            <Col md={4}>
                                <Form.Control
                                    value={i.description}
                                    onChange={(e) => changeInfo('description', e.target.value, i.number)}
                                    placeholder='Введите описание свойства'
                                />
                            </Col>
                            <Col md={4}>
                                <Button onClick={() => removeInfo(i.number)} variant='outline-danger'>
                                   Удалить
                                </Button>
                            </Col>
                        </Row>
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addDevice}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
});

export default CreateDevice;