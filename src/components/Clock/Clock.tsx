import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { useState, forwardRef, useImperativeHandle, useMemo, memo } from 'react';
import { Portal } from '@gorhom/portal'; 
import { COLOR_ROOT } from '@/constants/colors';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, FadeIn, FadeOut } from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import { BlurView } from 'expo-blur';
import { animatedStyles } from './helpers/animatedStyles';
import { arraysForClock, type IArraysForClock } from './helpers/arraysForClock';
import { gestureForClock } from './helpers/gestureForClock';
import { getPosition } from './helpers/getPosition';
import { gapsForClock } from '@/components/Clock/helpers/gapsForClock';


export interface IClockRef {
    openClock: () => void;
}

interface IClock {
    selectedTime:  ITimeClock;
    setSelectedTime: React.Dispatch<React.SetStateAction<ITimeClock>>;
    colorBody?: string;
    colorButton?:string;
    colorText?: string;
    colorLine?: string;
    isUsePortal?: boolean;
    typeClock?: 'hours/minutes' | 'minutes_30/seconds';
    typeClockCustom?: IArraysForClock;
    typeOfDisplay?: 'one number' | 'clock';
}

export interface ITimeClock {
    one: number;
    two: number;
}


/**
 * @widgets `Установка времени.`
 * @param selectedTime Обьект с выбранным временем.
 * @param setSelectedTime Установка выбранного времени.
 * @optional 
 * @param colorText ? Цвет текста. [default: 'white']
 * @param colorBody ? Цвет фона часов. [default: COLOR_ROOT.BACKGROUND]
 * @param colorButton ? Цвет фона нажней кнопки. [default: COLOR_ROOT.BACKGROUND]
 * @param colorLine ? Цвет линии между часами и кнопкой. [default: 'rgba(255, 255, 255, 0.3)']
 * @param isUsePortal ? Использовать ли портал, полезно для работы в модальных окнах. [default: true]
 * @param typeClock ? Предустановки для отображения чисел [default: 'hours/minutes'];
 * @param typeClockCustom ? Пользовательская установка отображения чисел, имеет приоритет перед typeClock.
 * @param typeOfDisplay ? Тип отображения, как часы(2 цыфры) или одна цыфра.
 */
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
    typeOfDisplay = 'clock'
}, ref) => {

    // Установки для массива отображаемых чисел.
    let optionsClock: IArraysForClock;
    if(typeof typeClockCustom === 'object') {
        optionsClock = typeClockCustom;
        optionsClock.one.total = useMemo(() => optionsClock.one.total + optionsClock.one.step, [optionsClock.one.step]); 
        optionsClock.two.total = useMemo(() => optionsClock.two.total + optionsClock.two.step, [optionsClock.two.step]); 
    } else {
        switch(typeClock) {
            case 'hours/minutes':
                optionsClock = {one: {total: 24, step: 1}, two: {total: 60, step: 5}};
                break;
            case 'minutes_30/seconds':
                optionsClock = {one: {total: 30, step: 1}, two: {total: 60, step: 5}};
                break;
            default:
                optionsClock = {one: {total: 24, step: 1}, two: {total: 60, step: 5}};
                break;
        }
        optionsClock.one.total = useMemo(() => optionsClock.one.total + optionsClock.one.total, [optionsClock.one.step]);
        optionsClock.two.total = useMemo(() => optionsClock.two.total + optionsClock.two.step, [optionsClock.two.step]); 
    }

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
    /**
     * @param isShow Показать/скрыть часы.
     */
    const [isShow, setIsShow] = useState<boolean>(false);
    const position = getPosition(selectedTime.one, itemHeight, firstNumberArray);
    /**
     * `Позиция "Первого числа".`
     */
    const firstNumberPosition = useSharedValue<number>(0); 
    if(firstNumberPosition.value === 0) firstNumberPosition.value = position;
    /**
     * `Последняя позиция "Первого числа".`
     */
    const lastPositionFirstNumber = useSharedValue<number>(0);
    if(lastPositionFirstNumber.value === 0) lastPositionFirstNumber.value = getPosition(selectedTime.one, itemHeight, firstNumberArray);

    /**
     * `Позиция "Второго числа".`
     */
    const secondNumberPosition = useSharedValue<number>(0);
    if(secondNumberPosition.value === 0) {
        const position = getPosition(selectedTime.two, itemHeight, secondNumberArray);
        secondNumberPosition.value = position;
    }
    /**
     * `Последняя позиция "Второго числа".`
     */
    const lastPositionSecondNumber = useSharedValue<number>(0);
    if(lastPositionSecondNumber.value === 0) lastPositionSecondNumber.value = getPosition(selectedTime.two, itemHeight, secondNumberArray);
    /**
     * `Выбраный пользователем первое число.`
     */
    const selectedFirstNumber = useSharedValue<number>(selectedTime.one);
    /**
     * `Выбраное пользователем "Второе число".`
     */
    const selecteSecondNumber = useSharedValue<number>(selectedTime.two);
    /**
     * `Последняя позиция вибрации для "Первого числа".`
     */
    const lastVibrationPositionFirstNumber = useSharedValue<number>(0);
    /**
     * `Последняя позиция вибрации для "Второго числа".`
     */
    const lastVibrationPositionSecondNumber = useSharedValue<number>(0);

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
        openClock: () => setIsShow(true)
    }));

    const bodyClock = () => {
        return (
            <>
                {
                    isShow
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
                                    setTime();
                                    VibrationApp.pressButton();
                                    setIsShow(false);
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
        position: 'absolute',
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