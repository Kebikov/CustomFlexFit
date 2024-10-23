import { StyleSheet, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useHookRouter } from '@/router/useHookRouter';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';
import { LocalStorageDTO } from '@/LocalStorage/model/LocalStorage';
import { COLOR_ROOT } from '@/constants/colors';
import DatabaseService from '../SQLite/Database/service/DatabaseService';
import { useSQLiteContext } from 'expo-sqlite';
import VibrationApp from '../helpers/VibrationApp';


/**
 * @page Стартовая страница приложения. 
 */
const Index: FC = () => {
    console.log('page > Index');
    const {appRouter} = useHookRouter();


    useEffect(() => {
        (async () => {
            const result = await LocalStorageService.getChoiceLanguage();
            console.log(result);
            //await DatabaseService.removeDataBase(db);

            if(!result) {
                appRouter.replace('/choiceLanguage');
            } else if(result) {
                appRouter.replace('/day/guide');
            } 

        })();
    }, []);


    return (
        <View style={{flex: 1, backgroundColor: COLOR_ROOT.BACKGROUND}} ></View>
    );
};


export default Index;



