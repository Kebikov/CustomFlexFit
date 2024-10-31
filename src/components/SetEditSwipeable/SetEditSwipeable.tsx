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
import DraggableFlatList, { ScaleDecorator, RenderItemParams } from 'react-native-draggable-flatlist';


interface ISetEditSwipeable {
    item: IExerciseState;
    drag?: () => void;
    isActive?: boolean;
}


/**
 * @component `Меню + Блок с одним повтором упражнения.`
 * @param item обьект 
 */
const SetEditSwipeable: FC<ISetEditSwipeable> = ({
    item,
    drag,
    isActive
}) => {

    const {appRouter} = useHookRouter();
    const DISPATCH = useAppDispatch();

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);

    const copy = () => {
        const idForCopy = exerciseStateArray.length + 1;

        const set: IExerciseState = {
            id: idForCopy,
            name: item.name,
            note: item.note,
            reps: item.reps,
            runtime: item.runtime,
            restAfter: item.restAfter
        }

        DISPATCH(SET_EXERCISE_STATE([...exerciseStateArray, set]));
    }

    const remove = () => {
        if(exerciseStateArray.length <= 1) return showMessage('Это последий элемент.');
        const filterExercise = exerciseStateArray.filter(state => state.id !== item.id);
        console.log(filterExercise);
        DISPATCH(SET_EXERCISE_STATE(filterExercise));
    }

    return (
        <ScaleDecorator>
            <ButtonSwipeable
                totalButton={3}
                onPressButton1={() => appRouter.navigate({pathname: '/exercise/modalAddRepsRest', params: {id: item.id}})}
                onPressButton2={() => copy()}
                onPressButton3={() => remove()}
                marginTop={10}
                paddingForButton={22}
                iconColor={COLOR_ROOT.WHITE_CUSTOM(.8)}
                drag={drag}
                isActive={isActive}
            >
                <SetEdit exerciseState={item} />
            </ButtonSwipeable>
        </ScaleDecorator>
    );
};


const styles = StyleSheet.create({
});


export default SetEditSwipeable;