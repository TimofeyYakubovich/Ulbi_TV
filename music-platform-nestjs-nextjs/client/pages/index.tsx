import React from 'react';
// npx create-next-app client
// npm i -D typescript @types/react @types/node
// верстать будем фреймворком material ui  npm install @mui/material @emotion/react @emotion/styled
// что бы использовать свг иконки npm install @mui/icons-material
// import Button from '@mui/material/Button';
// import Navbar from '../components/Navbar';
import MainLayout from '../layouts/MainLayout';
const index = () => {
    return (
        <>
            <MainLayout>
                {/* <Navbar/> */}
                <div className='center'>
                    <h1>Добро пожаловать!</h1>
                    <h3>Здесь собраны все лучшие треки!</h3>
                </div>

                <style jsx>
                    {`
                        .center {
                            margin-top: 150px;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                            justify-content: center;
                        }
                    `}
                </style>
            </MainLayout>
            
        </>
    );
};

export default index;