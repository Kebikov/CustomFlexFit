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
    value?: string;
    marginTop?: number;
    isNullValue?: string;
}


/**
 * @component `Inpit для страницы добавления дня.`
 * @param keyForState Ключ значение которого меняем в обьекте.
 * @param setDayState SetStateAction для установки состояния.
 * @param title Заголовок для Input.
 * @param placeholder placeholder for input
 * @param maxLength Максимальная длинна вводимого текста.
 * @param value Значение поля ввода.
 * @optional
 * @param marginTop ? Отступ с верху.
 * @param isNullValue ? Значение которое примет поле, если значение не передано и равно пустой строке.
 */
const InputForAddDay = <I,>({
    keyForState,
    setDayState,
    title,
    placeholder,
    maxLength,
    marginTop,
    value,
    isNullValue
}: IInputForAddDay<I>) => {
    console.log('VALUE >>> ', value);
    const {t} = useTranslation(['alert_and_toast', '[exercise]']);

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        const text = e.nativeEvent.text;
        if(text.length >= maxLength) showMessage(`${t('alert_and_toast:maxLength1')} ${maxLength} ${t('alert_and_toast:maxLength2')}`);
        e.persist();
        setDayState( state => ({...state, [key]: text}) );
    }

    return (
        <View style={{width: '100%', alignItems: 'center', marginTop}}>
            <View style={{alignItems: 'flex-start', width: '100%'}}>
                {/* <Description text={title} /> */}
                <Text style={styleTextInput.title} >{title}</Text>
            </View>
            
            <TextInput
                style={styleTextInput.input}
                placeholder={placeholder}
                onChange={text => {
                    if(text.nativeEvent.text === '' && isNullValue) text.nativeEvent.text = isNullValue;
                    onChangeForm(text, keyForState as string);
                }}
                maxLength={maxLength}
                placeholderTextColor={COLOR_ROOT.WHITE_40}
                value={value}
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
        paddingVertical: Platform.OS === 'ios' ? 7 : 3,
        paddingHorizontal: 10,
        fontSize: Platform.OS === 'ios' ? 17 : 14,
        color: 'white'
    },
    title: {
        color: COLOR_ROOT.WHITE_CUSTOM(.8),
        fontSize: Platform.OS === 'ios' ? 17 : 14,
    }
});

export default InputForAddDay;