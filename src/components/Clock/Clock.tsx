import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC, useState, forwardRef, useImperativeHandle, useMemo, memo, useEffect } from 'react';
import { Portal } from '@gorhom/portal'; 
import { COLOR_ROOT } from '@/constants/colors';
import { useSharedValue } from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import { useGetOptionsClock } from './hooks/useGetOptionsClock';
import { valuesClock } from './values/valuesClock';
import { getPositions } from './helpers/getPositions';
import ClockWrapper from './components/ClockWrapper';
import LineSelectionNumbers from './components/LineSelectionNumbers';
import ColumnNumbers from './components/ColumnNumbers';
import BodyClockWrapper from './components/BodyClockWrapper';
import { getStatePosition } from './helpers/getStatePosition';
import { gestureColumn } from './helpers/gestureColumn';

import type { IClock, TPositions } from './types';



/** @widgets `Установка времени.`*/
const Clock = ({
    id,
    idShowClock,
    setIdShowClock,

    selectedData,
    setSelectedData,

    colorBody = COLOR_ROOT.BACKGROUND,
    colorButton = COLOR_ROOT.BACKGROUND,
    colorText = 'white',
    colorLine = 'rgba(255, 255, 255, 0.3)',
    isUsePortal = true,
    typeClock = 'hours/minutes',
    typeOfDisplay = 'clock'
}: IClock) => {

    const [isShow, setIsShow] = useState<boolean>(false);

    // Установки для массива отображаемых чисел.
    const {optionsClock} = useGetOptionsClock(typeClock);

    /** `Начальные установки для отображения.` */
    const {
        itemHeight, 
        firstNumberArray,
        secondNumberArray,
        height,
        offsetTop
    } = valuesClock(optionsClock);


    /** `Позиций всех элементов первого ряда чисел.` */
    const arrPositionsOne: TPositions[] = getPositions({data: firstNumberArray, heightElement: itemHeight, offset: offsetTop});

    /** `Позиций всех элементов второго ряда чисел.` */
    const arrPositionsTwo: TPositions[] = getPositions({data: secondNumberArray, heightElement: itemHeight, offset: offsetTop});

    /** `Установка выбраного времени.` */
    const setTime = () => {
        
    }

    /** `Максимальная позиция первой колонки чисел.` */
    const MAX_HI_ONE = itemHeight - arrPositionsOne.length * itemHeight;
    /** `Максимальная позиция второй колонки чисел.` */
    const MAX_HI_TWO = itemHeight - arrPositionsTwo.length * itemHeight;
    
    /** `Начальная позиция колонки.` */
    const statePositionOne = getStatePosition(selectedData[id].one, arrPositionsOne, offsetTop);
    /** `Начальная позиция колонки.` */
    const statePositionTwo = getStatePosition(selectedData[id].two, arrPositionsTwo, offsetTop);

    /** `Текущяя позиция первой колонки цифр.` */
    const currentPositionsOneSv = useSharedValue<number>(statePositionOne);
    /** `Последняя позиция первой колонки цифр.` */
    const lastPositionsOneSv = useSharedValue<number>(statePositionOne);

    /** `Текущяя позиция первой колонки цифр.` */
    const currentPositionsTwoSv = useSharedValue<number>(statePositionTwo);
    /** `Последняя позиция первой колонки цифр.` */
    const lastPositionsTwoSv = useSharedValue<number>(statePositionTwo);

    const gestureOneNumber = gestureColumn(
        arrPositionsOne, 
        currentPositionsOneSv, 
        lastPositionsOneSv,
        offsetTop,
        MAX_HI_ONE
    );

    const gestureTwoNumber = gestureColumn(
        arrPositionsTwo, 
        currentPositionsTwoSv, 
        lastPositionsTwoSv,
        offsetTop,
        MAX_HI_TWO
    );


    const BodyClock = () => {
        return (
            <>
                {
                    isShow
                    ?
                    <ClockWrapper>
                        <BodyClockWrapper colorBody={colorBody} height={height} >
                            <LineSelectionNumbers itemHeight={itemHeight} centerTop={offsetTop} />
                            <ColumnNumbers
                                arrayNumbers={arrPositionsOne}
                                currentPositionsSv={currentPositionsOneSv}
                                gestureNumbers={gestureOneNumber}
                                colorText={colorText}
                            />
                            {
                                typeOfDisplay === 'clock' ?
                                <>
                                    <Text style={[styles.dots, {color: colorText}]} >:</Text>

                                    <ColumnNumbers
                                        arrayNumbers={arrPositionsTwo}
                                        currentPositionsSv={currentPositionsTwoSv}
                                        gestureNumbers={gestureTwoNumber}
                                        colorText={colorText}
                                    />
                                </>
                                :
                                null
                            }
                        </BodyClockWrapper>
                        <Pressable 
                            style={[styles.button, {backgroundColor: colorButton, borderTopColor: colorLine}]}
                            onPress={() => {
                                VibrationApp.pressButton();
                                setIdShowClock('');
                                setTime();
                            }}
                        >
                            <Text style={[styles.buttonText, {color: colorText}]} >OK</Text>
                        </Pressable>
                    </ClockWrapper>
                    :
                    null
                }
            </>
        )
    }

    useEffect(() => {
        console.log('Effect');
        if(idShowClock === id) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }

    }, [idShowClock]);

    useEffect(() => {
        return () => {
            console.log('Return Effect');
            setIdShowClock('');
            setIsShow(false);
        }
    }, []);

    return (
        <>
            {
                isUsePortal ?
                <Portal name='clock' >
                    <BodyClock/>
                </Portal>
                :
                <BodyClock/>
            }
        </>
    );
};


const radiusClock = 14;


const styles = StyleSheet.create({
    dots: {
        fontSize: 23, 
        paddingBottom: 3
    },
    button: {
        width: '60%',
        height: 50,
        borderBottomLeftRadius: radiusClock,
        borderBottomRightRadius: radiusClock,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: Platform.OS === 'ios' ? 2 : 1
    },
    buttonText: {
        fontSize: Platform.OS === 'ios' ? 16 : 16
    }
});


export default Clock;