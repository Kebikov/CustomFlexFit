import { View, StyleSheet } from 'react-native';
import React, { FC, useState, useRef, useEffect } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import HeaderGoBack from '@/components/HeaderGoBack/HeaderGoBack';
import { COLOR_ROOT } from '@/constants/colors';
import Clock, { ITimeClock, IClockRef } from '@/components/Clock/Clock';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemRepsRest from '@/components/ItemRepsRest/ItemRepsRest';
import InputForAddDay from '@/components/InputForAddDay/InputForAddDay';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useLocalSearchParams } from 'expo-router';


interface INameAndNote {
    name: string;
    note: string;
}


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
    console.log(nameAndNote.name);
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

    const onRestAfter = () => refRestAfter.current?.openClock();
    const onRuntime = () => refRuntime.current?.openClock();
    const onReps = () => refReps.current?.openClock();


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

    const Inputs = (
        <>
            <Title text={t('[exercise]:modalAddRepsRest.nameAndNote')} />
            <View style={styles.bodySetText} >
                <InputForAddDay<INameAndNote>
                    keyForState='name'
                    title={t('[exercise]:addExercise.titleInput')}
                    setDayState={setNameAndNote} 
                    placeholder={t('[exercise]:addExercise.placeholderTitle')}
                    maxLength={27}
                    value={nameAndNote.name === t('[exercise]:addExercise.title') ? undefined : nameAndNote.name}
                    isNullValue={t('[exercise]:addExercise.title')}
                />

                <InputForAddDay<INameAndNote>
                    keyForState='note'
                    title={t('[exercise]:addExercise.titleInputDescription')}
                    setDayState={setNameAndNote} 
                    placeholder={t('[exercise]:addExercise.placeholderDescription')}
                    maxLength={27}
                    marginTop={10}
                    value={nameAndNote.note === t('[exercise]:addExercise.description') ? undefined : nameAndNote.note}
                    isNullValue={t('[exercise]:addExercise.description')}
                />
            </View>
        </>
    );

    const RepsRest = (
        <>
            <Title text={t('[exercise]:modalAddRepsRest.titleModalAddRepsRest')} marginTop={20} />
            <View style={styles.settings} >
                <ItemRepsRest
                    icon={ICON.REPS}
                    name={t('[exercise]:modalAddRepsRest.titleReps')}
                    values={`${reps.one} ${t('[exercise]:modalAddRepsRest.unitsReps')}`}
                    helpText={t('[exercise]:modalAddRepsRest.helpTextReps')}
                    handlePress={onReps}
                />

                <ItemRepsRest
                    icon={ICON.TIME_REST_2}
                    name={t('[exercise]:modalAddRepsRest.titleRest')}
                    values={`${restAfter.one} ${t('[exercise]:modalAddRepsRest.unitsMimutes')} ${restAfter.two} ${t('[exercise]:modalAddRepsRest.unitsSeconds')}`}
                    helpText={t('[exercise]:modalAddRepsRest.helpTextRest')}
                    marginTop={20}
                    handlePress={onRestAfter}
                />

                <ItemRepsRest
                    icon={ICON.TIME_EXERCISE_2}
                    name={t('[exercise]:modalAddRepsRest.titleExerciseTime')}
                    values={`${runtime.one} ${t('[exercise]:modalAddRepsRest.unitsMimutes')} ${runtime.two} ${t('[exercise]:modalAddRepsRest.unitsSeconds')}`}
                    helpText={t('[exercise]:modalAddRepsRest.helpTextExerciseTime')}
                    marginTop={20}
                    handlePress={onRuntime}
                />
            </View>
        </>
    );

    const Clocks = (
        <>
            <Clock 
                setSelectedTime={setRestAfter}
                selectedTime={restAfter} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={{one: {total: 10, step: 1}, two: {total: 55, step: 5}}}
                ref={refRestAfter} 
            />
            <Clock 
                setSelectedTime={setRuntime} 
                selectedTime={runtime} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={{one: {total: 10, step: 1}, two: {total: 55, step: 5}}}
                ref={refRuntime}
            />     
            <Clock 
                setSelectedTime={setReps} 
                selectedTime={reps} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={{one: {total: 50, step: 1}, two: {total: 0, step: 0}}}
                typeOfDisplay='one number'
                ref={refReps}
            />
        </>
    );


    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <HeaderGoBack/> 
            <View style={styles.container} >
                {Inputs}
                {RepsRest}
            </View>
            {Clocks}
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center',
        paddingHorizontal: 30,
        //backgroundColor: 'red',
        position: 'relative'
    },
    settings: {
        backgroundColor: COLOR_ROOT.GREY_CUSTOM(.25),
        padding: 20,
        paddingBottom: 25,
        borderRadius: 20,
        marginTop: 20
    },
    bodySetText: {
        backgroundColor: COLOR_ROOT.GREY_CUSTOM(.25),
        padding: 20,
        paddingBottom: 25,
        paddingTop: 15,
        borderRadius: 20,
        marginTop: 20
    }
});

export default ModalAddRepsRest;