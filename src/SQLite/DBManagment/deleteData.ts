import * as FileSystem from 'expo-file-system';
import CONFIGURATION from '@/constants/сonfiguration';
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from "expo-sqlite";

/**
 * @function
 * Удаление данных.
 * @param name Имя для удаления.
 * @example await deleteDataBase(name)
 * @returns Вывод в console.log() содержимого папки с базами данных.
 */

export const deleteData = async (db: SQLiteDatabase) => {

    await db.closeAsync();
    await SQLite.deleteDatabaseAsync(CONFIGURATION.DB_NAME);

	// const dbDir = FileSystem.documentDirectory + 'SQLite/';

	// const dirInfo = await FileSystem.getInfoAsync(dbDir + CONFIGURATION.DB_NAME);

	// if (dirInfo.exists) {
	// 	await FileSystem.deleteAsync(dbDir + CONFIGURATION.DB_NAME, { idempotent: true });
    //     await FileSystem.deleteAsync(dbDir + CONFIGURATION.DB_NAME + '-journal', { idempotent: true });
	// }
    // const result = await FileSystem.readDirectoryAsync(dbDir);
	console.log('Data Base Deleted.');
};

export default deleteData;