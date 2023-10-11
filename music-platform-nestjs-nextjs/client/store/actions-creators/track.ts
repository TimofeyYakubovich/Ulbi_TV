import {Dispatch} from 'react'
import { TrackAction, TrackActionTypes } from '../../types/track'
import axios from 'axios'

export const fetchTrack = () => {
    // для того что бы использовать redux thunk от сюдв надо вернуть фунцкию каторая параметром приниает dispatch
    // и npm i axios
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            // запрос на получение треков
            console.log('fetchTrack')
            const response = await axios.get('http://localhost:5000/tracks?count=20&offset=0')
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR, 
                payload: 'Произошла ошибка при загрузке треков'
            })
        }
    }
}

// екшенкреато отправляет запрос на эндпоинт поиска
export const searchTracks = (query: string) => {
    return async (dispatch: Dispatch<TrackAction>) => {
        try {
            console.log('fetchTrack')
            const response = await axios.get('http://localhost:5000/tracks/search?query=' + query)
            dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
        } catch (e) {
            dispatch({
                type: TrackActionTypes.FETCH_TRACKS_ERROR, 
                payload: 'Произошла ошибка при загрузке треков'
            })
        }
    }
}