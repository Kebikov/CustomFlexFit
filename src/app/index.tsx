import { View, Text, StyleSheet, ImageBackground, Platform, Button, Image, Pressable } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import DBManagment from '@/SQLite/DBManagment';
import { useHookRouter } from '@/router/useHookRouter';
import Day from '@/components/Day/Day';
import Gradient from '@/components/Gradient/Gradient';
import { icon } from '@/source/icon/icon';

import type { IDataDays } from '@/constants/dataDays';
import { COLOR_ROOT } from '@/constants/colors';


/**
 * @page Стартовая страница приложения. 
 */
const Index: FC = () => {

    const {appRouter} = useHookRouter();
    const db = useSQLiteContext();

    /**
     * @param stateDays Массив с данными дней.
     */
    const [stateDays, setStateDays] = useState<Array<IDataDays> | []>([]);
    console.log(stateDays);
    /**
     * Массив элементов карточек с днями тренировак.
     */
    const days: JSX.Element[] = stateDays.map((item, i) => <Day day={item} key={i}/>);

    const press = () => {
        appRouter.navigate('/sql');
    }

    useEffect(() => {
        (async () => {
            let data: Array<IDataDays> | null = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE__DAYS}`);
            if(data === null) data = [];
            setStateDays(data);
        })();
    },[]);


    return (
        <WrapperScroll backgroundColor={COLOR_ROOT.BACKGROUND} >
            <View style={styles.main} > 

                <View style={styles.button}>
                    <Button title='переход' onPress={() => press()} />
                </View>

                <Pressable
                    style={styles.settingsBox}
                    //onPress={() => navigate('SettingsScreen')}
                >
                    <Image source={icon.settings_icon} style={styles.settingsImg} />
                </Pressable>
                <Gradient text='Days Of Training' size={32} />
                {
                    days
                }
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    button: { 
        width: '100%'
    },
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent'
    },
    maskedView: {
        width: '100%',
        flexDirection: 'row',
    },
    linearGradient: {
        width: '100%', 
        height: 30
    },
    text: {
        fontSize: 30,
        fontWeight: '500',
        textTransform: 'uppercase',
        fontFamily: 'Sport'
    },
    settingsBox: {
        position: 'absolute',
        zIndex: 1,
        top: 20,
        right: 20,
        width: 45,
        height: 45,
        padding: 5
    },
    settingsImg: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    }
});

export default Index;
