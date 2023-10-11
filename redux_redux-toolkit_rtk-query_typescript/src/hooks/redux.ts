// хуки для работы с редакс

import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { useSelector } from "react-redux";

// создаем хук useAppDispatch посути обычный useDispatch каторый возвращает нам dispatch но используем типизированный диспатч
export const useAppDispatch = () => useDispatch<AppDispatch>();

// создаем хук useAppSelector обычный useSelector но типизированный
// для этого используем специальный тип TypedUseSelectorHook и туда передаем RootState
// для того что бы комфортно работать с типами
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;