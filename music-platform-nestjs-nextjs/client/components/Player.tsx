import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material';
import { Grid, IconButton } from '@mui/material';
import React, { useEffect } from 'react';

import styles from '../styles/Player.module.scss'
import { ITrack } from '../types/track';
import TrackProgress from './TrackProgress';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useActions } from '../hooks/useActions';

// работа с аудио файлами в браузере происходит с помощью объекта audio нам нужен 1 такой объект на все приложение но не инициализируем его
// сдесь если попробудем его инициализировать let audio = new Audio(); будет ошибка тк как код генерируется на сервере а сервер не знает 
// что такое Audio() это чисто браузерное апи поэтому инициализируем его в хуке useEffect
let audio;

const Player = () => {
    // const active = false;
    const {active, currentTime, duration, pause, volume} = useTypedSelector(state => state.player)
    const {pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack} = useActions()

    // const track: ITrack = {
    //     _id: '1', 
    //     name: 'Трек1', 
    //     artist: 'Исполнитель1', 
    //     text: '', 
    //     listens: 5, 
    //     audio: 'http://localhost:5000/audio/76cfe480-0f7c-455d-88a5-f48a42cbebe4.Король и Шут — Некромант (www.lightaudio.ru).mp3',
    //     picture: 'http://localhost:5000/image/7c2b055e-5595-463b-b63a-e6a9ad866371.03060093601.jpg',
    //     comments: []
    // }

    useEffect(() => {
        if (!audio) { // если аудио на данный момент нет то инициализируем его
            audio = new Audio(); // теперь можем запускать и останавливать проигрывание музыки
            // // но перед этим указать что вообще должны проигрывать как поле src надо уазать ссылку на трек
            // audio.src = track.audio
            // // когда поменяли аудио в глобальном стейте остается менять сам звук у объекта audio для этого у audio перезаписываем поле volume
            // // каторое может варироваться от 0 до 1
            // // audio.volume = 0.3
            // // сделаем что бы при первом запуске приложения громкость устанавливалась на половину
            // // поумолчанию в глобальном стейте volume: 50 и / 100
            // audio.volume = volume / 100

            // // что бы узнать длительность трека делается это с поощью колбека только после того как трек загрузился
            // audio.onloadedmetadata = () => {
            //     // сдесь вызываем функцию setDuration и duration полчаем из audio объекта
            //     // Math.ceil округляет значение
            //     setDuration(Math.ceil(audio.duration))
            // }
            // // так же есть колбек каторый срабаывает на каждое изменение времени тоесть трек проигрывается и этот колбек постоянно вызывается
            // audio.ontimeupdate = () => {
            //     // сдесь перезаписываем текущее время каторое достаем из поля currentTime объекта audio
            //     setCurrentTime(Math.ceil(audio.currentTime))
            // }
        } else {
            // при первом запуске приложения сразу создается объект audio и затем после того как мы кликнули на какой то рек он становиться 
            // активным в компаненте TrackItem реализуем эту логику
            setAudio()
            play()
        }
    }, [active])

    // логику с инициализацией аудио выносим в отдельную функцию setAudio
    const setAudio = () => {
        if (active) { // делаем проерку сущствует ли щас активный трек так как ссылку на сам трек будем доставать из объекта active
            // audio.src = track.audio
            // audio.src = active.audio // достаем трек из глобального стора
            audio.src = `http://localhost:5000/${active.audio}` // достаем трек из глобального стора
            audio.volume = volume / 100
            audio.onloadedmetadata = () => {
                setDuration(Math.ceil(audio.duration))
            }
            audio.ontimeupdate = () => {
                setCurrentTime(Math.ceil(audio.currentTime))
            }
        }
    }

    const play = () => {
        if (pause) { // если на данный момемнт стоит пауза будем трек запускать
            playTrack() // вызываем екшенкреатор playTrack()

            // audio.play() // запускаем проигрывание музыки 

            // Проверяем, разрешено ли воспроизведение браузером
            const playPromise = audio.play();
            playPromise
            .then(() => {
            // Воспроизведение началось успешно
            })
            .catch((error) => {
            // Обработка проблемы с разрешениями или другие ошибки
            console.error('Ошибка при воспроизведении видео:', error);
            });
        } else { // если пауза не стоит будем останавливать
            pauseTrack()
            audio.pause() // останавливаем проигрывание музыки
        }
    }

    // функция изминения громкости параметром принимает евент типа React.ChangeEvent
    const chengeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
        // когда поменяли аудио в глобальном стейте остается менять сам звук у объекта audio для этого у audio перезаписываем поле volume
        // каторое может варироваться от 0 до 1
        // только когда изменяем инпут получаем значение от 0 до 100 а сдесь надо установть занчение от 0 до 1 поэтому / 100
        audio.volume = Number(e.target.value) / 100
        setVolume(Number(e.target.value)) // вызываем екшенкреатор setVolume() и параметром передаем значение из таргета
    }

    // функция для перематывания трека
    const chengeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        audio.currentTime = Number(e.target.value) // в случае audio.currentTime на 100 уже не делим
        setCurrentTime(Number(e.target.value))
    }

    // если трек вообще не выбран
    if (!active) {
        return null
    }

    return (
        <div className={styles.player}>
            <IconButton onClick={play}>
                {pause // d зависимсоти от pause будет перерисовываться кнопка либо Play либо Pause
                    ? <PlayArrow/>
                    : <Pause/>
                }
            </IconButton>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                {/* <div>{track.name}</div> */}
                {/* проверка знак ? говорит о том чо это поле name попытается получить только в том случае если active не равен 0 */}
                <div>{active?.name}</div>   
                {/* <div style={{fontSize: 12, color: 'grey'}}>{track.artist}</div> */}
                <div style={{fontSize: 12, color: 'grey'}}>{active?.artist}</div>
            </Grid>
            {/* сдесь как левое значение передаем currentTime текущие время трека как правое длительность трека */}
            <TrackProgress left={currentTime} right={duration} onChange={chengeCurrentTime}/>
            <VolumeUp style={{marginLeft: 'auto'}}/> {/* иконка VolumeUp */}
            {/* в случае громкости в left передаем volume максимальная громкость 100 */}
            <TrackProgress left={volume} right={100} onChange={chengeVolume}/>
        </div>
    );
};

export default Player;

