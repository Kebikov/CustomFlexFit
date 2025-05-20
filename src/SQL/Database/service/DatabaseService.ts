import { SQLiteDatabase } from "expo-sqlite";
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import Database from "../model/Database";
import type { TExistingFolders } from "../types";
import { TTables } from "@/constants/сonfiguration";
import {logApp} from "@/helpers/log";


class DatabaseService {

    /**
     * `//* Проверка сушествования базы данных.`
     */
    async checkExistenceDataBase(): Promise<boolean | undefined> {
        try {
            /**
             * Расположение каталога.
             * @returns {string} file:///data/user/0/host.exp.exponent/files/SQLite/
             */
            const dbDir = FileSystem.documentDirectory + 'SQLite/';
            /**
             * Результат проверки сушествования базы данных.
             * @returns {Object} {"exists": false, "isDirectory": false}
             */
            const dirInfo = await FileSystem.getInfoAsync(dbDir + CONFIGURATION.DB_Name);
            if (dirInfo.exists) {
                logApp.info(`База данных ${CONFIGURATION.DB_Name} сушествует.`);
                return true;
            } else {
                logApp.error(`База данных ${CONFIGURATION.DB_Name} не сушествует.`);
                return false;
            }
        } catch (error) {
            console.error('Error in DatabaseService.checkExistenceDataBase >>>', error);
        }
    }

    /**
     * `//* Удаление базы даннных.`
     */
    async removeDataBase(db: SQLiteDatabase) {
        try {
            await Database.close(db);
            await Database.remove();
            console.info('Data Base Deleted.');
            await this.checkExistenceDataBase();
        } catch (error) {
            console.error('Error in DatabaseService.removeDataBase >>>', error);
        }
    }

    /**`
     * `//* Проверка таблицы на наличие данных в ней.`
     */
    async checkDataExistenceInTable(db: SQLiteDatabase, table: TTables) {
        try {

            const result = await Database.findCountTable(db, table);

            if(result === null || result === 0) {
                return false;
            } else {
                return true;
            }

        } catch (error) {
            console.error('Error in DatabaseService.checkDataExistenceInTable >>>', error);
        }
    }

    /**
     * `//* Возврат или вывод в консоль сушествуюших таблиц в базе данных.`
     * - `get` Вернет все таблицы.
     * - `log` Покажет таблицы в консоле.
     */
    async getTable(db: SQLiteDatabase, comand: 'get' | 'log') {
        try {

            const result = await Database.findTable(db);
            if(comand === 'get') {
                return result;
            } else {
                console.info(`Таблицы в ${CONFIGURATION.DB_Name}: `, JSON.stringify( result, null, 2));
            }

        } catch (error) {
            console.error('Error in DatabaseService.getTable >>>', error);
        }
    }
    
    /**
     * `//* Установка версии базы данных.`
     */
    async setVersion(db: SQLiteDatabase, version: number) {
        try {
            await Database.setVersion(db, version);
        } catch (error) {
            console.error('Error in DatabaseService.setVersion >>>', error);
        }
        
    }

    /**
     * `//* Возврат версии базы данных.`
     */
    async getVersion(db: SQLiteDatabase): Promise<number | undefined> {
        try {
            const result = await Database.getVersion(db);
            return result;
        } catch (error) {
            console.error('Error in DatabaseService.getVersion >>>', error);
        }
    }

    /**
     * `//* включени более эфективного режима работы базы данных.`
     */
    async connectionModeWal(db: SQLiteDatabase) {
        try {
            await Database.modeWal(db);
        } catch (error) {
            console.error('Error in DatabaseService.connectionModeWal >>>', error);
        }
        
    }

    /**
     * `//* Удаление папки.` 
     * @param folderName Имя папки которую необходимо удалить.
     */
    async removeFolder(folder: TExistingFolders) {
        try {
            await Database.removeFolder(folder);
        } catch (error) {
            console.error('Error in DatabaseService.removeFolder >>>', error);
        }
    }

    /**
     * `//* Просмотреть содержимое папки.`
     * @param folderName Имя папки в которой необходимо просмотреть файлы.
     */
    async getFilesFromFolder(folderName: TExistingFolders) {
        try {
            return await Database.getFilesFromFolder(folderName);
        } catch (error) {
            console.error('Error in DatabaseService.getFilesFromFolder() >>>', error);
        }
    }

}

export default new DatabaseService();

