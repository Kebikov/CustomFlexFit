import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { useState, forwardRef, useImperativeHandle, useMemo, memo } from 'react';
import { Portal } from '@gorhom/portal'; 
import { COLOR_ROOT } from '@/constants/colors';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, FadeIn, FadeOut, useAnimatedReaction } from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import { BlurView } from 'expo-blur';
import { animatedStyles } from './helpers/animatedStyles';
import { arraysForClock } from './helpers/arraysForClock';
import { gestureForClock } from './helpers/gestureForClock';
import { getPosition } from './helpers/getPosition';
import { gapsForClock } from '@/components/Clock/helpers/gapsForClock';
import { useGetOptionsClock } from './hooks/useGetOptionsClock';
import { valuesSv } from './values/valuesSv';

import type { IClock,IArraysForClock } from './types';


export interface IClockRef {
    openClock: () => void;
}

export interface ITimeClock {
    one: number;
    two: number;
}


/** @widgets `Установка времени.`*/
const Clock = forwardRef<IClockRef, IClock>(({
    selectedTime,
    setSelectedTime,
    colorBody = COLOR_ROOT.BACKGROUND,
    colorButton = COLOR_ROOT.BACKGROUND,
    colorText = 'white',
    colorLine = 'rgba(255, 255, 255, 0.3)',
    isUsePortal = true,
    typeClock = 'hours/minutes',
    typeClockCustom,
    typeOfDisplay = 'clock',
    id,
    idShowClock,
    setIdShowClock
}, ref) => {

    /**
     * @param isShow Показать/скрыть часы.
     */
    const [isShow, setIsShow] = useState<boolean>(false);

    // Установки для массива отображаемых чисел.
    let {optionsClock} = useGetOptionsClock(typeClock, typeClockCustom);

    /**
     * `Высота окна с цыфрами.`
     */
    const height = 252;
    /**
     * `Количество элементов в окне.`
     */
    const totalElements = 7;
    /**
     * `Высота одного элемента.`
     */
    const itemHeight = height / totalElements; 
    const {firstNumberArray, secondNumberArray} = arraysForClock(optionsClock);
    /**
     * `Диаметр полного оборота "Первого числа".`
     */
    const fullRotationFirstNumber = firstNumberArray.length * itemHeight;
    /**
     * `Диаметр полного оборота второго числа.`
     */
    const fullRotationSecondNumber = secondNumberArray.length * itemHeight;

    const {
        firstNumberPosition,
        secondNumberPosition,
        selectedFirstNumber,
        selecteSecondNumber,
        lastPositionFirstNumber,
        lastVibrationPositionFirstNumber,
        lastPositionSecondNumber,
        lastVibrationPositionSecondNumber
    } = valuesSv(selectedTime, itemHeight, firstNumberArray, secondNumberArray);


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
    /**
     * `Установка выбраного времени.`
     */
    const setTime = () => {
        setSelectedTime({one: selectedFirstNumber.value, two: selecteSecondNumber.value});
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

    const firstNumber = firstNumberArray.map((item, i) => {
            return(
                <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedFirstNumber(Number(i))]} key={i} >
                    <Text style={[styles.timeText, {color: colorText}]} >{item}</Text>
                </Animated.View>
            )
    });

    const secondNumber = secondNumberArray.map((item, i) => {
        return(
            <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedSecondNumber(Number(i))]} key={i} >
                <Text style={[styles.timeText, {color: colorText}]} >{item}</Text>
            </Animated.View>
        )
    });

    useImperativeHandle(ref, () => ({
        openClock: () => {
            setIsShow(true);
        }
    }));

    const bodyClock = () => {
        return (
            <>
                {
                    isShow && id === undefined || id !== undefined && idShowClock === id
                    ?
                    <Animated.View 
                        style={styles.main} 
                        entering={FadeIn.duration(500)} 
                        exiting={FadeOut.duration(500)} 
                    >
                        <BlurView 
                            intensity={30}
                            tint='dark'
                            style={styles.container} 
                        >
                            <View style={[styles.body, {backgroundColor: colorBody}]} >
                                <View style={[styles.time, {height}]} >
                                    <View style={styles.line}>
                                        <View style={styles.lineBody} ></View>
                                    </View>
                                    <GestureDetector gesture={gesturePanFirstNumber} >
                                        <View style={styles.block} >
                                            {firstNumber}
                                        </View>
                                    </GestureDetector> 
                                    {
                                        typeOfDisplay === 'clock' ?
                                        <>
                                            <View> 
                                                <Text style={{color: colorText, fontSize: 23}} >:</Text>
                                            </View>

                                            <GestureDetector gesture={gesturePanSecondNumber} >
                                                <View style={styles.block} >
                                                    {secondNumber}
                                                </View>
                                            </GestureDetector>
                                        </>
                                        :
                                        null
                                    }
                                </View>
                            </View>
                            <Pressable 
                                style={[styles.button, {backgroundColor: colorButton, borderTopColor: colorLine}]}
                                onPress={() => {
                                    VibrationApp.pressButton();
                                    // Если есть id, значит есть внешнее состояние контролируюшее отображение компанента.
                                    id ? setIdShowClock(0) : setIsShow(false);
                                    setTime();
                                }}
                            >
                                <Text style={[styles.buttonText, {color: colorText}]} >OK</Text>
                            </Pressable>
                        </BlurView>
                    </Animated.View>
                    :
                    null
                }
            </>
        )
    }

    return (
        <>
            {
                isUsePortal ?
                <Portal name='clock' >
                    {bodyClock()}
                </Portal>
                :
                bodyClock()
            }
        </>
    );
});


const radiusClock = 14;
const widthClock = '60%';


const styles = StyleSheet.create({

    main: {
        position: 'absolute',
        width: '100%',
        height: '100%'
    },
    container: {
        position: 'relative',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, .2)' : 'rgba(255, 255, 255, .5)'
    },
    body: {
        width: widthClock,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: radiusClock,
        borderTopRightRadius: radiusClock
    },
    time: {
        position: 'relative',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
        overflow: 'hidden'
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
    },
    line: {
        position: 'absolute',
        zIndex: 1,
        top: 106,
        left: 0,
        width: '100%',
        height:  40,
    },
    lineBody: {
        flex: 1,
        backgroundColor: 'white',
        opacity: .15
    }
});


export default memo(Clock);