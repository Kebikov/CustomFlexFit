import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';


interface IHelpText {
    text: string;
    marginTop?:number;
    fontSize?: number;
}


/**
 * @component `Пояснения к пунктам меню, инпутам и т.д.`
 * @param text Текс для компонента.
 * @param marginTop ? Отступ с верху [default - 10]
 * @param fontSize ? Размер шрифта
 */
const HelpText: FC<IHelpText> = ({
    text,
    marginTop = 10,
    fontSize = 12
}) => {

    return (
        <Text style={[styles.text, {fontSize: Platform.OS === 'ios' ? fontSize : fontSize * .9, marginTop, lineHeight: Platform.OS === 'ios' ? undefined : 13}]} >{text}</Text>
    );
};

const styles = StyleSheet.create({
    text: {
        color: COLOR_ROOT.WHITE_70,
        paddingHorizontal: 10,
    }
});

export default HelpText;