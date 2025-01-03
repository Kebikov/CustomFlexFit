import { View, Text, StyleSheet, Button, Image } from 'react-native';
import React, { FC, useState, useEffect, useRef } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import DatabaseService from '@/SQL/Database/service/DatabaseService';
import DayService from '@/SQL/Day/service/DayService';
import ImageService from '@/SQL/Database/service/ImageService';
import { FlatList } from 'react-native-gesture-handler';
import { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import { useSQLiteContext } from 'expo-sqlite';
import useHookImageCheck from '@/hook/useHookImageCheck';
import logApp, {strApp} from '@/helpers/log';
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
    withSpring
} from 'react-native-reanimated';

import Clock from '@/components/Clock/Clock';
import type { TStateDataClock } from '@/components/Clock/types';


const ShowImgInFolder: FC = () => {

     /** @param idShowClock Уникальный id для элемента на странице */
    const [idShowClock, setIdShowClock] = useState<string>('');
    console.log('idShowClock = ', idShowClock);

     /** @param electedTime Выбранное время */
    const [selectedData, setSelectedData] = useState<TStateDataClock>({
        'id_1': {
            'one': 12,
            'two': 20
        }
    });

    const press = () => {
        console.log('press');
        setIdShowClock('id_1');
    }


    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.ARCTIC}
            isScrollEnabled={false}
        >
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Clock
                    id={'id_1'}
                    idShowClock={idShowClock}
                    setIdShowClock={setIdShowClock}
                    
                    selectedData={selectedData}
                    setSelectedData={setSelectedData}

                    typeClock={{one: {total: 20, step: 2}, two: {total: 30, step: 2}}}
                    //typeOfDisplay='one number'
                    //isUsePortal={false}
                />
                <Text
                    style={{textAlign: 'center', fontSize: 20}}
                >{`one = ${selectedData['id_1'].one} & two = ${selectedData['id_1'].two}`}</Text>
                <Button title='TEST' onPress={() => press()} />
            </View>
        </WrapperScroll>
    );
};


const styles = StyleSheet.create({
    box: {
        width: '100%',
        backgroundColor: 'green',
        justifyContent: 'center'
    },
    text: {
        color: 'white',
        fontSize: 24,
        textAlign: 'center'
    }
});


export default ShowImgInFolder;