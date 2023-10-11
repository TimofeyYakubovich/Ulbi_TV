import { TextField } from '@mui/material';
import React, { useRef } from 'react';

// компанент для загрузки обложки и самого трека

interface FileUploadProps {
    setFile: Function; // функция каорая будет изенять файл
    accept: string;
    children: React.ReactNode;
}

// сейчас при поытке загрузить файл можно згарузить как jpg так и mp3 над это ограничеть 
// для этого добовляем еще 1 пропс accept и передаем его в инпут в нем можно прописать ограничение на какой то формат
// audio/mp3 audio/mp4 если поставить audio/* то можно будет загружать аудио любго формата
const FileUpload: React.FC<FileUploadProps> = ({setFile, accept, children}) => {
    const ref = useRef<HTMLInputElement>()

    // логика выбора файла функия onChange параметром принимает евент и так как тут работаем с событием onChange указываем тип евента
    // React.ChangeEvent и джейнерик у него <HTMLInputElement> тоесть работаем сейчас с событием onChange у элимента input
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(e.target.files) // получаем массив с 1 элиментом в катором лежит выбранный файл
        // и передаем его в setFile
        setFile(e.target.files[0])
    }

    return (
        <div onClick={() => ref.current.click()}>
            <input 
                type='file'
                accept={accept}
                // зачем мы делали компанент FileUpload если с таким же успехом можно было прсто использовать input и в него передавать
                // те же пропсы но дефолтный input с type='file' стилизуется достаточно сложно поэтому добовляем ему сдесь style={{display: "none"}}
                // и сделаем такую хитрость создаем референс ref хуком useRef с помощью референса можно получить текущий дом элимент
                // к каторому этот референс прекрепим указываем что этот реф будет типа <HTMLInputElement> и как пропс передаем его в input
                // сейчас этот инпут скрыт но в дом дереве он всеравно находится поэтому в блок div помещаем children тоесть элимент каторый
                // будет оборачиваться в FileUpload и на сам корневой div вешаем слушатель обработки нажатия где искуственно нажимаем на инпут
                // onClick={() => ref.current.click() на странице загрузки внутрь FileUpload добовляем кнопку тоесть внутрь FileUpload 
                // можно поместить что угодно но функционал будет такой что при нажатии на это содержимое будет открываться файловая система
                style={{display: "none"}}
                ref={ref}
                onChange={onChange}
            />
            {children}
        </div>
    );
};

export default FileUpload;