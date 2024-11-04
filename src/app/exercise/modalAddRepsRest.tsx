import { View, StyleSheet, Button, Platform } from 'react-native';
import React, { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import InputOver from '@/components/InputOver/InputOver';
import { COLOR_ROOT } from '@/constants/colors';
import Clock, { ITimeClock, IClockRef } from '@/components/Clock/Clock';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemRepsRest from '@/components/ItemRepsRest/ItemRepsRest';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useLocalSearchParams } from 'expo-router';
import { useHookRouter } from '@/router/useHookRouter';
import ItemAddWeight from '@/components/ItemAddWeight/ItemAddWeight';
import HelpText from '@/components/HelpText/HelpText';
import Inputs from '@/components/modalAddRepsRest/Inputs/Inputs';
import RepsRest from '@/components/modalAddRepsRest/RepsRest/RepsRest';
import Weight from '@/components/modalAddRepsRest/Weight/Weight';


export interface INameAndNote {
    name: string;
    note: string;
}

/**
 * @param barbell ID используемого грифа.
 * @param plate_1 Массив ID блинов на первой стороне.
 * @param plate_2 Массив ID блинов на второй стороне.
 */
export interface IWeightState {
    barbell: number;
    plate_1: number[];
    plate_2: number[];
}

const fontSizeTitle = 21;
const borderRadiusBody = 22;
const paddingHorizontal = 25;

/**
 * @modal `Модальное окно для добавления повторов и времени отдыха у упражнения.`
 */
const ModalAddRepsRest: FC = () => {
    console.debug('modal > ModalAddRepsRest-----------------------------------------------------------');

    const refRestAfter = useRef<IClockRef>(null);
    const refRuntime = useRef<IClockRef>(null);
    const refReps = useRef<IClockRef>(null);
    const {t} = useTranslation(['[exercise]']);
    const DISPATCH = useAppDispatch();
    const {appRouter} = useHookRouter();

    const {sendIndex} = useLocalSearchParams<{sendIndex: string}>();
    const index = Number(sendIndex);

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);

    /**
     * @param nameAndNote Имя и заметка для упражнения.
     */
    const [nameAndNote, setNameAndNote] = useState<INameAndNote>({
        name: exerciseStateArray[index].name,
        note: exerciseStateArray[index].note
    });
    /**
     * @param reps reps.one = Количество повторений в упражнении.
     */
    const [reps, setReps] = useState<ITimeClock>(exerciseStateArray[index].reps);
    /**
     * @param runtime Длительность выполнения упражнения, минут и секунд.
     */
    const [runtime, setRuntime] = useState<ITimeClock>(exerciseStateArray[index].runtime);
    /**
     * @param restAfter Время отдыха после упражнения, минут и секунд.
     */
    const [restAfter, setRestAfter] = useState<ITimeClock>(exerciseStateArray[index].restAfter); //*! Передаем число которое должно быть в массиве, допустим у нас "one: {total: 30, step: 2}", мы хотим вывести в часах числа от 0 до 30 с шигом 2, у нас будет массив в итоге: [0, 2, 4, 6, ...] начальное значение должно быть одним из чисел полученого массива. 
    /**
     * @param selectedWeight
     */
    const [selectedWeight, setSelectedWeight] = useState<number | IWeightState>(0);

    const onRestAfter = useCallback(() => refRestAfter.current?.openClock(), [refRestAfter]);
    const onRuntime = useCallback(() => refRuntime.current?.openClock(), [refRuntime]);
    const onReps = useCallback(() => refReps.current?.openClock(), [refReps]);

    useEffect(() => {
        return () => {
            // Формируем изминенный обьект и передаем в redux.
            const exerciseOfChanged = {
                id: exerciseStateArray[index].id,
                name: nameAndNote.name,
                note: nameAndNote.note,
                reps,
                runtime,
                restAfter
            };
            DISPATCH(SET_EXERCISE_STATE(exerciseOfChanged));
        }
    }, [nameAndNote, reps, runtime, restAfter]);

    const clockCustom = useMemo(() => ({one: {total: 10, step: 1}, two: {total: 55, step: 5}}), []);
    const clockCustomReps = useMemo(() => ({one: {total: 50, step: 1}, two: {total: 0, step: 0}}), []);

    const Clocks = (
        <>
            <Clock 
                setSelectedTime={setRestAfter}
                selectedTime={restAfter} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={clockCustom}
                ref={refRestAfter} 
            />
            <Clock 
                setSelectedTime={setRuntime} 
                selectedTime={runtime} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={clockCustom}
                ref={refRuntime}
            />     
            <Clock 
                setSelectedTime={setReps} 
                selectedTime={reps} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={clockCustomReps}
                typeOfDisplay='one number'
                ref={refReps}
            />
        </>
    );


    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            isShowGoBack={{isShow: true}}
        >
            <View style={styles.container} >
                <Inputs
                    fontSizeTitle={fontSizeTitle}
                    borderRadiusBody={borderRadiusBody}
                    nameAndNote={nameAndNote}
                    setNameAndNote={setNameAndNote}
                />
                <Weight
                    value={selectedWeight}
                    setSelectedWeight={setSelectedWeight}
                />
                <RepsRest
                    onReps={onReps}
                    onRestAfter={onRestAfter}
                    onRuntime={onRuntime}
                    fontSizeTitle={fontSizeTitle}
                    borderRadiusBody={borderRadiusBody}
                    reps={reps}
                    runtime={runtime}
                    restAfter={restAfter}
                />
            </View>
            {Clocks}
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        paddingHorizontal: paddingHorizontal,
        //backgroundColor: 'red',
        paddingTop: 60,
        paddingBottom: 20
    }
});

export default ModalAddRepsRest;