import { View, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { useHookRouter } from '@/router/useHookRouter';
import Day from '@/components/Day/Day';
import Gradient from '@/components/Gradient/Gradient';
import { icon } from '@/source/icon/icon';

import type { DaysDTOomitId } from '@/SQLite/days/DTO/days.dto';
import { COLOR_ROOT } from '@/constants/colors';


/**
 * @page Стартовая страница приложения. 
 */
const Index: FC = () => {
    console.log(2);
    const {appRouter} = useHookRouter();
    const db = useSQLiteContext();

    /**
     * @param stateDays Массив с данными дней.
     */
    const [stateDays, setStateDays] = useState<Array<DaysDTOomitId> | []>([]);


    useEffect(() => {
        (async () => {
            let data: Array<DaysDTOomitId> | null = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE__DAYS}`);
            if(data === null) data = [];
            setStateDays(data);
        })();
    },[]);


    return (
        <WrapperScroll backgroundColor={COLOR_ROOT.BACKGROUND} >
            <View style={styles.main} > 
                <Pressable
                    style={styles.settingsBox}
                    onPress={() => appRouter.navigate('/settingsScreen')}
                >
                    <Image source={icon.menu} style={styles.settingsImg} />
                </Pressable>
                <Gradient text='Days Of Training' size={32} />
                {
                    stateDays.length > 0
                    ?
                    stateDays.map((item, i) => <Day day={item} key={i}/>)
                    :
                    null
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
        top: 5,
        left: 20,
        width: 45,
        height: 45,
        padding: 5
    },
    settingsImg: {
        tintColor: 'white',
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    }
});

export default Index;



