import { View, Text, StyleSheet, Image, Pressable, Button } from 'react-native';
import React, { FC } from 'react';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';
import { useHookRouter } from '@/router/useHookRouter';
import { COLOR_ROOT } from '../constants/colors';
import { useTranslation } from 'react-i18next';
import { TLanguage } from '../LocalStorage/model/LocalStorage';
import { AppRouterTypes } from '../router/app.router.types';
import VibrationApp from '../helpers/VibrationApp';
import Menu from '@/components/Menu/Menu';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import Test from '@/components/Test/Test';
import SelectEquipment from './exercise/selectEquipment';
import AddRepsRest from './exercise/addRepsRest';
import { logPage } from '@/helpers/log/log';
import { tableLog } from '@/helpers/log/printTableToTerminal';

const dataMock: {name: string, age: number, country: string}[] = [
    { name: 'Alice', age: 25, country: 'USA' },
    { name: 'Bob', age: 30, country: 'UK' },
    { name: 'Charlie', age: 28, country: 'Canada' },
    { name: 'Charlie', age: 28, country: 'Canada' },
    { name: 'Bob', age: 30, country: 'UK' },
];


/**
 * @page `Страница с выбором языка.`
 */
const ChoiceLanguage: FC = () => {
    logPage.page('ChoiceLanguage');
    
    const {appRouter} = useHookRouter();
    const {i18n} = useTranslation();
    const DISPATCH = useAppDispatch();

    const setLanguage = async (language: TLanguage, path: keyof AppRouterTypes) => {
        VibrationApp.pressButton();
        await i18n.changeLanguage(language);
        //appRouter.replace(path);
        DISPATCH(SET_EXERCISE_STATE('RESET'));
        //appRouter.navigate('/exercise/addExercise'); // добавление упражнения
        // appRouter.navigate('/exercise/selectEquipment'); // добавление инвентаря
        appRouter.navigate('/day/addDay'); // добавление дня
    }

    return (
        <>
            {
                0 ? 
                <SelectEquipment/>
                :
                <View style={styles.container}>
                    <Menu/>
                    <Text style={styles.text} >What is your {"\n"}language ?</Text>

                    <Pressable 
                        style={styles.language} 
                        onPress={async () => {
                            await setLanguage('English', '/day/guide');
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
                    <View style={{marginTop: 40}}>
                        <Button title='TABLE' onPress={() => tableLog(dataMock)}/>
                    </View>
                </View>
            }
        </>
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