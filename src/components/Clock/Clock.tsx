import { Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Portal } from '@gorhom/portal'; 
import { COLOR_ROOT } from '@/constants/colors';
import { useSharedValue } from 'react-native-reanimated';
import VibrationApp from '@/utils/VibrationApp';
import { useGetOptionsClock } from './hooks/useGetOptionsClock';
import { valuesClock } from './values/valuesClock';
import { getPositions } from './helpers/getPositions';
import ClockWrapper from './components/ClockWrapper';
import LineSelectionNumbers from './components/LineSelectionNumbers';
import ColumnNumbers from './components/ColumnNumbers';
import BodyClockWrapper from './components/BodyClockWrapper';
import { getStatePosition } from './helpers/getStatePosition';
import { gestureColumn } from './helpers/gestureColumn';
import { checkId } from './helpers/checkId';

import type { IClock, TPositions, TStateDataClock } from './types';


/** @widgets `Установка времени.` */
const Clock = <T extends TStateDataClock>({
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
}: IClock<T>) => {

    checkId({id, selectedData});

    const [isShow, setIsShow] = useState<boolean>(false);
    /** `Данные установленных значений.` */
    const setSelectedDataSv = useSharedValue<TStateDataClock[keyof TStateDataClock]>({
        'one': selectedData[id as keyof TStateDataClock].one,
        'two': selectedData[id as keyof TStateDataClock].two
    });
    /** `Готовы ли данные для передачи в основное состояния, для компенсации анимации.` */
    const isReadyData = useSharedValue<boolean>(true);

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
        if(isReadyData.value) {
            setSelectedData(state => ({...state, [id]: {...setSelectedDataSv.value}}));
            setIdShowClock('');
        }
    }

    /** `Максимальная позиция первой колонки чисел.` */
    const MAX_HI_ONE = itemHeight - arrPositionsOne.length * itemHeight;
    /** `Максимальная позиция второй колонки чисел.` */
    const MAX_HI_TWO = itemHeight - arrPositionsTwo.length * itemHeight;
    
    /** `Начальная позиция колонки.` */
    const statePositionOne = getStatePosition(selectedData[id as keyof TStateDataClock].one, arrPositionsOne, offsetTop);
    /** `Начальная позиция колонки.` */
    const statePositionTwo = getStatePosition(selectedData[id as keyof TStateDataClock].two, arrPositionsTwo, offsetTop);

    /** `Текущяя позиция первой колонки цифр.` */
    const currentPositionsOneSv = useSharedValue<number>(statePositionOne);
    /** `Последняя позиция первой колонки цифр.` */
    const lastPositionsOneSv = useSharedValue<number>(statePositionOne);
    
    /** `Текущяя позиция первой колонки цифр.` */
    const currentPositionsTwoSv = useSharedValue<number>(statePositionTwo);
    /** `Последняя позиция первой колонки цифр.` */
    const lastPositionsTwoSv = useSharedValue<number>(statePositionTwo);

    const gestureOneNumber = gestureColumn({
        arrayPositions: arrPositionsOne,
        currentPositionsSv: currentPositionsOneSv,
        lastPositionsSv: lastPositionsOneSv,
        offset: offsetTop,
        MAX_HI: MAX_HI_ONE,
        num: 'one',
        setDataSv: setSelectedDataSv,
        isReadyData: isReadyData
    });

    const gestureTwoNumber = gestureColumn({
        arrayPositions: arrPositionsTwo,
        currentPositionsSv: currentPositionsTwoSv,
        lastPositionsSv: lastPositionsTwoSv,
        offset: offsetTop,
        MAX_HI: MAX_HI_TWO,
        num: 'two',
        setDataSv: setSelectedDataSv,
        isReadyData: isReadyData
    });


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
                                offset={offsetTop}
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
                                        offset={offsetTop}
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
        if(idShowClock === id) {
            setIsShow(true);
        } else {
            setIsShow(false);
        }

    }, [idShowClock]);

    useEffect(() => {
        return () => {
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