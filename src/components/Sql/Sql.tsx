import { View, StyleSheet, Button, Platform } from 'react-native';
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
import List_Equipment_Service from '@/SQL/REFERENCES/List_Equipment/service/List_Equipment_Service';
import Database from '@/SQL/Database/model/Database';
import DatabaseService from '@/SQL/Database/service/DatabaseService';

import dataEquipment from '@/data/equipment/dataEquipment';
import EquipmentService from '@/SQL/Equipment/service/EquipmentService';

import { useHookRouter } from '@/router/useHookRouter'; 
import { consoleTable } from 'react-native-console-table';


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

    const dataMock: {name: string, age: number, country: string, job: string}[] = [
        { name: 'Alice', age: 25, country: 'USA', job: 'Developer' },
        { name: 'Bob', age: 30, country: 'UK', job: 'Driver' },
        { name: 'Charlie', age: 28, country: 'Canada', job: 'Engineer' },
        { name: 'Charlie', age: 28, country: 'Canada', job: 'Manager' },
        { name: 'Bob', age: 30, country: 'UK', job: 'Developer' }
    ];

    const data_Equipment = async () => {
        await EquipmentService.initializeDatabase(db, dataEquipment);
    }

    const test = async () => {
        //const days = await DayService.find(db);
        consoleTable(dataMock, 
            {
                title: 'Table User', 
                sing: 'rocket', 
                selectionTitle: 'background_green', 
                selectionHeader: 'background_magenta', 
                isShowLine: true
            }
        );
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
            <ButtonPress title='SHOW FOLDER CASHE' onPress={test} marginTop={20} />

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

