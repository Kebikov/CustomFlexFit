import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';
import { useHookRouter } from '@/router/useHookRouter';
import type { IExerciseState } from '@/redux/slice/sets.slice';
import SetEdit from '@/components/SetEdit/SetEdit';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { COLOR_ROOT } from '@/constants/colors';
import showMessage from '@/helpers/showMessage';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import useRandomId from '@/hook/useRandomId';
import { useTranslation } from 'react-i18next';
import Title from '../Title/Title';


interface ISetEditSwipeable {
    item: IExerciseState;
    index?: number;
    drag?: () => void;
    isActive?: boolean;
    setActiveButtonId?: React.Dispatch<React.SetStateAction<string | undefined>>;
    activeButtonId?: string;
}


/**
 * @component `Меню + Блок с одним повтором упражнения.`
 * @param item Обьект с данными.
 * @optional
 * @param index ? Индекс обьекта в массиве обьектов.
 * @param drag ? Функция из DraggableFlatList, для обработки перемешения элемента.
 * @param isActive ? Булевое значение, во время перемешения true.
 * @param setActiveButtonId ? SetStateAction срабатываюший при нажатии основной кнопки и устанавливаюший id активной кнопки.
 * @param activeButtonId ? Id активной кнопки.
 */
const SetEditSwipeable: FC<ISetEditSwipeable> = ({
    item,
    index,
    drag,
    isActive,
    setActiveButtonId,
    activeButtonId
}) => {

    const {appRouter} = useHookRouter();
    const {t} = useTranslation('alert_and_toast')
    const DISPATCH = useAppDispatch();

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);
    /**
     * `Копирование элемента.`
     */
    const copy = () => {
        if(index === undefined) return console.error('not index');

        const set: IExerciseState = {
            id: useRandomId(),
            name: item.name,
            note: item.note,
            reps: item.reps,
            runtime: item.runtime,
            restAfter: item.restAfter
        }

        DISPATCH(SET_EXERCISE_STATE([...exerciseStateArray.slice(0, index), set, ...exerciseStateArray.slice(index)]));
    }
    /**
     * `Удаление элемента.`
     */
    const remove = () => {
        if(index === undefined) return console.error('not index');
        if(exerciseStateArray.length <= 1) return showMessage(t('itLastElement'));
        const filterExercise = exerciseStateArray.filter(state => state.id !== item.id);
        DISPATCH(SET_EXERCISE_STATE(filterExercise));
    }

    return (
        <ScaleDecorator>
            <ButtonSwipeable
                totalButton={3}
                onPressButton1={() => {
                    if(index === undefined) return;
                    appRouter.navigate({pathname: '/exercise/addRepsRest', params: {sendIndex: String(index)}});
                }}
                onPressButton2={() => copy()}
                onPressButton3={() => remove()}
                marginTop={10}
                borderRadiusButton={12}
                paddingInsideButton={21}
                heightOneButton={60}
                widthOneButton={60}
                iconColor={COLOR_ROOT.WHITE_CUSTOM(.8)}

                drag={drag}
                isActive={isActive}

                idButton={item.id}
                setActiveButtonId={setActiveButtonId}
                activeButtonId={activeButtonId}
            >
                <SetEdit exerciseState={item} />
            </ButtonSwipeable>
        </ScaleDecorator>
    );
};


const styles = StyleSheet.create({
});


export default SetEditSwipeable;
