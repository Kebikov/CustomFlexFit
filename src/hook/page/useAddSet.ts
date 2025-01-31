import  { TStateDataClock } from '@/components/Clock';
import { useState, useMemo } from 'react';
import { useAppSelector } from '@/redux/store/hooks';
import { IInputsSet } from '@/components/itemsForAddSet/Inputs/types';
import { strApp } from '@/helpers/log';


export const useAddSet = (index: number) => {

    const exercise_state = useAppSelector(state => state.setsSlice.exercise_state);

    /** @param idExercise Id редактируемого упражнения. */
    const idExercise = exercise_state[index].id;

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

    /** @param nameAndNote Заголовок и описание для упражнения. */
    const [titleDescription, setTitleDescription] = useState<IInputsSet>({
        title: exercise_state[index].title,
        description: exercise_state[index].description
    });

    /** @param selectedWeight Установка общего веса снаряда. */
    const [selectedWeight, setSelectedWeight] = useState<number>(0);

    /** `Обьект начальных установок для часов.` */
    const clockCustomReps = useMemo(() => ({one: {total: 100, step: 1}, two: {total: 0, step: 0}}), []);
    /** `Обьект начальных установок для часов.` */
    const clockCustomClock = useMemo(() => ({one: {total: 59, step: 1}, two: {total: 55, step: 5}}), []);

    return {
        idShowClock, 
        setIdShowClock,
        selectedData, 
        setSelectedData,
        titleDescription, 
        setTitleDescription,
        selectedWeight, 
        setSelectedWeight,

        clockCustomReps,
        clockCustomClock,
        /** `ID редактируемого упражнения.` */
        idExercise,
        exercise_state
    }

}