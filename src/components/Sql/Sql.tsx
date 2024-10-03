import { View, StyleSheet, Button, Platform } from 'react-native';
import React, { FC } from 'react';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import DBManagment from '@/SQLite/DBManagment';
import ButtonPress from '../ButtonPress/ButtonPress';
import Days from '@/SQLite/days/modules/Days';
import Exercise from '@/SQLite/exercise/modules/Exercise';


const colorBlue = '#007aeb';
const colorRed = 'rgba( 241, 50, 43, .9)';


/**
 * @component
 */
const Sql: FC = () => {

    const db = useSQLiteContext();

    const pressDB = async () => {
        await DBManagment.checkExistenceDataBase();
    }

    const pressDBT = async () => {
        await DBManagment.showAllTable(db);
    }

    const press = async () => {
        console.info('test press');
    }

    const pressShowDays = async () => {
        await Days.showTableInConsole(db);
    }

    const pressShowTableExercise = async () => {
        await Exercise.showTableInConsole(db);
    }

    const del = async () => {
        await DBManagment.deleteData(db);
    }



    return (
        <View style={styles.container}>

            <ButtonPress title='check DB' onPress={pressDB} />
            <ButtonPress title='All tables DB' onPress={pressDBT} />
            <ButtonPress title='Tables Days' onPress={pressShowDays} />
            <ButtonPress title='Tables Exercise' onPress={pressShowTableExercise} />
            <ButtonPress title='all delete' onPress={del} type='dangerous' />
            <ButtonPress title='действие' onPress={press} />

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