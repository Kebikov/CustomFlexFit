import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';
import { useHookRouter } from '@/router/useHookRouter';
import type { IExerciseState } from '@/redux/slice/sets.slice';
import SetEdit from '@/components/SetEdit/SetEdit';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { COLOR_ROOT } from '@/constants/colors';
import showMessage from '@/helpers/showMessage';


interface ISetEditSwipeable {
    id: number;
    index: number;
}


/**
 * @component `Меню + Блок с одним повтором упражнения.`
 * @param id Id в массиве.
 * @param index Индекс элемента в массиве.
 */
const SetEditSwipeable: FC<ISetEditSwipeable> = ({
    id,
    index
}) => {

    const {appRouter} = useHookRouter();
    const DISPATCH = useAppDispatch();

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);
    console.log('id >>> ', exerciseStateArray[index]);

    const copy = (copyIndex: number) => {
        const idForCopy = exerciseStateArray.length + 1;

        const set: IExerciseState = {
            id: idForCopy,
            name: exerciseStateArray[copyIndex].name,
            note: exerciseStateArray[copyIndex].note,
            reps: exerciseStateArray[copyIndex].reps,
            runtime: exerciseStateArray[copyIndex].runtime,
            restAfter: exerciseStateArray[copyIndex].restAfter
        }

        DISPATCH(SET_EXERCISE_STATE([...exerciseStateArray, set]));
    }

    const remove = (removeIndex: number) => {
        if(exerciseStateArray.length <= 1) return showMessage('Это последий элемент.');
        const filterExercise = exerciseStateArray.filter(state => state.id !== removeIndex);
        console.log(filterExercise);
        DISPATCH(SET_EXERCISE_STATE(filterExercise));
    }

    return (
        <ButtonSwipeable
            totalButton={3}
            onPressButton1={() => appRouter.navigate({pathname: '/exercise/modalAddRepsRest', params: {id}})}
            onPressButton2={() => copy(index)}
            onPressButton3={() => remove(index)}
            marginTop={10}
            paddingForButton={22}
            iconColor={COLOR_ROOT.WHITE_CUSTOM(.8)}
        >
            <SetEdit exerciseState={exerciseStateArray[index]} />
        </ButtonSwipeable>
    );
};


const styles = StyleSheet.create({
});


export default SetEditSwipeable;