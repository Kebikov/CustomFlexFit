import { View, Text, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import showMessage from '@/helpers/showMessage';
import { useTranslation } from 'react-i18next';


interface IInputForAdd<I extends object | number> {
    setState: React.Dispatch<React.SetStateAction<I>>;
    title: string;
    placeholder: string;
    maxLength: number;

    keyForState?: I extends object ? keyof I : never;
    value?: string;
    marginTop?: number;
    isNullValue?: string;
    keyboardType?: 'numeric' | 'default';
    onEnterOk?: Function;
}


/**
 * @component `Inpit для страницы добавления дня.`
 * @param setState set useState для установки состояния.
 * @param title Заголовок для Input.
 * @param placeholder placeholder for input
 * @param maxLength Максимальная длинна вводимого текста.
 * @param value Значение поля ввода.
 * @optional
 * @param keyboardType ? Тип используемой клавиатуры для ввода. `default: 'default'`
 * @param keyForState ? Ключ значение которого меняем в обьекте.
 * @param marginTop ? Отступ с верху.
 * @param isNullValue ? Значение которое примет поле, если значение не передано и равно пустой строке.
 * @param onEnterOk ? Функция обработки нажатия на клавиатуре OK.
 */
const InputForAdd = <I extends object | number>({
    keyForState,
    setState,
    title,
    placeholder,
    maxLength,
    marginTop,
    value,
    isNullValue,
    keyboardType = 'default',
    onEnterOk
}: IInputForAdd<I>) => {

    const {t} = useTranslation(['alert_and_toast', '[exercise]']);

    const checkLength = (length: number): boolean => {
        if(length >= maxLength) {
            showMessage(`${t('alert_and_toast:maxLength1')} ${maxLength} ${t('alert_and_toast:maxLength2')}`);
            return false;
        } else {
            return true;
        }
    }

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: keyof I) => {
        const text = e.nativeEvent.text;
        e.persist()
        setState( state => (typeof state === 'object' ? {...state, [key]: text} : state) )
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
                onChange={e => {
                    let value = e.nativeEvent.text;
                    if(!checkLength(value.length)) return;
                    if(typeof keyForState === 'string') {
                        if(value === '' && isNullValue) value = isNullValue;
                        onChangeForm(e, keyForState);
                    } else {
                        if(isNaN(Number(value))) return;
                        const num = Number(value) as I;
                        setState(num);
                    }
                }}
                maxLength={maxLength}
                placeholderTextColor={COLOR_ROOT.WHITE_40}
                value={value}
                keyboardType={keyboardType}
                onSubmitEditing={() => onEnterOk ? onEnterOk() : undefined}
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

export default InputForAdd;