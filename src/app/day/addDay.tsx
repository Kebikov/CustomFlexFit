import { View, Text, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform, ToastAndroid, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Title from '@/components/Title/Title';
import Day from '@/SQLite/Day/modules/Day';
import DayElement from '@/components/DayElement/DayElement';
import { COLOR_ROOT } from '@/constants/colors';
import useConvertFont from '@/hook/useConvertFont';
import { useHookRouter } from '@/router/useHookRouter';
import { useAppSelector } from '@/redux/store/hooks';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import PickBackgroundForDay from '@/components/PickBackgroundForDay/PickBackgroundForDay';
import Description from '@/components/Description/Description';
import InputForAddDay from '@/components/InputForAddDay/InputForAddDay';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_BACKGROUND_FOR_DAY } from '@/redux/slice/setup.slice';
import Menu from '@/components/Menu/Menu';


export interface IdayState {
    img: number | string | undefined;
    title: string;
    description: string;
}


/**
 * @page `Добавление тренировачного дня.`
 */
const AddDay: FC = () => {
    console.log('page > AddDay');

    const {t} = useTranslation();
    const {convertFont} = useConvertFont();
    const {appRouter} = useHookRouter();
    const dispatch = useAppDispatch();

    const [dayState, setDayState] = useState<IdayState>({
        img: undefined,
        title: t('folder.day.addDay.title'),
        description: t('folder.day.addDay.description')
    });

    const selectedBackground = useAppSelector(state => state.setupSlice.selectedBackground);
    console.log('selectedBackground >>> ', selectedBackground);

    useEffect(() => {
        selectedBackground ? setDayState(state => ({...state, img: selectedBackground})) : null;
        return() => {
            dispatch(SET_BACKGROUND_FOR_DAY(''));
        }
    }, [selectedBackground]);

    return (
        
        <ImageBackground
            source={require('@/source/img/imgForScreen/4.jpg')}
            style={[styles.imageBackground]}
        >
            <Menu/>
            <View style={styles.overlay} >
                <WrapperScroll>
                    <View style={styles.containerWrapperScroll} >
                        <Title text={t('folder.day.addDay.pageTitle')} />

                        <DayElement
                            title={dayState.title}
                            description={dayState.description}
                            backgroundZero={true} 
                            img={dayState?.img}
                            isShowShadow={selectedBackground ? true : false}
                        />

                        <PickBackgroundForDay setDayState={setDayState} />

                        <InputForAddDay
                            keyForState='title'
                            title={t('general.title')}
                            setDayState={setDayState} 
                            placeholder={t('folder.day.addDay.placeholderInputTitle')}
                            maxLength={27}
                            marginTop={10}
                        />

                        <InputForAddDay
                            keyForState='description'
                            title={t('general.description')}
                            setDayState={setDayState} 
                            placeholder={t('folder.day.addDay.placeholderInputDescription')}
                            maxLength={35}
                            marginTop={10}
                        />

                        <ButtonGreen
                            text='create'
                            handlePess={() => {}}
                            marginTop={40}
                        />

                    </View>
                </WrapperScroll>
            </View>
        </ImageBackground>
        
    );
};


const styles = StyleSheet.create({
    imageBackground: {
        flex: 1
    },
        overlay: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        containerWrapperScroll: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center'
        }
});


export default AddDay;


