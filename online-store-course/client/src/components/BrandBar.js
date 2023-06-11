import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '..';
import { Card, Form, Row } from 'react-bootstrap';

const BrandBar = observer(() => {
    const {device} = useContext(Context)

    return (
        // <Row className='d-flex'>
        <Form style={{'flexWrap': 'wrap'}} className='d-flex'>
            {device.brands.map(brand => 
                <Card 
                    style={{cursor: 'pointer'}}
                    key={brand.id} 
                    className='p-3'
                    onClick={() => device.setSelectedBrand(brand)}
                    // сдесь пропса active будем менять цвет рамки
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}
        </Form>
        // </Row>
    );
});

export default BrandBar;

// flex-wrap: wrap