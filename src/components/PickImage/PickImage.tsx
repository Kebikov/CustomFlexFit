import { View, Text, StyleSheet, Platform, Pressable, Image, Alert, ToastAndroid } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { useTranslation } from 'react-i18next';
import { useHookRouter } from '@/router/useHookRouter';
import * as ImagePicker from 'expo-image-picker';
import { useAppDispatch } from '@/redux/store/hooks';
import { ActionCreatorWithPayload as ACP}  from '@reduxjs/toolkit';
import { AppRouterTypes } from '@/router/app.router.types';
import VibrationApp from '@/helpers/VibrationApp';
import ICON from '@/source/icon';


interface IPickImage<I extends string> {
    SET_ACTIONS: ACP<any, I>;
    aspect: [number, number];
    modalPath: keyof AppRouterTypes;
    marginTop?: number;
}

// "SETUP/SET_BACKGROUND_FOR_DAY" "SETUP/SET_BACKGROUND_FOR_EXERCISE"


/**
 * @component `Выбор изображения.`
 * @param SET_ACTIONS Экшен для установки состояния выбраного изображения в redux.
 * @param aspect Соотношение сторон для выбираемого изображения, работает на Андроид. [example: [2, 4]].
 * @param modalPath Путь к модальному окну для выбора изображения из библиотеки приложения.
 * @optional
 * @param marginTop ? Отступ с верху.
 */
const PickImage = <I extends string,>({
    SET_ACTIONS,
    aspect,
    modalPath,
    marginTop
}: IPickImage<I>) => {

    const {t} = useTranslation(['alert_and_toast', '[day]']);
    const {appRouter} = useHookRouter();
    const dispatch = useAppDispatch();

    const pickImageAsync = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
            aspect
        });
    
        if (!result.canceled)  {
            dispatch(SET_ACTIONS(result.assets[0].uri));
        } else {
            Platform.OS === 'ios' 
            ?
            Alert.alert(t('alert_and_toast:imgNotSelect')) 
            : 
            ToastAndroid.show(t('alert_and_toast:imgNotSelect'), ToastAndroid.SHORT);
        }
    };

    return (
        <View
            style={[styles.container, {marginTop}]} 
        >
            <View style={styles.body} >
                <Pressable 
                    style={styles.left}
                    onPress={() => {
                        VibrationApp.pressButton();
                        appRouter.push(modalPath);
                    }}
                >
                    <View style={styles.iconBody}>
                        <Image source={ICON.GALERY} style={styles.icon} />
                    </View>
                </Pressable>
                <Pressable
                    style={styles.right} 
                    onPress={() => {
                        VibrationApp.pressButton();
                        pickImageAsync();
                    }}
                >
                    <View style={styles.buttom} >
                        <Text style={styles.text} >{t('[day]:addDay.buttonChoiceBackground')}</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 50,
    },
    body: {
        flexDirection: 'row',
        gap: 15
    },
    left: {
        alignItems: 'center',
        width: 50,
        height: '100%'
    },
    right: {
        flex: 1,
        justifyContent: 'center'
    },
    iconBody: {
        aspectRatio: 1,
        height: '100%',
        padding: 12,
        borderRadius: 150,
        backgroundColor: COLOR_ROOT.MEDIUM_GREY,
    },
    icon: {
        tintColor: 'white',
        width: '100%', 
        height: '100%', 
        objectFit: 'contain'
    },
    buttom: {
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        borderRadius: 30,
        backgroundColor: 'white',
    },
    text: {
        color: COLOR_ROOT.BACKGROUND,
        fontFamily: 'Sport600',
        fontSize: Platform.OS === 'ios' ? 15 : 13,
        textTransform: 'uppercase'
    }
});


export default PickImage;