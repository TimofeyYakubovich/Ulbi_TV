import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { createType } from '../../http/deviseAPI';

const CreateType = ({show, onHide}) => {
    // show виден компанент или нет
    // onHide функция будет мадальное окно закрывать
    const [value, setValue] = useState('')

    const addType = () => {
        createType({name: value}).then(data => setValue('')) // если запрос прошел успешно value присваиваем ''
        onHide()
    }

    return (
        <Modal show={show} onHide={onHide} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Добавить тип
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Control
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder={"Введите название типа"}
                    />
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='outline-danger' onClick={onHide}>Закрыть</Button>
                <Button variant='outline-success' onClick={addType}>Добавить</Button>
            </Modal.Footer>
        </Modal>
    );
};

export default CreateType;