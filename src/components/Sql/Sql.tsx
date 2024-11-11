import { View, StyleSheet, Button, Platform } from 'react-native';
import React, { FC } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import ButtonPress from '../ButtonPress/ButtonPress';
import Days from '@/SQLite/Day/modules/Day';
import Exercise from '@/SQLite/Exercise/modules/Exercise';
import Day from '@/SQLite/Day/modules/Day';

import DayService from '@/SQLite/Day/service/DayService';
import exerciseService from '@/SQLite/Exercise/service/ExerciseService';
import databaseService from '@/SQLite/Database/service/DatabaseService';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';
import List_Equipment_Service from '@/SQLite/REFERENCES/List_Equipment/service/List_Equipment_Service';
import Database from '@/SQLite/Database/model/Database';
import DatabaseService from '@/SQLite/Database/service/DatabaseService';

import dataEquipment from '@/data/equipment/dataEquipment';
import EquipmentService from '@/SQLite/Equipment/service/EquipmentService';

import { useHookRouter } from '@/router/useHookRouter';
import { consoleTable } from '@/helpers/log/react-native-console-table';

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

    const pressShowDays = async () => {
        await DayService.showTableInConsole(db);
    }

    const pressShowTableExercise = async () => {
        await exerciseService.showTableInConsole(db);
    }

    const del = async () => {
        await databaseService.removeDataBase(db);
    }


    const pressGet = async () => {
        appRouter.navigate('/test/showImgInFolder');
    }

    const pressDel = async () => {
        await DatabaseService.removeFolder('myImage');
    }

    const pressList_Equipment = async () => {
        await List_Equipment_Service.showTableInConsole(db);
    }

    const data_Equipment = async () => {
        await EquipmentService.initializeDatabase(db, dataEquipment);
    }

    const test = async () => {
        const result = await Day.find(db);
        consoleTable(result);
        //await Day.maxValueColumn(db, 'description');
    }

    return (
        <View style={styles.container}>
            <ButtonPress title='check DB' onPress={pressDB} />
            <ButtonPress title='All tables DB' onPress={pressDBT} />
            <ButtonPress title='Tables Days' onPress={pressShowDays} />
            <ButtonPress title='Tables Exercise' onPress={pressShowTableExercise} />
            <ButtonPress title='Tables List_Equipment' onPress={pressList_Equipment} />
            <ButtonPress title='all delete' onPress={del} type='dangerous' />

            <ButtonPress title='Add Data Equipment' onPress={data_Equipment} />

            <ButtonPress title='SHOW FOLDER IMG' onPress={pressGet} marginTop={20} />
            <ButtonPress title='remove folder img' onPress={pressDel} type='dangerous' marginTop={20} />

            <ButtonPress title='test' onPress={test} backgroundColor='green' marginTop={20} />
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