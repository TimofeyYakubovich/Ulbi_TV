
import { ITrack } from "./track";


export interface PlayerState {
    active: null | ITrack // поле active = либо null либо ITrack тоесть текущий трек каторый проигрывается
    volume: number; // громкость
    duration: number; // длительность
    currentTime: number; // текущий отрезок вреени на катором проигрывается трек
    pause: boolean;
}

// перечисление в катором будут все екшены
export enum PlayerActionType {
    PlAY = "PlAY",
    PAUSE = "PAUSE",
    SET_ACTIVE = "SET_ACTIVE", // функция будет устанавливать активный трек
    SET_DURATION = "SET_DURATION", // функция будет устанавливать длительность трека
    SET_CURRENT_TIME = "SET_CURRENT_TIME", // будет устанавливать текущие время
    SET_VOLUME = "SET_VOLUME" // будет изменять громкость
}

// описание типа каждого конкретного екшена с данными payload обзательное поле для екшена type
interface PlayAction {
    type: PlayerActionType.PlAY
}

interface PauseAction {
    type: PlayerActionType.PAUSE
}

// в случае когда станавливае активный трек или его длительность там так же появяютс данные payload каторый надо прокинуть в екшен
interface SetActiveAction {
    type: PlayerActionType.SET_ACTIVE,
    payload: ITrack
}

interface SetDurationAction {
    type: PlayerActionType.SET_DURATION
    payload: number
}

interface SetVolumeAction {
    type: PlayerActionType.SET_VOLUME
    payload: number
}

interface SetCurrentTimeAction {
    type: PlayerActionType.SET_CURRENT_TIME
    payload: number
}

// после описания каждог типа возможного екшена объеденяим их в один тип для указания егр в редьюсере
export type PlayerAction = 
    PlayAction
    | PauseAction
    | SetActiveAction
    | SetDurationAction
    | SetVolumeAction
    | SetCurrentTimeAction
// таким бразом вот этот PlayerAction может принимать один из этих интерфейсов

