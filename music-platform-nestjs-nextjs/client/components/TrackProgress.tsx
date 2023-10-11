import React from 'react';

// компанент для полосы загрузки трека с возможностью перематывать так же для зминения громкости трека

interface TrackProgressProps {
    left: number; // текущие время трека
    right: number; // полная длитеьность трека
    // в случае громкость right будет 100 left - текущая грокость
    // так же ожидаем сдесь функцию onChange каторая параметром принимает e и ничего не возврощает void
    onChange: (e) => void
}

const TrackProgress: React.FC<TrackProgressProps> = ({left, right, onChange}) => {
    return (
        <div style={{display: "flex"}}>
            <input
                type='range'
                // min max - минимаьное и максимальное значение каторое принимает инпут value={left} так как изменяться будет именно left
                // onChange={onChange} для изминения знаяения
                min={0}
                max={right}
                value={left}
                onChange={onChange}
            />
            <div>{left} / {right}</div>
        </div>
    );
};

export default TrackProgress;