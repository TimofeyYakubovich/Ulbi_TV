import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import ListGroup from 'react-bootstrap/ListGroup'

const TypeBar = observer(() => {
    const {device} = useContext(Context)

    return (
        <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item 
                    style={{cursor: 'pointer'}}
                    // active={true}
                    // если id типа элимента итерации совпадает с id элимента на каторый мы нажали сохранили в стор то он будет активен
                    active={type.id === device.selectedType.id} 
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>
    );
});

export default TypeBar;