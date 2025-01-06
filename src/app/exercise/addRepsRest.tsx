import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import Clock from '@/components/Clock';
import { useLocalSearchParams } from 'expo-router';
import Inputs from '@/components/itemsForAddRepsRest/Inputs/Inputs';
import RepsRest from '@/components/itemsForAddRepsRest/RepsRest/RepsRest';
import Weight from '@/components/itemsForAddRepsRest/Weight/Weight';
import { useAddRepsRest } from '@/hook/hookForScreen/useAddRepsRest';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useAppDispatch } from '@/redux/store/hooks';
import { useHookRouter } from '@/router/useHookRouter';


const fontSizeTitle = 21;
const borderRadiusBody = 22;
const paddingHorizontal = 25;


/**
 * @page `Страница для добавления повторов и времени отдыха у упражнения.`
 */
const AddRepsRest: FC = () => {

    const {router} = useHookRouter();

    const {sendIndex} = useLocalSearchParams<{sendIndex: string}>();
    const index = Number(sendIndex);
    console.log('AddRepsRest index = ', index);
    const DISPATCH = useAppDispatch();

    const {
        idExercise,
        selectedWeight,
        setSelectedWeight,
        nameAndNote,
        setNameAndNote,
        reps,
        setReps,
        runtime,
        setRuntime,
        idShowClock,
        setIdShowClock,
        setRestAfter,
        restAfter,
        clockCustom,
        clockCustomReps,
        refRestAfter,
        refRuntime,
        refReps,
        onRuntime,
        onRestAfter,
        onReps
    } = useAddRepsRest(index);


    const Clocks = (
        <>
            <Clock 
                id={1}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

                setSelectedTime={setRestAfter}
                selectedTime={restAfter} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={clockCustom}
                ref={refRestAfter} 
            />
            <Clock 
                id={2}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

                setSelectedTime={setRuntime} 
                selectedTime={runtime} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={clockCustom}
                ref={refRuntime}
            />     
            <Clock 
                id={3}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

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

    const sendData = () => {
        // Формируем изминенный обьект и передаем в redux.
        const exerciseOfChanged = {
            id: idExercise,
            name: nameAndNote.name,
            note: nameAndNote.note,
            reps,
            runtime,
            restAfter
        };
        DISPATCH(SET_EXERCISE_STATE(exerciseOfChanged));
        if(router.canGoBack()) router.back();
    }


    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            isShowGoBack={{isShow: true}}
            isScrollEnabled={!idShowClock}
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
                    onReps={() => setIdShowClock(3)}
                    onRestAfter={() => setIdShowClock(1)}
                    onRuntime={() => setIdShowClock(2)}
                    fontSizeTitle={fontSizeTitle}
                    borderRadiusBody={borderRadiusBody}
                    reps={reps}
                    runtime={runtime}
                    restAfter={restAfter}
                />
                <ButtonGreen 
                    text='установить' 
                    handlePess={sendData}

                    marginTop={20}
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
        paddingBottom: 20,
    }
});

export default AddRepsRest;