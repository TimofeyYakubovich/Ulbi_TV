// в этом хуке связываем екшенкриаоры с диспатчем для этого испльзуется функция bindActionCreators()
// тоесть нам dispatch уже не понадобится просто при вызове екшенкриаора он сам прокинится в dispatch

import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
// импортируем все экшенкреаторы
// import * as UserActionCreators from '../store/action-creators/user'
// теперь импортируем сразу все экшенкриеторы
import ActionCreators from '../store/action-creators/index'


export const useActions = () => {
    const dispatch = useDispatch()
    // в bindActionCreators передаем сначало все UserActionCreators потом dispatch
    // return bindActionCreators(UserActionCreators, dispatch)
    return bindActionCreators(ActionCreators, dispatch)
}