import {makeAutoObservable} from "mobx"

export default class UserStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this) // что бы mobx следил за изменениями этих переенных с их изменениями компаненты будут перерендереваться
    }

    // экшены функции каорые как то состояние изменяют
    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    // одноименные гетеры что бы получать переменные из состояния к ним будем обращаться как к бычным объектам
    // (Computed функции) они вызываются только в том случае если переменная каторая испльзуется внутри компанента была изменена
    get isAuth() {
        return this._isAuth
    }
    get user() {
        return this._user
    }
}