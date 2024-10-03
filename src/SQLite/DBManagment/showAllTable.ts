import checkExistenceDataBase from './checkExistenceDataBase';
import * as SQLite from 'expo-sqlite';
import Configuration from '../../constants/сonfiguration';
import { SQLiteDatabase } from "expo-sqlite";

interface IArrayName {
	name: string;
}

/**
 * @function
 * Показ всех сушествуюших таблиц в базе данных.
 * @example await showAllTable()
 * @returns Вывод в console массива имен всех существуюших таблиц, кроме системных.
 */

const showAllTable = async (db: SQLiteDatabase, comand?: 'get'): Promise<string[] | undefined> => {

    const tables: Array<{"name": string}> = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table'`);
    const currentArrayTables: Array<string> = [];

    tables.forEach(item => {
        if(item.name !== 'sqlite_sequence') currentArrayTables.push(item.name);
    });

    if(comand === 'get') {
        return currentArrayTables;
    } else {
        console.info(`Таблицы в ${Configuration.DB_NAME}: `, currentArrayTables);
    }

};

export default showAllTable;