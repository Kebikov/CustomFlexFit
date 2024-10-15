import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { BlurView } from 'expo-blur';
import { styleFontConvertForTitle } from '@/styles/font';
import useConvertFont from '@/hook/useConvertFont';


interface IStep {
    numberStep: number;
    text: string;
    marginTop?: number;
    marginBottom?: number;
}


/**
 * @component `Блок для страницы Guide, шаги действий.`
 * @param numberStep Цыфра номера шага.
 * @param text Текст для блока.
 * @optional
 * @param marginTop ? Отступ с верху.
 * @param marginBottom ? Отступ с низу. 
 */
const Step: FC<IStep> = ({
    numberStep,
    text,
    marginBottom = 0,
    marginTop = 0
}) => {

    const {convertFont} = useConvertFont();

    return (
        <BlurView 
            intensity={30}
            tint='light'
            style={[styles.container, {marginBottom, marginTop}]} 
        >
            <View style={styles.body} >
                <View style={styles.numBox} >
                    <View style={styles.numBody} >
                        <Text style={[styles.num, styleFontConvertForTitle.sport, {fontSize: convertFont(Platform.OS === 'ios' ? 30 : 28)}]} >{numberStep}</Text>
                    </View>
                </View>
                <View style={styles.textBox} >
                    <Text style={[styles.text, {fontSize: convertFont(Platform.OS === 'ios' ? 15 : 14)}]} >{text}</Text>
                </View>
            </View>
        </BlurView>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        padding: 10
    },
        body: {
            width: '100%',
            flexDirection: 'row',
        },
            numBox: {
                flexDirection: 'row',
                flex: .2,
                justifyContent: 'center',
                alignItems: 'center',
            },
                numBody: {
                    aspectRatio: 1,
                    width: '100%',
                    backgroundColor: COLOR_ROOT.LIME_70,
                    borderRadius: 150,
                    justifyContent: 'center',
                    alignItems: 'center',
                },
                    num: {
                        fontFamily: 'Sport500',
                        color: COLOR_ROOT.WHITE_70
                    },
        textBox: {
            flexDirection: 'row',
            flex: .8,
            paddingLeft: 12
        },
            text: {
                fontFamily: 'Sport400',
                letterSpacing: .2,
                color: COLOR_ROOT.WHITE_70
            }
});

export default Step;