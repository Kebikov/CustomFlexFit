import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';
import { useHookRouter } from '@/router/useHookRouter';
import type { IExerciseState } from '@/redux/slice/sets.slice';
import SetEdit from '@/components/SetEdit/SetEdit';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';


interface ISetEditSwipeable {
    id: number;
}


/**
 * @component `Меню + Блок с одним повтором упражнения.`
 */
const SetEditSwipeable: FC<ISetEditSwipeable> = ({
    id
}) => {
    const index = id - 1;
    const {appRouter} = useHookRouter();
    const DISPATCH = useAppDispatch();

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);
    console.log('id >>> ', exerciseStateArray[index]);
    // const copy = (copyId: number) => {
    //     const idForCopy = exerciseStateArray.length + 1;

    //     const set: IExerciseState = {
    //         id: idForCopy,
    //         name: exerciseStateArray[copyId - 1].name,
    //         note: exerciseStateArray[copyId - 1].note,
    //         reps: exerciseStateArray[copyId - 1].reps,
    //         runtime: exerciseStateArray[copyId - 1].runtime,
    //         restAfter: exerciseStateArray[copyId - 1].restAfter
    //     }

    //     DISPATCH(SET_EXERCISE_STATE([...exerciseStateArray, set]));
    // }

    return (
        <ButtonSwipeable
            totalButton={3}
            onPressButton1={() => appRouter.navigate({pathname: '/exercise/modalAddRepsRest', params: {id}})}
            //onPressButton2={() => copy(id)}
            onPressButton3={() => {}}
            marginTop={10}
            paddingForButton={20}
        >
            <SetEdit exerciseState={exerciseStateArray[index]} />
        </ButtonSwipeable>
    );
};


const styles = StyleSheet.create({
});


export default SetEditSwipeable;