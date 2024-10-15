import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '../../constants/colors';
import VibrationApp from '../../helpers/VibrationApp';
import useConvertFont from '../../hook/useConvertFont';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';


const ButtonAnimated = Animated.createAnimatedComponent(View);


interface IButtonGreen {
    text: string;
    handlePess: Function;
    marginTop?: number;
    marginBottom?: number;
    fontSize?: number;
    backgroundColor?: string;
    widthProcent?: number;
}


const DURATION = 100;


/**
 * @component `Кнопка салатового цвета.`
 * @param text Текст кнопки.
 * @param handlePess  Функция обработки нажатия кнопки.
 * @optional
 * @param marginTop ? Отступ с верху. [default - 0]
 * @param marginBottom ? Отступ с низу. [default - 0]
 * @param fontSize ? Размер шрифта. [default - 19]
 * @param backgroundColor ? Цвет фона кнопки. [default - COLOR_ROOT.LIME]
 * @param widthProcent ? Ширина в процентах. [default - 90]
 */
const ButtonGreen: FC<IButtonGreen> = ({
    text,
    handlePess = () => {},
    marginTop = 0,
    marginBottom = 0,
    fontSize = 19,
    backgroundColor = COLOR_ROOT.LIME,
    widthProcent = 90
}) => {

    const scale = useSharedValue(1);
    const {convertFont} = useConvertFont();
    const animatedStyle = useAnimatedStyle(() => {

        return {
            transform: [{scale: scale.value}]
        }
    });

    return (
        <ButtonAnimated style={[styles.box_button, animatedStyle, {marginBottom, marginTop}]} >
            <Pressable
                style={[styles.button, {backgroundColor, width: `${widthProcent}%`}]}
                onPress={() => {
                    VibrationApp.pressButton();
                    setTimeout(() => {
                        handlePess();
                    }, DURATION);
                }}
                onPressIn={() => {
                    VibrationApp.pressButton();
                    scale.value = .85;
                }}
                onPressOut={() => scale.value = withTiming(1, {duration: DURATION})}
            >
                <Text style={[styles.text_button, {fontSize: convertFont(fontSize)}]}>{text}</Text>
            </Pressable>
        </ButtonAnimated>
    );
};


const styles = StyleSheet.create({
    box_button: {
        width: '100%',
        height: 50,
        alignItems: 'center'
    },
    button: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
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