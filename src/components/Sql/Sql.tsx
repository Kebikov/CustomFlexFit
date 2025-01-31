import { View, StyleSheet, Button, Platform, Alert } from 'react-native';
import React, { FC } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import ButtonPress from '../ButtonPress/ButtonPress';
import Days from '@/SQL/Day/modules/Day';
import Exercise from '@/SQL/Exercise/modules/Exercise';
import Day from '@/SQL/Day/modules/Day';
import { Asset } from 'expo-asset';

import DayService from '@/SQL/Day/service/DayService';
import exerciseService from '@/SQL/Exercise/service/ExerciseService';
import databaseService from '@/SQL/Database/service/DatabaseService';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';
import List_Equipment_Service from '@/SQL/REFERENCES/Set_Equipment/service/Set_Equipment_Service';
import Database from '@/SQL/Database/model/Database';
import DatabaseService from '@/SQL/Database/service/DatabaseService';

import dataEquipment from '@/data/equipment/dataEquipment';
import EquipmentService from '@/SQL/Equipment/service/EquipmentService';

import { useHookRouter } from '@/router/useHookRouter'; 
import { consoleTable } from 'react-native-console-table';
import Title from '../Title/Title';
import ImageService from '@/SQL/Database/service/ImageService';


const colorBlue = '#007aeb';
const colorRed = 'rgba( 241, 50, 43, .9)';



/**
 * @component
 */
const Sql: FC = () => {

    const {appRouter} = useHookRouter();
    const db = useSQLiteContext();

    const pressDB = async () => {
        await databaseService.checkExistenceDataBase();
    }

    const pressDBT = async () => {
        await databaseService.getTable(db, 'log');
    }
    /** `//= Показать данные таблицы Day в консоле.`
     */
    const showDays = async () => {
        const result = await DayService.find(db);
        consoleTable(result, {title: 'Day', selectionTitle: 'background_green', selectionHeader: 'background_magenta'})
    }

    const pressShowTableExercise = async () => {
        await exerciseService.showTableInConsole(db);
    }

    /** `//= Удаление базы данных.` 
    */
    const removeDB = async () => {
        Alert.alert(
            'Удалить базу данных ?',
            'После нажатия база данных будет удалена !',
            [
                {
                    text: 'удалить',
                    onPress: async () => await databaseService.removeDataBase(db),
                    style: 'destructive'
                },
                {
                    text: 'отмена',
                    onPress: () => console.info('вы отменили удаление'),
                    style: 'cancel'
                }
            ]
        )
    }

    /** `//= Перейти на страницу с сохраненными изображениями.`
     */
    const goToPageImages = async () => {
        appRouter.navigate('/test/showImgInFolder');
    }
    
    /**
     * `Удаление папки с изображениями`
     */
    const removeFolderImages = async () => {
        Alert.alert(
            'Удалить папку с изображениями ?',
            'После нажатия папка будет удалена !',
            [
                {
                    text: 'удалить',
                    onPress: async () => await DatabaseService.removeFolder('myImage'),
                    style: 'destructive'
                },
                {
                    text: 'отмена',
                    onPress: () => console.info('вы отменили удаление'),
                    style: 'cancel'
                }
            ]
        )
    }
    /**
     *  `Показ сохраненных изображений в консоле.`
     */
    const showImgInConsole = async () => {
        const result = await ImageService.find();
    }

    const pressList_Equipment = async () => {
        await List_Equipment_Service.showTableInConsole(db);
    }

    const data_Equipment = async () => {
        const result = await EquipmentService.find(db);
        consoleTable(result);
    }

    const test = async () => {
        // const days = await DayService.find(db);
        // consoleTable(days, 
        //     {
        //         title: 'Table User', 
        //         sing: 'anchor', 
        //         selectionTitle: 'background_green', 
        //         selectionHeader: 'background_magenta', 
        //         filter: ['lastExercise']
        //     }
        // );

        appRouter.navigate('/day/listDay');
    }

    return (
        <View style={styles.container}>
            {/*//* База данных  */}
            <Title text='База данных' fontSize={18} />
            <ButtonPress title='проверка сушествования BD' onPress={pressDB} />
            <ButtonPress title='все таблицы DB' onPress={pressDBT} />
            <ButtonPress title='удаление BD' onPress={removeDB} type='dangerous' />
            {/*
            //* Images  */}
            <Title text='images' fontSize={18} marginTop={10} />
            <ButtonPress title='сохраненные img в консоль' onPress={showImgInConsole} />
            <ButtonPress title='паказать img на экране' onPress={goToPageImages} />
            <ButtonPress title='remove folder img' onPress={removeFolderImages} type='dangerous' />
            {/*
            //* Day  */}
            <Title text='Day' fontSize={18} marginTop={10} />
            <ButtonPress title='данные Day' onPress={showDays} />
            {/*
            //* Test */}
            <Title text='Test' fontSize={18} marginTop={10} />
            <ButtonPress title='test' onPress={test} backgroundColor='green' />
            {/*
            //* Others  */}
            <Title text='Others' fontSize={18} marginTop={10} />
            <ButtonPress title='данные Exercise' onPress={pressShowTableExercise} />
            <ButtonPress title='Tables List_Equipment' onPress={pressList_Equipment} />
            <ButtonPress title='Data Equipment' onPress={data_Equipment} />
            <ButtonPress title='SHOW FOLDER CASHE' onPress={test} marginTop={20} />

            
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginBottom: 20
    }
});

export default Sql;

