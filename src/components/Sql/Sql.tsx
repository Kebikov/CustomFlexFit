import { View, StyleSheet, Button, Platform } from 'react-native';
import React, { FC } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import ButtonPress from '../ButtonPress/ButtonPress';
import Days from '@/SQLite/day/modules/Day';
import Exercise from '@/SQLite/exercise/modules/Exercise';

import dayService from '@/SQLite/day/service/day.service';
import exerciseService from '@/SQLite/exercise/service/exercise.service';
import databaseService from '@/SQLite/database/service/DatabaseService';
import LocalStorageService from '@/LocalStorage/service/LocalStorage.service';


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



    return (
        <View style={styles.container}>
            <ButtonPress title='check DB' onPress={pressDB} />
            <ButtonPress title='All tables DB' onPress={pressDBT} />
            <ButtonPress title='Tables Days' onPress={pressShowDays} />
            <ButtonPress title='Tables Exercise' onPress={pressShowTableExercise} />
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