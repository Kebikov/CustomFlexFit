import CONFIGURATION from '@/constants/сonfiguration';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from "expo-sqlite";

/**
 * @function
 * `Удаление BD.`
 */

export const deleteData = async (db: SQLiteDatabase) => {

    await db.closeAsync();
    await SQLite.deleteDatabaseAsync(CONFIGURATION.DB_NAME);

	console.info('Data Base Deleted.');
};

export default deleteData;