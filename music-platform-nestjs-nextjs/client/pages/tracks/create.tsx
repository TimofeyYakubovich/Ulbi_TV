// страница для создания треков она удет доступна по адресу http://localhost:3000/tracks/create

import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import StapWrapper from '../../components/StapWrapper';
import { Button, Grid, TextField } from '@mui/material';
import FileUpload from '../../components/FileUpload';
import { useInput } from '../../hooks/useInput';
import axios from 'axios';
import { useRouter } from 'next/router';


const Сreate = () => {
    const [activeStep, setActiveStep] = useState(0)
    // состояния будут хранить в себе изображения и аудио
    const [picture, setPicture] = useState(null)
    const [audio, setAudio] = useState(null)
    // для каждого из инпутов создаем по объекту и инициализируем его хуком useInput
    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')

    const router = useRouter()

    const next = () => {
        // в функцию setActiveStep каторая изменяет состояние можно явно передать какое то значение но лучше
        // использовать колбек каторый явно операется на предыдущие состояние
        if (activeStep !== 2) {
        setActiveStep(prev => prev + 1)
        } else { // если мы дошли до последнего шага надо отправлять запрос на сервер
            // используем FormData так как отправляем и файлы
            const formData = new FormData()
            // функцией append уазываем ключ значение и прокидываем в тело запроса
            formData.append('name', name.value)
            formData.append('text', text.value)
            formData.append('artist', artist.value)
            formData.append('picture', picture)
            formData.append('audio', audio)
            // отправляем запрос
            axios.post('http://localhost:5000/tracks', formData)
                .then(resp => router.push('/tracks'))
                .catch(e => console.log(e))
        }
    }

    const back = () => {
        setActiveStep(prev => prev - 1)
    }

    return (
        <div>
            <MainLayout>
                {/* activeStep изменяем и соответственно Stepper в StapWrapper юудет меняться */}
                <StapWrapper activeStep={activeStep}>
                    {/* в зависимостри от того какой сейчас шаг activeStep можно отрисовывать тот или иной контент */}
                    {activeStep === 0 &&
                        <Grid container direction={"column"} style={{padding: 20}}>
                            <TextField
                            // в каждый из инпуов разварачиваем объекты каторые получили с помощью хука useInput
                            // тоесть в каждый инпут попадает соответстввующие value и функция onChange
                                {...name}
                                style={{marginTop: 10}}
                                label={"Название трека"}
                            />
                            <TextField
                                {...artist}
                                style={{marginTop: 10}}
                                label={"Имя исполнителя"}
                            />
                            <TextField
                                {...text}
                                style={{marginTop: 10}}
                                label={"Слова к треку"}
                                multiline
                                rows={3}
                            />
                        </Grid>
                    }
                    {activeStep === 1 &&
                    // на данном шаге загружаем изображение поэтому как accept указываем image/*
                    // функции изминения изображения и аудио переаем как пропсы
                        <FileUpload setFile={setPicture} accept='image/*'>
                            <Button>Загрузите изображение</Button>
                        </FileUpload>
                    }
                    {activeStep === 2 &&
                        <FileUpload setFile={setAudio} accept='audio/*'>
                            <Button>Загрузите аудио</Button>
                        </FileUpload>
                    }
                </StapWrapper>
                <Grid container justifyContent="space-between">
                    {/* на превом шаге отключаем кнопку назад disabled={activeStep === 0} */}
                    <Button disabled={activeStep === 0} onClick={back}>Назад</Button>
                    <Button onClick={next}>Далее</Button>
                </Grid>
            </MainLayout>
        </div>
    );
};

export default Сreate;