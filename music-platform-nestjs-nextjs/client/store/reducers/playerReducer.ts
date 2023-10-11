import { PlayerState, PlayerAction, PlayerActionType } from "../../types/player"

const initialState: PlayerState = {
    currentTime: 0,
    duration: 0,
    active: null,
    volume: 50,
    pause: true
}

export const playerReducer = (state = initialState, action: PlayerAction): PlayerState => {
    switch (action.type) {
        case PlayerActionType.PAUSE:
            return {...state, pause: true}

        case PlayerActionType.PlAY:
            return {...state, pause: false}

        case PlayerActionType.SET_CURRENT_TIME:
            return {...state, currentTime: action.payload}

        case PlayerActionType.SET_VOLUME:
            return {...state, volume: action.payload}

        case PlayerActionType.SET_DURATION:
            return {...state, duration: action.payload}

        case PlayerActionType.SET_ACTIVE:
            return {...state, active: action.payload, duration: 0, currentTime: 0}

        default:
            return state
    }
}