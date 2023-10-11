// собственный хук для того что бы мы могли взывать екшенкреаторы без использования диспатча
// свяжем екшенкреаторы и диспатч и затем эти функции можно будет взвать не прокидывая их в диспатч

import { useDispatch } from "react-redux"
import { bindActionCreators } from "redux"
import ActionsCreators from "../store/actions-creators"

export const useActions = () => {
    const dispatch = useDispatch()
    return bindActionCreators(ActionsCreators, dispatch)
}