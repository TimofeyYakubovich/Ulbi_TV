// в next навигация по страницам осуществляется по названием фалов в папке pages
// в папке pages создадим папку tracks и в ней файл index.tsx он будет доступен по маршруту как и название папки
import React, { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { Card, Grid, Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { ITrack } from '../../types/track';
import TrackList from '../../components/TrackList';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useActions } from '../../hooks/useActions';
import { NextThunkDispatch, wrapper } from '../../store';
import { fetchTrack, searchTracks } from '../../store/actions-creators/track';
import { useDispatch } from 'react-redux';
 
 const index = () => {
    const router = useRouter()

    const {tracks, error} = useTypedSelector(state => state.track)

    const [query, setQuery] = useState<string>('')
    const [timer, setTimer] = useState(null)
    // получаем dispatch с помощью хука useDispatch() приводим его к типу NextThunkDispatch так как с Next есть трудности с использованием 
    // асинхронных екшенов
    const dispatch = useDispatch() as NextThunkDispatch

    const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
        // что бы при каждом изенении инпута не улитал запрос на сервер сделаем такую логику что бы пока пользователь что то в инпут вводит
        // запросы не уходят но как только он остановлся сразу отпраляем запрос
        // сделаем состояние timer как null
        // далее делаем проверку есть ли что то внутри timer сначала он будет пустым и эта проверка не отработает
        // если попали в этот блок if вызываем clearTimeout(timer) и очищаем его
        if(timer) {
            clearTimeout(timer)
        }
        // затем полсе проаерка задаем новый setTimeout и внутри него взываем функцию поиска он будет вызываться каждые 500 милисекунд
        // смысл в том что пока пользователь что то вводит этот Timeout очищается и задается по новой каждый раз
        // но на момент кога пользователь остановился этот Timeout отрабатывает и через 500 милисекунд отправляется запрос
        setTimer(
            setTimeout(async () => {
                // в dispatch прокидываем екшенкреатор и параметром передаем значение из инпута 
                await dispatch(await searchTracks(e.target.value))
            }, 500)
        )
    }

    // const tracks: ITrack[] = [ // список треков : ITrack указваем что элименты в нем типа ITrack
    //     {
    //         _id: '1', 
    //         name: 'Трек1', 
    //         artist: 'Исполнитель1', 
    //         text: '', 
    //         listens: 5, 
    //         audio: 'http://localhost:5000/audio/25c982d3-838a-4fcf-91b1-9fdfeadd31cf.Король и Шут — Некромант (www.lightaudio.ru).mp3',
    //         picture: 'http://localhost:5000/image/35301d32-9112-48e0-979d-5ed1572c4fb6.03060093601.jpg',
    //         comments: []
    //     },
    //     {
    //         _id: '2', 
    //         name: 'Трек2', 
    //         artist: 'Исполнитель2', 
    //         text: '', 
    //         listens: 5, 
    //         audio: 'http://localhost:5000/audio/25c982d3-838a-4fcf-91b1-9fdfeadd31cf.Король и Шут — Некромант (www.lightaudio.ru).mp3',
    //         picture: 'http://localhost:5000/image/35301d32-9112-48e0-979d-5ed1572c4fb6.03060093601.jpg',
    //         comments: []
    //     },
    //     {
    //         _id: '3', 
    //         name: 'Трек3', 
    //         artist: 'Исполнитель3', 
    //         text: '', 
    //         listens: 5, 
    //         audio: 'http://localhost:5000/audio/25c982d3-838a-4fcf-91b1-9fdfeadd31cf.Король и Шут — Некромант (www.lightaudio.ru).mp3',
    //         picture: 'http://localhost:5000/image/35301d32-9112-48e0-979d-5ed1572c4fb6.03060093601.jpg',
    //         comments: []
    //     },
    // ]

    // console.log(tracks)

    if (error) {
        return <MainLayout><h1>{error}</h1></MainLayout>
    }

    return (
        <MainLayout title={'Список треков - Музыкальная площадка'}>
            {/* d компанент Grid прокидываем пропс container сообщая о том что это будет флекс кнтейнер */}
            <Grid container justifyContent='center'>
                <Card style={{width: '900px'}}>
                    {/* оборачиваем в Box что бы удобным способом задавать мерджены и педенги */}
                    <Box p={3}>
                        <Grid container justifyContent='space-between'>
                            <h1>Список треков</h1>
                            <Button onClick={() => router.push('/tracks/create')}>Загрузить</Button>
                        </Grid>
                    </Box>
                    <TextField
                        fullWidth
                        value={query}
                        onChange={search}
                    />
                    <TrackList tracks={tracks}/>
                </Card>
            </Grid>
        </MainLayout>
    );
 };
 
 export default index;

 // функция Next для отправки запроса
 // но в случае использования некста вместе с редакс надо использваь wrapper каторый создавали в глобальном сторе и у него уже вызывать функцию
 // getServerSideProps она принмает колбек и он принимает context делаем диструктуризацию и достаем store из context
 export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
    // создае новый объект диспатча
    // dispatch достаем из store но преобразовываем его к типу NextThunkDispath
    console.log('getServerSideProps')
    const dispatch = store.dispatch as NextThunkDispatch
    await dispatch(await fetchTrack())
    // return {
    //     props: {},
    // };
 }) 

// export const getServerSideProps = wrapper.getServerSideProps(async ({store}) => {
//     const dispatch = store.dispatch as NextThunkDispatch
//     await dispatch(await fetchTrack())
// })