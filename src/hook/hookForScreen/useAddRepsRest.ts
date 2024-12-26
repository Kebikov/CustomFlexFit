import Clock, { ITimeClock, IClockRef } from '@/components/Clock/Clock';
import React, { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import type { INameAndNote, IWeightState } from '@/components/Clock/types';


export const useAddRepsRest = (sendIndex: string) => {
    const index = Number(sendIndex);

    const DISPATCH = useAppDispatch();

    const refRestAfter = useRef<IClockRef>(null);
    const refRuntime = useRef<IClockRef>(null);
    const refReps = useRef<IClockRef>(null);

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);

    /**
     * @param isScrollEnabled State > Доступен ли скролл страницы.
     */
    const [isScrollEnabled, setIsScrollEnabled] = useState<boolean>(true);
    /**
     * @param nameAndNote Имя и заметка для упражнения.
     */
    const [nameAndNote, setNameAndNote] = useState<INameAndNote>({
        name: exerciseStateArray[index].name,
        note: exerciseStateArray[index].note
    });
    /**
     * @state reps.one = Количество повторений в упражнении.
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
     * @param selectedWeight Установка общего веса снаряда.
     */
    const [selectedWeight, setSelectedWeight] = useState<number | IWeightState>(0);

    /** `@function onRestAfter открытие часов` */
    const onRestAfter = useCallback(() => refRestAfter.current?.openClock(), [refRestAfter]);
    /** `@function onRuntime открытие часов` */
    const onRuntime = useCallback(() => refRuntime.current?.openClock(), [refRuntime]);
    /** `@function onReps открытие часов` */
    const onReps = useCallback(() => {
            console.log('press +++');
            refReps.current?.openClock();
        }
        , [refReps]
    );

    /** `Обьект начальных установок для часов.` */
    const clockCustom = useMemo(() => ({one: {total: 10, step: 1}, two: {total: 55, step: 5}}), []);
    /** `Обьект начальных установок для часов.` */
    const clockCustomReps = useMemo(() => ({one: {total: 50, step: 1}, two: {total: 0, step: 0}}), []);

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

    return {
        /** `@State Доступен ли скролл страницы.` */
        isScrollEnabled,
        /** `@SetStateAction Доступен ли скролл страницы.` */
        setIsScrollEnabled,
        /** `@SetStateAction Время отдыха после упражнения, минут и секунд.` */
        setRestAfter,
        /** `@State Время отдыха после упражнения, минут и секунд.` */
        restAfter, 
        /** `Обьект начальных установок для часов.` */
        clockCustom,
        /** `Обьект начальных установок для часов.` */
        clockCustomReps,
        /** `ref` */
        refRestAfter,
        /** `ref` */
        refRuntime,
        /** `ref` */
        refReps,
        /** `@State Длительность выполнения упражнения, минут и секунд.` */
        runtime,
        /** `@SetStateAction Длительность выполнения упражнения, минут и секунд.` */
        setRuntime,
        /** `@State reps.one = Количество повторений в упражнении.` */
        reps,
        /** `@SetStateAction reps.one = Количество повторений в упражнении.` */
        setReps,
        /** `@State Имя и заметка для упражнения` */
        nameAndNote,
        /** `@SetStateAction Имя и заметка для упражнения` */
        setNameAndNote,
        /** `@State Установка общего веса снаряда.` */
        selectedWeight,
        /** `@SetStateAction Установка общего веса снаряда.` */
        setSelectedWeight,
        /** `@function onRuntime открытие часов` */
        onRuntime,
        /** `@function onRestAfter открытие часов` */
        onRestAfter,
        /** `@function onReps открытие часов` */
        onReps
    }

}