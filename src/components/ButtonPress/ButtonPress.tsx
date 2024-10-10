import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';

interface IButton {
    title: string;
    onPress: Function;

    backgroundColor?: string;
    color?: string;
    type?: 'default' | 'dangerous';
    fontSize?: number; 
}

const colorBlue = '#007aeb';
const colorRed = 'rgba( 241, 50, 43, .9)';

/**
 * @component `Компонент кнопки.`
 * @param title Текст кнопки.
 * @param onPress Функция обработки нажатия на кнопку.
 * @optional
 * @param backgroundColor Цвет кнопки.
 * @param color Цвет текста кнопки.
 * @param type Предустановленный стиль кнопки.
 * @param fontSize Размер текста кнопки.
 */
const ButtonPress: FC<IButton> = ({
    title,
    onPress,
    backgroundColor = '',
    color = 'white',
    type = 'default',
    fontSize = 14
}) => {

    if(backgroundColor === '') {
        switch(type) {
            case 'default': 
                backgroundColor = colorBlue;
                break;
            case 'dangerous':
                backgroundColor = colorRed;
                break;
            default:
                backgroundColor = colorBlue;
                break;
        }
    }


    return (
        <Pressable 
            style={[styles.container, {backgroundColor}]} 
            onPress={() => onPress()}
        >
            <Text style={[styles.text, {color, fontSize: Platform.OS === 'ios' ? fontSize + 3 : fontSize}]} >{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: 10
    },
    text: { 
        textTransform: 'uppercase'
    }
});

export default ButtonPress;