import { View, Text, StyleSheet, TextInput, NativeSyntheticEvent, TextInputChangeEventData, Platform } from 'react-native';
import React, { FC } from 'react';
import Description from '@/components/Description/Description';
import { COLOR_ROOT } from '@/constants/colors';
import { IdayState } from '@/app/day/addDay';


interface IInputForAddDay {
    keyForState: string;
    setDayState: React.Dispatch<React.SetStateAction<IdayState>>;
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
const InputForAddDay: FC<IInputForAddDay> = ({
    keyForState,
    setDayState,
    title,
    placeholder,
    maxLength,
    marginTop
}) => {

    const onChangeForm = (e: NativeSyntheticEvent<TextInputChangeEventData>, key: string) => {
        e.persist();
        setDayState( state => ({...state, [key]: e.nativeEvent.text}) );
    }

    return (
        <View style={{width: '100%', alignItems: 'center', marginTop}}>
            <View style={{alignItems: 'flex-start', width: '85%'}}>
                <Description text={title} />
            </View>
            
            <TextInput
                style={styleTextInput.input}
                placeholder={placeholder}
                onChange={text => onChangeForm(text, keyForState)}
                maxLength={maxLength}
                placeholderTextColor={COLOR_ROOT.WHITE_40}
            />
        </View>
    );
};

const styleTextInput = StyleSheet.create({
    input: {
        backgroundColor: COLOR_ROOT.BACKGROUND_LIGHT,
        width: '85%',
        marginTop: 3,
        borderRadius: 12,
        paddingVertical: Platform.OS === 'ios' ? 7 : 4,
        paddingHorizontal: 10,
        fontSize: Platform.OS === 'ios' ? 19 : 17,
        color: 'white'
    }
});

export default InputForAddDay;