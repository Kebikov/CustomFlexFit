import { View, StyleSheet, Button, Platform } from 'react-native';
import React, { FC } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import ButtonPress from '../ButtonPress/ButtonPress';
import Days from '@/SQLite/Day/modules/Day';
import Exercise from '@/SQLite/Exercise/modules/Exercise';

import dayService from '@/SQLite/Day/service/DayService';
import exerciseService from '@/SQLite/Exercise/service/ExerciseService';
import databaseService from '@/SQLite/Database/service/DatabaseService';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';
import List_Equipment_Service from '@/SQLite/REFERENCES/List_Equipment/service/List_Equipment_Service';


const colorBlue = '#007aeb';
const colorRed = 'rgba( 241, 50, 43, .9)';


/**
 * @component
 */
const Sql: FC = () => {

    const db = useSQLiteContext();

    const pressDB = async () => {
        await databaseService.checkExistenceDataBase();
    }

    const pressDBT = async () => {
        await databaseService.getTable(db, 'log');
    }

    const pressShowDays = async () => {
        await dayService.showTableInConsole(db);
    }

    const pressShowTableExercise = async () => {
        await exerciseService.showTableInConsole(db);
    }

    const del = async () => {
        await databaseService.removeDataBase(db);
    }


    const pressSet = async () => {
        await LocalStorageService.setChoiceLanguage('English');
    }

    const pressGet = async () => {
        console.log(await LocalStorageService.getChoiceLanguage());
    }

    const pressDel = async () => {
        await LocalStorageService.removeChoiceLanguage();
    }

    const pressList_Equipment = async () => {
        await List_Equipment_Service.showTableInConsole(db);
    }



    return (
        <View style={styles.container}>
            <ButtonPress title='check DB' onPress={pressDB} />
            <ButtonPress title='All tables DB' onPress={pressDBT} />
            <ButtonPress title='Tables Days' onPress={pressShowDays} />
            <ButtonPress title='Tables Exercise' onPress={pressShowTableExercise} />
            <ButtonPress title='Tables List_Equipment' onPress={pressList_Equipment} />
            <ButtonPress title='all delete' onPress={del} type='dangerous' />
            <ButtonPress title='set' onPress={pressSet} />
            <ButtonPress title='get' onPress={pressGet} />
            <ButtonPress title='remove' onPress={pressDel} />
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