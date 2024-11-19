import { View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { useHookRouter } from '@/router/useHookRouter';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';
import { COLOR_ROOT } from '@/constants/colors';
import Database from '@/SQL/Database/model/Database';
import { useAppDispatch } from '@/redux/store/hooks';
import { SET_PATH_TO_IMAGE_FOLDER } from '@/redux/slice/setup.slice';


/**
 * @page Стартовая страница приложения. 
 */
const Index: FC = () => {
    console.debug('page > Index');

    const {appRouter} = useHookRouter();
    const DISPATCH = useAppDispatch();

    useEffect(() => {
        (async () => {
            // Получение и установка, пути к папке с изображениями.
            const pathToImages = await Database.getPathToFolder('myImage');
            if(pathToImages) DISPATCH(SET_PATH_TO_IMAGE_FOLDER(pathToImages));

            const result = await LocalStorageService.getChoiceLanguage();
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



