// тот же самый useSelector только уже работающий с типами
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../store/redusers";

// он равняется обычному useSelector из react-redux только указываем для него тип
// через : обращаемся к TypedUseSelectorHook и праметром передаем ему RootState из редьюсера
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector; 