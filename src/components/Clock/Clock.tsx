import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC, useState, forwardRef, useImperativeHandle, useMemo, memo, useEffect } from 'react';
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
import ItemNumber from './components/ItemNumber';
import { Gesture } from "react-native-gesture-handler";

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
        centerTop
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
    const arrPositionsOne: TPositions[] = getPositions({data: firstNumberArray, heightElement: itemHeight});

    /** `Определение позиций всех элементов второго числа.` */
    const arrPositionsTwo: TPositions[] = getPositions({data: secondNumberArray, heightElement: itemHeight});


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

    const MAX_HI = (arrPositionsOne.length * itemHeight - centerTop - itemHeight) * -1;
    console.log('MAX_HI = ', MAX_HI);
    const currentPositionsOneSv = useSharedValue<number>(centerTop);
    const lastPositionsOneSv = useSharedValue<number>(0);

    const gestureOneNumber = Gesture.Pan()
        .onUpdate((evt) => {
            console.log(currentPositionsOneSv.value);
            currentPositionsOneSv.value = lastPositionsOneSv.value + evt.translationY;

            if(currentPositionsOneSv.value >= centerTop) {
                currentPositionsOneSv.value = centerTop;
            }
            if(currentPositionsOneSv.value <= MAX_HI) {
                currentPositionsOneSv.value = MAX_HI;
            }
        })
        .onEnd((evt) => {

            lastPositionsOneSv.value = currentPositionsOneSv.value;
        })

    const firstNumber = arrPositionsOne.map((item, i) => 
        <ItemNumber 
            item={item}
            colorText={colorText}
            currentPositionSv={currentPositionsOneSv}
            key={i}
        />
    );

    const secondNumber = secondNumberArray.map((item, i) => {
        return(
            <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedSecondNumber(Number(i))]} key={i} >
                <Text style={[styles.timeText, {color: colorText}]} >{item}</Text>
            </Animated.View>
        )
    });

    console.log('idShowClock === id ', idShowClock === id);

    const bodyClock = () => {
        return (
            <>
                {
                    isShow
                    ?
                    <Animated.View 
                        style={positionStyle.main_absolute} 
                        entering={FadeIn.duration(500)}  
                        exiting={FadeOut.duration(500)} 
                    >
                        <BlurView
                            style={positionStyle.container_relative} 
                            intensity={30}
                            tint='dark'
                        >
                            <View style={[styles.body, {backgroundColor: colorBody, height}]} >
                                <View style={[styles.time]} >
                                    <View style={[styles.line, {top: centerTop}]}>
                                        <View style={[styles.lineBody, {height: itemHeight}]} ></View>
                                    </View>
                                    <GestureDetector gesture={gestureOneNumber} >
                                        <View style={styles.block} >
                                            {firstNumber}
                                        </View>
                                    </GestureDetector> 
                                    {
                                        typeOfDisplay === 'clock' ?
                                        <>
                                            <Text style={{color: colorText, fontSize: 23, paddingBottom: 3}} >:</Text>

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
    body: {
        width: widthClock,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: radiusClock,
        borderTopRightRadius: radiusClock
    },
    time: {
        position: 'relative',
        width: '100%',
        height: '100%',
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
        left: 0,
        width: '100%'
    },
    lineBody: {
        flex: 1,
        backgroundColor: 'white',
        opacity: .5
    }
});

const positionStyle = StyleSheet.create({
    main_absolute: {
        position: 'absolute',
        zIndex: 10,
        width: '100%',
        height: '100%'
    },
    container_relative: {
        position: 'relative',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Platform.OS === 'ios' ? 'rgba(255, 255, 255, .2)' : 'rgba(255, 255, 255, .5)'
    },
});




export default Clock;