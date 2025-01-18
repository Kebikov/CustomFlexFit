import  { TStateDataClock } from '@/components/Clock';
import React, { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import type { INameAndNote, IWeightState } from '@/components/Clock/types';
import { strApp } from '@/helpers/log';


export const useAddRepsRest = (index: number) => {

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);

    /** @param idExercise Id редактируемого упражнения. */
    const idExercise = exerciseStateArray[index].id;

    /** @param idShowClock Уникальный id для элемента на странице, устанавливаем нужный id элемента для отображения компонента часов. */
    const [idShowClock, setIdShowClock] = useState<string>('');

    /** @param electedTime Выбранное время */
    const [selectedData, setSelectedData] = useState<TStateDataClock>({
        'reps': {
            'one': 10,
            'two': 0
        },
        'runtime': {
            'one': 0,
            'two': 0
        },
        'restAfter': {
            'one': 2,
            'two': 30
        }
    });

    /** @param nameAndNote Имя и заметка для упражнения. */
    const [nameAndNote, setNameAndNote] = useState<INameAndNote>({
        name: exerciseStateArray[index].name,
        note: exerciseStateArray[index].note
    });

    /** @param selectedWeight Установка общего веса снаряда. */
    const [selectedWeight, setSelectedWeight] = useState<number | IWeightState>(0);

    /** `Обьект начальных установок для часов.` */
    const clockCustomReps = useMemo(() => ({one: {total: 100, step: 1}, two: {total: 0, step: 0}}), []);
    /** `Обьект начальных установок для часов.` */
    const clockCustomClock = useMemo(() => ({one: {total: 59, step: 1}, two: {total: 55, step: 5}}), []);

    return {
        idShowClock, 
        setIdShowClock,
        selectedData, 
        setSelectedData,
        nameAndNote, 
        setNameAndNote,
        selectedWeight, 
        setSelectedWeight,

        clockCustomReps,
        clockCustomClock,
        /** `ID редактируемого упражнения.` */
        idExercise
    }

}