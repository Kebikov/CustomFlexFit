import { View, Text, StyleSheet, ImageBackground, Pressable, Image, Platform, Alert, ToastAndroid, TextInput, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Title from '@/components/Title/Title';
import Day from '@/SQLite/day/modules/Day';
import DayElement from '@/components/DayElement/DayElement';
import { COLOR_ROOT } from '@/constants/colors';
import useConvertFont from '@/hook/useConvertFont';
import { useHookRouter } from '@/router/useHookRouter';
import { useAppSelector } from '@/redux/store/hooks';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import PickBackgroundForDay from '@/components/PickBackgroundForDay/PickBackgroundForDay';
import Description from '@/components/Description/Description';


export interface IdayState {
    img: number | string | undefined;
    title: string;
}


/**
 * @page `Добавление тренировачного дня.`
 */
const AddDay: FC = () => {
    console.log('page > AddDay');

    const {t} = useTranslation();
    const {convertFont} = useConvertFont();
    const {appRouter} = useHookRouter();

    const [dayState, setDayState] = useState<IdayState>({
        img: undefined,
        title: t('folder.day.addDay.title'),

    });

    const selectedBackground = useAppSelector(state => state.setupSlice.selectedBackground);

    
    

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
            e.persist();
            setDayState( state => ({...state, [key]: e.nativeEvent.text}) );
        }
        

    useEffect(() => {
        selectedBackground ? setDayState(state => ({...state, img: selectedBackground})) : null;
    }, [selectedBackground]);

    return (
        <ImageBackground
            source={require('@/source/img/imgForScreen/4.jpg')}
            style={[styles.imageBackground]}
        >
            <View style={styles.overlay} >
                <Title text={t('folder.day.addDay.pageTitle')} />

                <DayElement
                    title={dayState.title}
                    description={t('folder.day.addDay.description')}
                    backgroundZero={true} 
                    img={dayState?.img}
                    isShowShadow={selectedBackground ? true : false}
                />

                <PickBackgroundForDay setDayState={setDayState} />

                <View style={{alignItems: 'flex-start', width: '85%'}}>
                    <Description text={t('general.title')} />
                </View>
                
                <TextInput
                    style={styleTextInput.input}
                    placeholder={t('folder.day.addDay.placeholderInputTitle')}
                    onChange={text => onChangeForm(text, 'title')}
                    maxLength={27}
                    placeholderTextColor={COLOR_ROOT.WHITE_70}
                />
            </View>
        </ImageBackground>
    );
};


const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
        overlay: {
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        }
});

const styleTextInput = StyleSheet.create({
    input: {
        backgroundColor: COLOR_ROOT.BACKGROUND_LIGHT,
        width: '85%',
        marginTop: 3,
        borderRadius: 10,
        paddingVertical: 3,
        paddingHorizontal: 10,
        fontSize: 17,
        color: 'white'
    }
});


export default AddDay;


