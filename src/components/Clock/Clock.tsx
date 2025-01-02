import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC, useState, forwardRef, useImperativeHandle, useMemo, memo, useEffect } from 'react';
import { Portal } from '@gorhom/portal'; 
import { COLOR_ROOT } from '@/constants/colors';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, FadeIn, FadeOut, useAnimatedReaction, withSpring } from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import { BlurView } from 'expo-blur';
import { animatedStyles } from './helpers/animatedStyles';
import { arraysForClock } from './helpers/arraysForClock';
import { gestureForClock } from './helpers/gestureForClock';
import { getPosition } from './helpers/getPosition';
import { gapsForClock } from '@/components/Clock/helpers/gapsForClock';
import { useGetOptionsClock } from './hooks/useGetOptionsClock';
import { valuesSv } from './values/valuesSv';
import { valuesClock } from './values/valuesClock';
import { getPositions } from './helpers/getPositions';
import ItemNumber from './components/ItemNumber';
import { Gesture } from "react-native-gesture-handler";
import ClockWrapper from './components/ClockWrapper';
import LineSelectionNumbers from './components/LineSelectionNumbers';
import ColumnNumbers from './components/ColumnNumbers';
import BodyClockWrapper from './components/BodyClockWrapper';
import { definingPosition } from './helpers/definingPosition';
import { getStatePosition } from './helpers/getStatePosition';
import { gestureColumn } from './helpers/gestureColumn';

import type { IClock,IArraysForClock, TPositions } from './types';



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
        fullRotationFirstNumber, 
        fullRotationSecondNumber,
        height,
        offsetTop
    } = valuesClock(optionsClock);

    const {
        firstNumberPosition,
        secondNumberPosition,
        selectedFirstNumber,
        selecteSecondNumber,
        lastPositionFirstNumber,
        lastVibrationPositionFirstNumber,
        lastPositionSecondNumber,
        lastVibrationPositionSecondNumber
    } = valuesSv(id, selectedData, itemHeight, firstNumberArray, secondNumberArray);

    /** `Позиций всех элементов первого ряда чисел.` */
    const arrPositionsOne: TPositions[] = getPositions({data: firstNumberArray, heightElement: itemHeight, offset: offsetTop});

    /** `Позиций всех элементов второго ряда чисел.` */
    const arrPositionsTwo: TPositions[] = getPositions({data: secondNumberArray, heightElement: itemHeight, offset: offsetTop});

    const {animatedFirstNumber, animatedSecondNumber} = animatedStyles({
        firstNumberPosition, 
        itemHeight, 
        fullRotation: fullRotationFirstNumber, 
        height, 
        fullRotationSecondNumber: fullRotationSecondNumber,
        secondNumberPosition,
        lengthArrayOne: firstNumberArray.length,
        lengthArrayTwo: secondNumberArray.length
    });

    const {gapsFirstNumber, gapsSecondNumber} = gapsForClock({
        fullRotationFirstNumber, 
        itemHeight, 
        fullRotationSecondNumber
    });


    /** `Установка выбраного времени.` */
    const setTime = () => {
        setSelectedData(state => ({...state, id: {one: selectedFirstNumber.value, two: selecteSecondNumber.value}}))
    }

    const {gesturePan: gesturePanFirstNumber} = gestureForClock({
        svPosition: firstNumberPosition, 
        svLastPosition: lastPositionFirstNumber, 
        svSelectedNumber: selectedFirstNumber, 
        fullRotation: fullRotationFirstNumber, 
        gaps: gapsFirstNumber, 
        itemHeight, 
        svLastVibrationPosition: lastVibrationPositionFirstNumber,
        maxValue: optionsClock.one.total,
        step: optionsClock.one.step
    });

    const {gesturePan: gesturePanSecondNumber} = gestureForClock({
        svPosition: secondNumberPosition, 
        svLastPosition: lastPositionSecondNumber, 
        svSelectedNumber: selecteSecondNumber, 
        fullRotation: fullRotationSecondNumber, 
        gaps: gapsSecondNumber, 
        itemHeight, 
        svLastVibrationPosition: lastVibrationPositionSecondNumber,
        maxValue: optionsClock.two.total,
        step: optionsClock.two.step
    });

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

    const secondNumber = secondNumberArray.map((item, i) => {
        return(
            <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedSecondNumber(Number(i))]} key={i} >
                <Text style={[styles.timeText, {color: colorText}]} >{item}</Text>
            </Animated.View>
        )
    });

    console.log('idShowClock === id ', idShowClock === id);

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
    block: {
        position: 'relative',
        zIndex: 2,
        width: 40,
        height: '100%',
        overflow: 'hidden'
    },

    timeBox: {
        position: 'absolute',
        left: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        fontSize: Platform.OS === 'ios' ? 23 : 21,
        textAlign: 'center',
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