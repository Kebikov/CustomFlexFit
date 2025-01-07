import { View, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import { Clock } from '@/components/Clock';
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
    
    const DISPATCH = useAppDispatch();

    const {
        idShowClock, 
        setIdShowClock,
        nameAndNote,
        setNameAndNote,
        selectedWeight, 
        setSelectedWeight,
        selectedData, 
        setSelectedData,
        clockCustomReps,
        clockCustom2,
        clockCustom3
    } = useAddRepsRest(index);


    const Clocks = (
        <>
            <Clock 
                id={'reps'}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

                selectedData={selectedData}
                setSelectedData={setSelectedData}

                colorText={COLOR_ROOT.LIME_70}
                typeClock={clockCustomReps}
                typeOfDisplay='one number'
            />
            <Clock 
                id={'restAfter'}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

                selectedData={selectedData}
                setSelectedData={setSelectedData}

                colorText={COLOR_ROOT.LIME_70}
                typeClock={clockCustom2}
            />
            <Clock 
                id={'runtime'}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

                selectedData={selectedData}
                setSelectedData={setSelectedData}

                colorText={COLOR_ROOT.LIME_70}
                typeClock={clockCustom2}
            />     
        </>
    );

    const sendData = () => {
        // Формируем изминенный обьект и передаем в redux.
        const exerciseOfChanged = {
            // id: idExercise,
            // name: nameAndNote.name,
            // note: nameAndNote.note,
            // reps,
            // runtime,
            // restAfter
        };
        //DISPATCH(SET_EXERCISE_STATE(exerciseOfChanged));
        if(router.canGoBack()) router.back();
    }


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
                    onReps={() => setIdShowClock('reps')}
                    onRestAfter={() => setIdShowClock('restAfter')}
                    onRuntime={() => setIdShowClock('runtime')}
                    fontSizeTitle={fontSizeTitle}
                    borderRadiusBody={borderRadiusBody}
                    reps={selectedData['reps']}
                    runtime={selectedData['runtime']}
                    restAfter={selectedData['restAfter']}
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