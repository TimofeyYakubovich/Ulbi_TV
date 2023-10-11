// useTypedSelector будет равен обычному useSelector для того что бы получать данные из стейта
// но за тем исключением что указываем у него тип TypedUseSelectorHook с джейнериком корневого состояния <RootState>
// получается обычный хук useSelector только типизированный

import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/reducers";


export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector