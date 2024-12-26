import { View, StyleSheet, Button, Platform } from 'react-native';
import React, { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import InputOver from '@/components/InputOver/InputOver';
import { COLOR_ROOT } from '@/constants/colors';
import Clock, { ITimeClock, IClockRef } from '@/components/Clock/Clock';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemRepsRest from '@/components/ItemRepsRest/ItemRepsRest';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useLocalSearchParams } from 'expo-router';
import { useHookRouter } from '@/router/useHookRouter';
import ItemAddWeight from '@/components/ItemAddWeight/ItemAddWeight';
import HelpText from '@/components/HelpText/HelpText';
import Inputs from '@/components/itemsForAddRepsRest/Inputs/Inputs';
import RepsRest from '@/components/itemsForAddRepsRest/RepsRest/RepsRest';
import Weight from '@/components/itemsForAddRepsRest/Weight/Weight';
import { useAddRepsRest } from '@/hook/hookForScreen/useAddRepsRest';


const fontSizeTitle = 21;
const borderRadiusBody = 22;
const paddingHorizontal = 25;

/**
 * @page `Страница для добавления повторов и времени отдыха у упражнения.`
 */
const AddRepsRest: FC = () => {

    const {sendIndex} = useLocalSearchParams<{sendIndex: string}>();

    const {
        selectedWeight,
        setSelectedWeight,
        nameAndNote,
        setNameAndNote,
        reps,
        setReps,
        runtime,
        setRuntime,
        isScrollEnabled,
        setIsScrollEnabled,
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
    } = useAddRepsRest(sendIndex);


    const Clocks = (
        <>
            <Clock 
                setSelectedTime={setRestAfter}
                selectedTime={restAfter} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={clockCustom}
                ref={refRestAfter} 
            />
            <Clock 
                setSelectedTime={setRuntime} 
                selectedTime={runtime} 
                isUsePortal={false}
                colorText={COLOR_ROOT.LIME_70}
                typeClockCustom={clockCustom}
                ref={refRuntime}
            />     
            <Clock 
                
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


    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            isShowGoBack={{isShow: true}}
            isScrollEnabled={isScrollEnabled}
        >
            <View style={styles.container} >
                <Button 
                    title='TEST'
                    onPress={() => setIsScrollEnabled(false)}
                />
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
                    onReps={onReps}
                    onRestAfter={onRestAfter}
                    onRuntime={onRuntime}
                    fontSizeTitle={fontSizeTitle}
                    borderRadiusBody={borderRadiusBody}
                    reps={reps}
                    runtime={runtime}
                    restAfter={restAfter}
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