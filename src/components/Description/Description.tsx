import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import useConvertFont from '@/hook/useConvertFont';
import { fontConvert } from '@/styles/font';
import { COLOR_ROOT } from '../../constants/colors';


/**
 * @component `Текст описание.`
 */
const Description  = ({
    text
}: {
    text: string
}) => {

    const {convertFont} = useConvertFont();

    return (
        <Text style={[styles.description, {fontSize: convertFont(15)}]}>{text}</Text>
    );
};

const styles = StyleSheet.create({
    description: {
        fontFamily: 'Sport400',
        letterSpacing: 1.05,
        color: COLOR_ROOT.WHITE_70,
        marginBottom: 48
    }
});

export default Description;