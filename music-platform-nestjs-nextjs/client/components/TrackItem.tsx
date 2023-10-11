import React from 'react';
import { ITrack } from '../types/track';
import { Card, Grid, IconButton } from '@mui/material';
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';

interface TrackItemProps {
    track: ITrack;
    active?: boolean; // пропс каторый будет сообщать о том прогрывается трек или нет
}

const TrackItem: React.FC<TrackItemProps> = ({track, active = false}) => {
    const router = useRouter()
    const {playTrack, pauseTrack, setActiveTrack} = useActions()

    // console.log(track)

    // при первом запуске приложения сразу создается объект audio в компаненте Player и затем после того как мы кликнули на  
    // какой то трек он становиться активным сдесь реализуем эту логику
    const play = (e) => {
        e.stopPropagation() // что бы не перекидывало на страницу детальног просмотра трека
        // когда нажали кнопку плей вызываем setActiveTrack передаем ему track и вызываем playTrack()
        setActiveTrack(track)
        playTrack()
    }

    return (
        // в router.push передаем '/tracks/' + track._id конекретного трека что бы перемещаться на его страницу по id он будет встроен в юрл
        <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
            {/* в IconButton будет кнопка либо PlayArrow либо Pause в зависимсоти от условия active */}
            {/* но при нажатии на кнопку плей или делит так же переедвает на страницу трека что бы такова не было 
            вызываем у евента функию stopPropagation() */}
            {/* <IconButton onClick={e => e.stopPropagation()}> */}
            <IconButton onClick={play}>
                {active
                    ? <Pause/>
                    : <PlayArrow/>
                }
            </IconButton>
            <img width={70} height={70} src={`http://localhost:5000/${track.picture}`}/>
            <Grid container direction="column" style={{width: 200, margin: '0 20px'}}>
                <div>{track.name}</div>
                <div style={{fontSize: 12, color: 'grey'}}>{track.artist}</div>
            </Grid>
            {active && <div>02:42 / 03:22</div>}
            <IconButton onClick={e => e.stopPropagation()} style={{marginLeft: 'auto'}}>
                <Delete/>
            </IconButton>
        </Card>
    );
};

export default TrackItem;