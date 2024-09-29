import { View, StyleSheet, Button } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { useSQLiteContext } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import DBManagment from '@/SQLite/DBManagment';


/**
 * @component
 * @example 
 * @returns {JSX.Element}
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
        await DBManagment.checkDataExistenceInTable(db, CONFIGURATION.TABLE_EXERCISE);
    }

    const pressShowDays = async () => {
        await DBManagment.showTableDays(db);
    }

    const pressShowTableExercise = async () => {
        await DBManagment.showTableExercise(db);
    }

    return (
        <WrapperScroll>
            <View style={styles.container}>

                <View style={styles.button}>
                    <Button title='DB' onPress={() => pressDB()} />
                </View>

                <View style={styles.button}>
                    <Button title='All tables DB' onPress={() => pressDBT()} />
                </View>

                <View style={styles.button}>
                    <Button title='Tables Days' onPress={() => pressShowDays()} />
                </View>

                <View style={styles.button}>
                    <Button title='Tables Exercise' onPress={() => pressShowTableExercise()} />
                </View>

                <View style={styles.button}>
                    <Button title='Действие' onPress={() => press()} />
                </View>

            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    button: { 
        width: '100%',
        marginTop: 10 
    }
});

export default Sql;