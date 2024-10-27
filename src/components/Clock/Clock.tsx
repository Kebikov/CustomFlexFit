import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Portal } from '@gorhom/portal'; 
import { COLOR_ROOT } from '@/constants/colors';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated, { useSharedValue, FadeIn, FadeOut } from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import { BlurView } from 'expo-blur';
import { animatedStyles } from './helpers/animatedStyles';
import { arraysForClock, type IArraysForClock } from './helpers/arraysForClock';
import { gestureHoursForClock } from './helpers/gestureHoursForClock';
import { gestureMinutesForClock } from './helpers/gestureMinutesForClock';
import { getPosition } from './helpers/getPosition';
import { gapsForClock } from '@/components/Clock/helpers/gapsForClock';
import { G } from 'react-native-svg';


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
    typeClockCustom
}, ref) => {

    // Установки для массива отображаемых чисел.
    let optionsClock: IArraysForClock;
    if(typeClockCustom) {
        optionsClock = typeClockCustom;
    } else {
        switch(typeClock) {
            case 'hours/minutes':
                optionsClock = {one: {total: 24 + 1, step: 1}, two: {total: 60, step: 5}};
                break;
            case 'minutes_30/seconds':
                optionsClock = {one: {total: 30 + 1, step: 1}, two: {total: 60, step: 5}};
                break;
            default:
                optionsClock = {one: {total: 24 + 1, step: 1}, two: {total: 60, step: 5}};
                break;
        }
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
    const {hoursArray, minutesArray} = arraysForClock(optionsClock);
    /**
     * `Диаметр полного оборота часов.`
     */
    const fullRotation = hoursArray.length * itemHeight;
    /**
     * `Диаметр полного оборота минут.`
     */
    const fullRotationMinutes = minutesArray.length * itemHeight;
    /**
     * @param isShow Показать/скрыть часы.
     */
    const [isShow, setIsShow] = useState<boolean>(false);
    const objHoursPosition = getPosition(selectedTime.one, itemHeight, hoursArray);
    /**
     * `Число используемое для смешения первого ряда цыфр.`
     */
    let offsetHours: number = objHoursPosition.offsetNumber;
    /**
     * `Позиция часа.`
     */
    const hoursPosition = useSharedValue<number>(0); 
    if(hoursPosition.value === 0) hoursPosition.value = objHoursPosition.position;
    /**
     * `Последняя позиция часа.`
     */
    const lastHoursPosition = useSharedValue<number>(0);
    if(lastHoursPosition.value === 0) lastHoursPosition.value = getPosition(selectedTime.one, itemHeight, hoursArray).position;
    /**
     * `Число используемое для смешения первого ряда цыфр.`
     */
    let offsetMinutes: number;
    /**
     * `Позиция минут.`
     */
    const minutesPosition = useSharedValue<number>(0);
    if(minutesPosition.value === 0) {
        const {offsetNumber, position} = getPosition(selectedTime.two, itemHeight, minutesArray)
        minutesPosition.value = position;
        offsetMinutes = offsetNumber;
    }
    /**
     * `Последняя позиция минут.`
     */
    const lastMinutesPosition = useSharedValue<number>(0);
    if(lastMinutesPosition.value === 0) lastMinutesPosition.value = getPosition(selectedTime.two, itemHeight, minutesArray).position;
    /**
     * `Выбраный пользователем час.`
     */
    const selectedHour = useSharedValue<number>(selectedTime.one);
    /**
     * `Выбраные пользователем минуты.`
     */
    const selectedMinute = useSharedValue<number>(selectedTime.two);
    /**
     * `Последняя позиция вибрации для часов.`
     */
    const lastVibrationPositionHour = useSharedValue<number>(0);
    /**
     * `Последняя позиция вибрации для минут.`
     */
    const lastVibrationPositionMinutes = useSharedValue<number>(0);

    const {animatedHours, animatedMinutes} = animatedStyles({
        hoursPosition, 
        itemHeight, 
        fullRotation, 
        height, 
        fullRotationMinutes,
        minutesPosition,
        lengthArrayOne: hoursArray.length,
        lengthArrayTwo: minutesArray.length
    });

    const {gaps, gapsMinutes} = gapsForClock({fullRotation, itemHeight, fullRotationMinutes});
    /**
     * `Установка выбраного времени.`
     */
    const setTime = () => {
        setSelectedTime({one: selectedHour.value, two: selectedMinute.value});
    }

    const {gesturePanHours} = gestureHoursForClock({
        hoursPosition, 
        lastHoursPosition, 
        selectedHour, 
        fullRotation, 
        gaps, 
        itemHeight, 
        lastVibrationPositionHour,
        offsetHours,
        maxValue: optionsClock.one.total
    });
    const {gesturePanMinutes} = gestureMinutesForClock({minutesPosition, lastMinutesPosition, selectedMinute, fullRotationMinutes, gapsMinutes, itemHeight, minutesArray, lastVibrationPositionMinutes});

    const hours = hoursArray.map((item, i) => {
            return(
                <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedHours(Number(i))]} key={i} >
                    <Text style={[styles.timeText, {color: colorText}]} >{item}</Text>
                </Animated.View>
            )
    });

    const minutes = minutesArray.map((item, i) => {
        return(
            <Animated.View style={[styles.timeBox, {height: itemHeight}, animatedMinutes(Number(i))]} key={i} >
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
                                    <GestureDetector gesture={gesturePanHours} >
                                        <View style={styles.block} >
                                            {hours}
                                        </View>
                                    </GestureDetector>

                                    <View>
                                        <Text style={{color: colorText, fontSize: 23}} >:</Text>
                                    </View>

                                    <GestureDetector gesture={gesturePanMinutes} >
                                        <View style={styles.block} >
                                            {minutes}
                                        </View>
                                    </GestureDetector>

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

export default Clock;