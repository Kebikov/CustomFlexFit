import { View, Text, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native';
import React, { FC } from 'react';
import Description from '@/components/Description/Description';
import { COLOR_ROOT } from '@/constants/colors';
import showMessage from '@/helpers/showMessage';
import { useTranslation } from 'react-i18next';


interface IInputForAddDay<I> {
    keyForState: keyof I;
    setDayState: React.Dispatch<React.SetStateAction<I>>;
    title: string;
    placeholder: string;
    maxLength: number;
    marginTop?: number;
}


/**
 * @component `Inpit для страницы добавления дня.`
 * @param keyForState Ключ значение которого меняем в обьекте.
 * @param setDayState SetStateAction для установки состояния.
 * @param title Заголовок для Input.
 * @param placeholder placeholder for input
 * @param maxLength Максимальная длинна вводимого текста.
 * @param marginTop ? Отступ с верху.
 */
const InputForAddDay = <I,>({
    keyForState,
    setDayState,
    title,
    placeholder,
    maxLength,
    marginTop
}: IInputForAddDay<I>) => {

    const {t} = useTranslation(['alert_and_toast']);

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        const text = e.nativeEvent.text;
        if(text.length >= maxLength) showMessage(`${t('alert_and_toast:maxLength1')} ${maxLength} ${t('alert_and_toast:maxLength2')}`);
        e.persist();
        setDayState( state => ({...state, [key]: text}) );
    }

    return (
        <View style={{width: '100%', alignItems: 'center', marginTop}}>
            <View style={{alignItems: 'flex-start', width: '100%'}}>
                <Description text={title} />
            </View>
            
            <TextInput
                style={styleTextInput.input}
                placeholder={placeholder}
                onChange={text => onChangeForm(text, keyForState as string)}
                maxLength={maxLength}
                placeholderTextColor={COLOR_ROOT.WHITE_40}
            />
        </View>
    );
};

const styleTextInput = StyleSheet.create({
    input: {
        backgroundColor: COLOR_ROOT.BACKGROUND_LIGHT,
        width: '100%',
        marginTop: 3,
        borderRadius: 12,
        paddingVertical: Platform.OS === 'ios' ? 7 : 4,
        paddingHorizontal: 10,
        fontSize: Platform.OS === 'ios' ? 18 : 16,
        color: 'white'
    }
});

export default InputForAddDay;