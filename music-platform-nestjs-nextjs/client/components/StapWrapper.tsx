import { Card, Container, Grid, Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

// компанент StapWrapper каторый будет отбражать все шаги и подсвечивать текущй шаг загрузк трека

interface StapWrapperProps {
    activeStep: number;
    children: React.ReactNode;
}

const steps = ['Информация о треке', 'Загрузите обложку', 'Загрузите сам трек'] // все шаги

const StapWrapper: React.FC<StapWrapperProps> = ({activeStep, children}) => {
    return (
        <Container>
            <Stepper activeStep={activeStep}>
            {/* пробегаемся по массиву шагов и для каждлго элимента итерации создае компанент Step в нем компанент StepLabel и в него 
            добовляем то что находится в массиве */}
                {steps.map((step, index) => 
                    <Step
                        key={index}
                        // completed выполнен этот шаг или нет если активный шаг бльше текущего индекса значит этот шаг уже пройден
                        completed={activeStep > index} 
                    >
                        <StepLabel>{step}</StepLabel>
                    </Step>
                )}
            </Stepper>
            <Grid container justifyContent="center" style={{margin: '70px 0', height: 270}}>
                <Card style={{width: 600}}>
                    {children}
                    {/* теперь в этот StapWrapper можно помещать контент форму либо кнопку загрузки аудио изображения 
                    и эта шаги Step будут сохраняться */}
                </Card>
            </Grid>
        </Container>
    );
};

export default StapWrapper;