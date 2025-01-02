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
    console.log('isShow = ', isShow);

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

    /** `Определение позиций всех элементов первого числа.` */
    const arrPositionsOne: TPositions[] = getPositions({data: firstNumberArray, heightElement: itemHeight, offset: offsetTop});
    //console.log(JSON.stringify( arrPositionsOne, null, 2));
    /** `Определение позиций всех элементов второго числа.` */
    //const arrPositionsTwo: TPositions[] = getPositions({data: secondNumberArray, heightElement: itemHeight});


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

    /** `Максимальная позиция первой колонки цифр.` */
    const MAX_HI = itemHeight - arrPositionsOne.length * itemHeight;
    console.log('MAX_HI = ', MAX_HI);

    /** `Начальная позиция колонки.` */
    const statePositionOne = getStatePosition(selectedData[id].one, arrPositionsOne, offsetTop);

    /** `Текущяя позиция первой колонки цифр.` */
    const currentPositionsOneSv = useSharedValue<number>(statePositionOne);

    /** `Последняя позиция первой колонки цифр.` */
    const lastPositionsOneSv = useSharedValue<number>(statePositionOne);

    const gestureOneNumber = gestureColumn(
        arrPositionsOne, 
        currentPositionsOneSv, 
        lastPositionsOneSv,
        offsetTop,
        MAX_HI
    );

    // const gestureOneNumber = Gesture.Pan()
    //     .onUpdate((evt) => {
    //         currentPositionsOneSv.value = lastPositionsOneSv.value + evt.translationY;
    //     })
    //     .onEnd((evt) => {

    //         if(currentPositionsOneSv.value >= 0) {
    //             console.log('низ');
    //             currentPositionsOneSv.value = withSpring(0);
    //             lastPositionsOneSv.value = 0;
    //             return;
    //         }

    //         if(currentPositionsOneSv.value <= MAX_HI) {
    //             console.log('верх');
    //             currentPositionsOneSv.value = withSpring(MAX_HI);
    //             lastPositionsOneSv.value = MAX_HI;
    //             return;
    //         }

    //         /** `Ближайший элемент к центру в массиве.` */
    //         const element = definingPosition(arrPositionsOne, currentPositionsOneSv, offsetTop);
    //         console.log('element = ', element);
    //         currentPositionsOneSv.value = withSpring(element.top);
    //         lastPositionsOneSv.value = currentPositionsOneSv.value;
    //     })

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

                                    <GestureDetector gesture={gesturePanSecondNumber} >
                                        <View style={styles.block} >
                                            {secondNumber}
                                        </View>
                                    </GestureDetector>
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