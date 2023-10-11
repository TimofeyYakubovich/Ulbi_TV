import React, { useState } from 'react';
import { ITrack } from '../../types/track';
import MainLayout from '../../layouts/MainLayout';
import { Button, Grid, TextField } from '@mui/material';
import { useRouter } from 'next/router';
import { GetServerSideProps } from 'next';
import axios from 'axios';
import { useInput } from '../../hooks/useInput';

const TrackPage = ({serverTrack}) => { // сдесь не будем использвать редакс а обычный getServerSideProps
    const [track, setTrack] = useState<ITrack>(serverTrack)
    const router = useRouter()
    const username = useInput('')
    const text = useInput('')

    const addComment = async () => {
        try {
            const response = await axios.post('http://localhost:5000/tracks/comment', {
                username: username.value,
                text: text.value,
                trackId: track._id
            })
            // если запрос прошел успешно коментарий поещаем в массив коментариев у объкта track
            // в setTrack передаем нвый объект в каторый разварачиваем старый track но перезаписываем пле с комментариями в каторый
            // добовляем вернувшийся от сервера ответ
            setTrack({...track, comments: [...track.comments, response.data]})
        } catch (e) {
            console.log(e)
        } 
    }

    // const track: ITrack = {
    //     _id: '1', 
    //     name: 'Трек1', 
    //     artist: 'Исполнитель1', 
    //     text: '', 
    //     listens: 5, 
    //     audio: 'http://localhost:5000/audio/25c982d3-838a-4fcf-91b1-9fdfeadd31cf.Король и Шут — Некромант (www.lightaudio.ru).mp3',
    //     picture: 'http://localhost:5000/image/35301d32-9112-48e0-979d-5ed1572c4fb6.03060093601.jpg',
    //     comments: []
    // }

    return (
        <MainLayout 
            title={'Музыкальная площадка - ' + track.name + ' - ' + track.artist}
            keywords={'Музыка, артисты, ' + track.name + ', ' + track.artist}
        >
            <Button style={{fontSize: 32}} variant='outlined' onClick={() => router.push('/tracks')}>
                К списку
            </Button>
            <Grid container style={{margin: '20px 0'}}>
                <img src={'http://localhost:5000/' + track.picture} width={200} height={200} />
                <div style={{marginLeft: 30}}>
                    <h1>Название трека - {track.name}</h1>
                    <h1>Исполнитель - {track.artist}</h1>
                    <h1>Прослушиваний - {track.listens}</h1>
                </div>
            </Grid>
            <h1>Слова трека</h1>
            <p>{track.text}</p>
            <h1>Комментарии</h1>
            <Grid container>
                <TextField
                    {...username}
                    label="Ваше имя"
                    fullWidth // что бы растянулся на всю длину
                />
                <TextField
                    {...text}
                    label="Ваш комментарий"
                    fullWidth // что бы растянулся на всю длину
                    multiline // так как коментарий может быть большой чо бы растягивался на несколько строк
                    rows={4}  // количество строк
                />
                <Button onClick={addComment}>Отправить</Button>
            </Grid>
            <div>
                {track.comments.map(comment => 
                    <div>
                        <div>Автор - {comment.username}</div>
                        <div>Комментарий - {comment.text}</div>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};

export default TrackPage;

// дестрктуризацией достаем params с помощью него можно получить id из юрл
export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const response = await axios.get('http://localhost:5000/tracks/' + params.id)
    return {
        props: {
            serverTrack: response.data
        }
    }
}