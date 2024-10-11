import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '../../constants/colors';
import VibrationApp from '../../helpers/VibrationApp';
import useConvertFont from '../../hook/useConvertFont';

interface IButtonGreen {
    text: string;
    handlePess: Function;
}


/**
 * @component `Кнопка салатового цвета.`
 * @param text Текст кнопки.
 * @param handlePess Функция обработки нажатия кнопки.
 */
const ButtonGreen: FC<IButtonGreen> = ({
    text,
    handlePess
}) => {

    const {convertFont} = useConvertFont();

    return (
        <View style={styles.box_button}>
            <Pressable
                style={styles.button}
                onPress={() => {
                    VibrationApp.pressButton();
                    handlePess();
                }}
            >
                <Text style={[styles.text_button, {fontSize: convertFont(19)}]}>{text}</Text>
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    box_button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        marginBottom: 40
    },
    button: {
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_ROOT.LIME,
        borderRadius: 30
    },
    text_button: {
        textAlign: 'center',
        textAlignVertical: 'center',
        fontFamily: 'Sport600',
        textTransform: 'uppercase'
    }
});

export default ButtonGreen;