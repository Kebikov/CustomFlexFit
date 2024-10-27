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
 * @param electedTime Выбранное время.
 */
const [selectedTime, setSelectedTime] = useState<ITimeClock>({one: 30, two: 0});
    console.log('selectedTime >>> ', selectedTime);

const refClock = useRef<IClockRef>(null);

const press = () => {
    console.log('press');
    refClock.current?.openClock();
}

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <HeaderGoBack/>
            <View style={{flex: 1, justifyContent: 'center'}} >
                <Button onPress={() => press()} title='open' />
                <Clock 
                    setSelectedTime={setSelectedTime} 
                    selectedTime={selectedTime} 
                    isUsePortal={false}
                    colorText={COLOR_ROOT.LIME_70}
                    typeClock='minutes_30/seconds'
                    ref={refClock} 
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
});

export default modalAddRepsRest;