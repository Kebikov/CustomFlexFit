import { Text, StyleSheet } from 'react-native';
import useConvertFont from '@/hook/useConvertFont';
import { COLOR_ROOT } from '../../constants/colors';
import React, { FC } from 'react';


interface IDescription {
    text: string;
    marginBottom?: number;
    marginTop?: number;
}


/**
 * @component `Описание.`
 * @param text Отображаемый текст.
 * @optional
 * @param marginTop ? Отступ с верху.
 * @param marginBottom ? Отступ с низу.
 */
const Description: FC<IDescription>  = ({
    text,
    marginTop = 0,
    marginBottom = 0
}) => {

    const {convertFont} = useConvertFont();

    return (
        <Text style={[styles.description, {fontSize: convertFont(15), marginTop, marginBottom}]}>{text}</Text>
    );
};


const styles = StyleSheet.create({
    description: {
        fontFamily: 'Sport400',
        letterSpacing: 1.05,
        color: COLOR_ROOT.WHITE_70
    }
});


export default Description;