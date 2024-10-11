import { SQLiteDatabase } from "expo-sqlite";
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import Database from "../model/Database";
import * as SQLite from 'expo-sqlite';


class DatabaseService {

    /**
     * `//* Проверка сушествования базы данных.`
     */
    async checkExistenceDataBase(): Promise<boolean> {
        /**
         * Расположение каталога.
         * @returns {string} file:///data/user/0/host.exp.exponent/files/SQLite/
         */
        const dbDir = FileSystem.documentDirectory + 'SQLite/';
        /**
         * Результат проверки сушествования базы данных.
         * @returns {Object} {"exists": false, "isDirectory": false}
         */
        const dirInfo = await FileSystem.getInfoAsync(dbDir + CONFIGURATION.DB_NAME);
        if (dirInfo.exists) {
            console.info(`База данных ${CONFIGURATION.DB_NAME} сушествует.`);
            return true;
        } else {
            console.info(`База данных ${CONFIGURATION.DB_NAME} не сушествует.`);
            return false;
        }
    }

    /**
     * `//* Удаление базы даннных.`
     */
    async removeDataBase(db: SQLiteDatabase) {
        await Database.close(db);
        await Database.remove();
        console.info('Data Base Deleted.');
        await this.checkExistenceDataBase();
    }

    /**`
     * `//* Проверка таблицы на наличие данных в ней.`
     */
    async checkDataExistenceInTable(db: SQLiteDatabase, table: string) {
        const result = await Database.findCountTable(db, table);

        if(result === null || result === 0) {
            return false;
        } else {
            return true;
        }
    }

    /**
     * `//* Возврат или вывод в консоль сушествуюших таблиц в базе данных.`
     */
    async getTable(db: SQLiteDatabase, comand: 'get' | 'log') {
        const result = await Database.findTable(db);

        if(comand === 'get') {
            return result;
        } else {
            console.info(`Таблицы в ${CONFIGURATION.DB_NAME}: `, result);
        }
    }
    
    /**
     * `//* Установка версии базы данных.`
     */
    async setVersion(db: SQLiteDatabase, version: number) {
        await Database.setVersion(db, version);
    }

    /**
     * `//* Возврат версии базы данных.`
     */
    async getVersion(db: SQLiteDatabase): Promise<number> {
        const result = await Database.getVersion(db);
        return result;
    }

    /**
     * `//* включени более эфективного режима работы базы данных.`
     */
    async connectionModeWal(db: SQLiteDatabase) {
        await Database.modeWal(db);
    }

}

export default new DatabaseService();

