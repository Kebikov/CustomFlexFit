import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC, useState, forwardRef, useImperativeHandle, useMemo, memo } from 'react';
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
import { valuesClock } from './values/valuesClock';
import { getPositions } from './helpers/getPositions';

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

    // Установки для массива отображаемых чисел.
    const {optionsClock} = useGetOptionsClock(typeClock);

    /** `Начальные установки для отображения.` */
    const {
        itemHeight, 
        firstNumberArray,
        secondNumberArray,
        fullRotationFirstNumber, 
        fullRotationSecondNumber,
        height
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
    const currentPositionsOne = useSharedValue<TPositions>( getPositions({data: firstNumberArray, heightElement: itemHeight}) );

    /** `Определение позиций всех элементов второго числа.` */
    const currentPositionsTwo = useSharedValue<TPositions>( getPositions({data: secondNumberArray, heightElement: itemHeight}) );


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

    const bodyClock = () => {
        return (
            <>
                {
                    idShowClock === id
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
                                    setIdShowClock('');
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
};


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


export default Clock;