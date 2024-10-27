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
     * @param runtime Длительность выполнения упражнения.
     */
    const [runtime, setRuntime] = useState<ITimeClock>({one: 30, two: 0});
    console.log('runtime >>> ', runtime);
    /**
     * @param restAfter Время отдыха после упражнения.
     */
    const [restAfter, setRestAfter] = useState<ITimeClock>({one: 30, two: 0});
    console.log('restAfter >>> ', restAfter);

    const refRestAfter = useRef<IClockRef>(null);
    const refRuntime = useRef<IClockRef>(null);

    const onRestAfter = () => refRestAfter.current?.openClock();
    const onRuntime = () => refRuntime.current?.openClock();
    

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
                

                <Clock 
                    setSelectedTime={setRestAfter} 
                    selectedTime={restAfter} 
                    isUsePortal={false}
                    colorText={COLOR_ROOT.LIME_70}
                    typeClock='minutes_30/seconds'
                    ref={refRestAfter} 
                />

                <Clock 
                    setSelectedTime={setRuntime} 
                    selectedTime={runtime} 
                    isUsePortal={false}
                    colorText={COLOR_ROOT.LIME_70}
                    typeClock='minutes_30/seconds'
                    ref={refRuntime} 
                />      
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
});

export default modalAddRepsRest;