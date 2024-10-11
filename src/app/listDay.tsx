import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { SQLiteDatabase } from 'expo-sqlite';
import type { DayDTOomitId } from '@/SQLite/day/DTO/day.dto';
import { useHookRouter } from '@/router/useHookRouter';
import dayService from '@/SQLite/day/service/day.service';
import Gradient from '@/components/Gradient/Gradient';
import Day from '@/components/Day/Day';
import { icon } from '@/source/icon/icon';
import WrapperScroll from '../components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import { useSQLiteContext } from 'expo-sqlite';



/**
 * @page `Страница с днями занятий.`
 */
const ListDay: FC = () => {
    console.log('page > DayScreen');
    const {appRouter} = useHookRouter();
    const db = useSQLiteContext();

    /**
     * @param stateDays Массив с данными дней.
     */
    const [stateDays, setStateDays] = useState<Array<DayDTOomitId> | []>([]);

    useEffect(() => {
        (async () => {
            let data: Array<DayDTOomitId> = await dayService.find(db);
            setStateDays(data);
        })();
    },[]);

    return (
        <WrapperScroll backgroundColor={COLOR_ROOT.BACKGROUND} >
            <View style={styles.main} > 
                <Pressable
                    style={styles.settingsBox}
                    //onPress={() => appRouter.navigate('/settingsScreen')}
                    onPress={() => appRouter.navigate('/modal')}
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

export default ListDay;