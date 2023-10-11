import React, { useState } from "react"

// что бы оживить инпуты для загрузки аудио и изображения 
// создадим хук что бы достатвать данные из инпутов 
// с помомщью него будем определять value и функцию onChange

export const useInput = (initialValue) => { // параметром принимает дефолтное значение из инпута
    const [value, setValue] = useState(initialValue)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => { // параетром принимает таргет типа React.ChangeEvent
        setValue(e.target.value) // передаем в состояние значение из инпута
    }

    return {
        value, onChange
    }

}