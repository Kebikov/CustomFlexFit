import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';
import { useHookRouter } from '@/router/useHookRouter';
import { COLOR_ROOT } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import { TLanguage } from '../LocalStorage/model/LocalStorage';
import { AppRouterTypes } from '../router/app.router.types';
import VibrationApp from '../helpers/VibrationApp';
import Menu from '@/components/Menu/Menu';


/**
 * @page `Страница с выбором языка.`
 */
const ChoiceLanguage: FC = () => {
    console.log('page > ChoiceLanguage');
    const {appRouter} = useHookRouter();
    const {i18n} = useTranslation();

    const setLanguage = (language: TLanguage, path: keyof AppRouterTypes) => {
        VibrationApp.pressButton();
        i18n.changeLanguage(language);
        appRouter.replace(path);
        //appRouter.navigate('/exercise/addExercise');
    }

    return (
        <View style={styles.container}>
            <Menu/>
            <Text style={styles.text} >What is your {"\n"}language ?</Text>

            <Pressable 
                style={styles.language} 
                onPress={async () => {
                    setLanguage('English', '/day/guide');
                }}
            >
                <View style={styles.imgBox} >
                    <Image source={require('@/source/img/flags/States.svg.jpg')} style={styles.img} />
                </View>
                <Text style={styles.textLanguage} >English</Text>
            </Pressable>

            <View style={styles.line}></View>
            
            <Pressable 
                style={styles.language} 
                onPress={async () => {
                    setLanguage('Russian', '/day/guide');
                }}
            >
                <View style={styles.imgBox} >
                    <Image source={require('@/source/img/flags/rus.jpg')} style={styles.img} />
                </View>
                <Text style={styles.textLanguage} >Russian</Text>
            </Pressable>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        //alignItems: 'center',
        paddingHorizontal: 20,
        backgroundColor: COLOR_ROOT.BACKGROUND
    },
    text: {
        fontFamily: 'Sport',
        fontSize: 34,
        color: 'white',
        marginBottom: 30
    },
    imgBox: {
        width: 50,
        height: 50
    },
    img: {
        borderRadius: 150,
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    language: {
        marginTop: 10,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'red',
        width: '100%'
    },
    textLanguage: {
        fontFamily: 'Sport',
        fontSize: 24,
        color: 'white',
        marginLeft: 30
    },
    line: {
        height: 1,
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, .3)'
    }
});

export default ChoiceLanguage;