import { View, Text, StyleSheet, Button } from 'react-native';
import React, { FC, useState, useRef } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import { COLOR_ROOT } from '@/constants/colors';
import Clock, { ITimeClock, IClockRef } from '@/components/Clock/Clock';


/**
 * @modal `Модальное окно для добавления повторов и времени отдыха у упражнения.`
 */
const modalAddRepsRest: FC = () => {
    /**
     * @param reps reps.one = Количество повторений в упражнении.
     */
    const [reps, setReps] = useState<ITimeClock>({one: 10, two: 0});
    /**
     * @param runtime Длительность выполнения упражнения, минут и секунд.
     */
    const [runtime, setRuntime] = useState<ITimeClock>({one: 2, two: 30});
    /**
     * @param restAfter Время отдыха после упражнения, минут и секунд.
     */
    const [restAfter, setRestAfter] = useState<ITimeClock>({one: 2, two: 30}); //*! Передаем число которое должно быть в массиве, допустим у нас "one: {total: 30, step: 2}", мы хотим вывести в часах числа от 0 до 30 с шигом 2, у нас будет массив в итоге: [0, 2, 4, 6, ...] начальное значение должно быть одним из чисел полученого массива. 

    const refRestAfter = useRef<IClockRef>(null);
    const refRuntime = useRef<IClockRef>(null);
    const refReps = useRef<IClockRef>(null);

    const onRestAfter = () => refRestAfter.current?.openClock();
    const onRuntime = () => refRuntime.current?.openClock();
    const onReps = () => refReps.current?.openClock();

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <HeaderGoBack/> 
            <View style={{flex: 1, justifyContent: 'center'}} >

                <View style={{width: '100%', marginTop: 20, backgroundColor: 'green'}} >
                    <Button onPress={() => onRuntime()} title='runtime' color={'white'} />
                    <Text style={{color: 'white', fontSize: 18}} >{`${runtime.one} мин. ${runtime.two} сек.`}</Text>
                </View>

                <View style={{width: '100%', marginTop: 20, backgroundColor: 'blue'}} >
                    <Button onPress={() => onRestAfter()} title='restAfter' color={'white'} />
                    <Text style={{color: 'white', fontSize: 18}} >{`${restAfter.one} мин. ${restAfter.two} сек.`}</Text>
                </View>

                <View style={{width: '100%', marginTop: 20, backgroundColor: 'blue'}} >
                    <Button onPress={() => onReps()} title='restAfter' color={'white'} />
                    <Text style={{color: 'white', fontSize: 18}} >{`${reps.one} повторов.`}</Text>
                </View>
                

                <Clock 
                    setSelectedTime={setRestAfter}
                    selectedTime={restAfter} 
                    isUsePortal={false}
                    colorText={COLOR_ROOT.LIME_70}
                    typeClockCustom={{one: {total: 10, step: 1}, two: {total: 55, step: 5}}}
                    ref={refRestAfter} 
                />

                <Clock 
                    setSelectedTime={setRuntime} 
                    selectedTime={runtime} 
                    isUsePortal={false}
                    colorText={COLOR_ROOT.LIME_70}
                    typeClockCustom={{one: {total: 10, step: 1}, two: {total: 55, step: 5}}}
                    ref={refRuntime}
                />     

                <Clock 
                    setSelectedTime={setReps} 
                    selectedTime={reps} 
                    isUsePortal={false}
                    colorText={COLOR_ROOT.LIME_70}
                    typeClockCustom={{one: {total: 50, step: 1}, two: {total: 0, step: 0}}}
                    typeOfDisplay='one number'
                    ref={refReps}
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
});

export default modalAddRepsRest;