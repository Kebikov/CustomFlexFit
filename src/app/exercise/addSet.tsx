import { View, StyleSheet } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import { Clock } from '@/components/Clock';
import { useLocalSearchParams } from 'expo-router';
import Inputs from '@/components/itemsForAddSet/Inputs/Inputs';
import Set from '@/components/itemsForAddSet/Set/Set';
import Weight from '@/components/itemsForAddSet/Weight/Weight';
import { useAddSet } from '@/hook/page/useAddSet';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useAppDispatch } from '@/redux/store/hooks';
import { useHookRouter } from '@/router/useHookRouter';
import useAppTranslation from '@/localization/helpers/useAppTranslation';


const fontSizeTitle = 21;
const borderRadiusBody = 22;
const paddingHorizontal = 25;


/** @page `//= Страница для добавления повторов и времени отдыха у упражнения.` */
const AddSet: FC = () => {

    const {router} = useHookRouter();

    const {sendIndex} = useLocalSearchParams<{sendIndex: string}>();
    const index = Number(sendIndex);
    
    const DISPATCH = useAppDispatch();
    const {t} = useAppTranslation(['[exercise]']);

    const {
        idShowClock, 
        setIdShowClock,
        titleDescription,
        setTitleDescription,
        selectedWeight, 
        setSelectedWeight,
        selectedData, 
        setSelectedData,
        clockCustomReps,
        clockCustomClock,
        idExercise,
        exercise_state
    } = useAddSet(index);
    

    const Clocks = (
        <>
            {/* Установка количества повторов в упражении. */}
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
            {/* Установка времени отдыха после выполнения упражнения. */}
            <Clock 
                id={'restAfter'}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

                selectedData={selectedData}
                setSelectedData={setSelectedData}

                colorText={COLOR_ROOT.LIME_70}
                typeClock={clockCustomClock}
            />
            {/* Установка времени выполнения упражнения. */}
            <Clock 
                id={'runtime'}
                idShowClock={idShowClock}
                setIdShowClock={setIdShowClock}

                selectedData={selectedData}
                setSelectedData={setSelectedData}

                colorText={COLOR_ROOT.LIME_70}
                typeClock={clockCustomClock}
            />     
        </>
    );

    const sendData = () => {

        // Формируем изминенный обьект и передаем в redux.
        const exerciseOfChanged = {
            id: idExercise,
            queue: exercise_state[index].queue,
            title: titleDescription.title,
            description: titleDescription.description,
            reps: selectedData['reps'],
            runtime: selectedData['runtime'],
            restAfter: selectedData['restAfter']
        };

        DISPATCH(SET_EXERCISE_STATE(exerciseOfChanged));
        
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
                    titleDescription={titleDescription}
                    setTitleDescription={setTitleDescription}
                />
                <Weight
                    selectedWeight={selectedWeight}
                    setSelectedWeight={setSelectedWeight}
                />
                <Set
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
                    text={t('[exercise]:addSet.set')} 
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

export default AddSet;