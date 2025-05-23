import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { BlurView } from 'expo-blur';
import { styleFontConvertForTitle } from '@/styles/font';
import useConvertFont from '@/hook/useConvertFont';


interface IStep {
     /** `Цыфра номера шага.` */
    numberStep: number;
     /** `Заголовок.` */
    title: string;
     /** `Описание.` */
    discription: string;
     /** `Отступ с верху.` */
    marginTop?: number;
     /** `Отступ с низу` */
    marginBottom?: number;
}


/** `Блок для страницы Guide, шаги действий.` */
const Step: FC<IStep> = ({
    numberStep,
    title,
    discription,
    marginBottom = 0,
    marginTop = 0
}) => {

    const {convertFont} = useConvertFont();

    return (
        <BlurView 
            intensity={30}
            tint={Platform.OS === 'ios' ? 'light' : 'default'}
            style={[styles.container, {marginBottom, marginTop}]} 
        >
            <View style={styles.body} >
                <View style={styles.numBox} >
                    <View style={styles.numBody} >
                        <Text style={[styles.num, styleFontConvertForTitle.sport, {fontSize: convertFont(Platform.OS === 'ios' ? 30 : 28)}]} >{numberStep}</Text>
                    </View>
                </View>
                <View style={styles.textBox} >
                    <Text style={styles.title} >{title}</Text>
                    <Text style={styles.text} >{discription}</Text>
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
                        textAlign: 'center',
                        marginTop: -4,
                        color: COLOR_ROOT.WHITE_70
                    },
        textBox: {
            flexDirection: 'column',
            flex: .8,
            paddingLeft: 12
        },
            title: {
                fontFamily: 'Sport400',
                fontSize: Platform.OS === 'ios' ? 17 : 15,
                letterSpacing: .5,
                color: 'white'
            },
            text: {
                marginTop: 3,
                fontFamily: 'Sport400',
                fontSize: Platform.OS === 'ios' ? 16 : 14,
                letterSpacing: .3,
                color: COLOR_ROOT.WHITE_70
            }
});

export default Step;