import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import useConvertFont from '@/hook/useConvertFont';
import { fontConvert } from '@/styles/font';

/**
 * @component `Заголовок.`
 */
const Title  = ({
    text
}: {
    text: string
}) => {

    const {convertFont} = useConvertFont();

    return (
        <Text style={[styles.title, fontConvert.sport, {fontSize: convertFont(25)}]}>{text}</Text>
    );
};

const styles = StyleSheet.create({
    title: {
        fontFamily: 'Sport500',
        color: 'white',
        marginBottom: 40
    }
});

export default Title;