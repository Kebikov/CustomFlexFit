import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import useConvertFont from '@/hook/useConvertFont';
import { styleFontConvertForTitle } from '@/styles/font';

interface ITitle {
    text: string;
    fontSize?: number;
    marginBottom?: number;
    marginTop?: number;
    oneLineText?: boolean;
}

/**
 * @component `Заголовок.`
 * @param text Отображаемый текст.
 * @optional
 * @param fontSize ? Размер шрифта. [default: 25]
 * @param marginTop ? Отступ с верху.
 * @param marginBottom ? Отступ с низу.
 * @param oneLineText ? Отображение текста в одну строку.
 */
const Title: FC<ITitle> = ({
    text,
    fontSize = 25,
    marginTop = 0,
    marginBottom = 0,
    oneLineText = false
}) => {

    const {convertFont} = useConvertFont();

    return (
        <Text 
            style={[
                styles.title, 
                styleFontConvertForTitle.sport, 
                {
                    fontSize: convertFont(fontSize), 
                    marginBottom, 
                    marginTop
                }
                ]} 
            numberOfLines={oneLineText ? 1 : 0} 
            adjustsFontSizeToFit={oneLineText} 
        >
            {text}
        </Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Sport500',
        color: 'white'
    }
});

export default Title;