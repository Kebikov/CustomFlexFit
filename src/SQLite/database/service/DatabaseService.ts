import { SQLiteDatabase } from "expo-sqlite";
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import Database, { ISave, TExistingFolders } from "../model/Database";
import * as SQLite from 'expo-sqlite';
import { TTables } from "@/constants/сonfiguration";


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
        const dirInfo = await FileSystem.getInfoAsync(dbDir + CONFIGURATION.DB_Name);
        if (dirInfo.exists) {
            console.info(`База данных ${CONFIGURATION.DB_Name} сушествует.`);
            return true;
        } else {
            console.info(`База данных ${CONFIGURATION.DB_Name} не сушествует.`);
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
    async checkDataExistenceInTable(db: SQLiteDatabase, table: TTables) {
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
            console.info(`Таблицы в ${CONFIGURATION.DB_Name}: `, result);
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

    /**
     * `Сохранение изображения.`
     * @accept
     * @object {
     * @param folderForSave Папка в которую сохраняем файл. Без '/' в конце. [example - 'someFolderName']
     * @param pathToFile Путь к копируемому файлу из памяти телефона в память приложения.
     * @param saveFileName Имя сохроняемого файла. [example - '123.jpg']
     * @}
     * @return nameForSaveImage || false 
     */
    async saveImage(options: ISave): Promise<boolean> {
        try {
            const result = await Database.save({...options});
            return result;
        } catch (error) {
            console.error('Error in DatabaseService.saveImage() >>>', error);
            return false;
        }
    }

    /**
     * `Удаление папки.` 
     * @param folderName Имя папки которую необходимо удалить.
     */
    async removeFolder(folder: TExistingFolders) {
        try {
            await Database.removeFolder(folder);
        } catch (error) {
            console.error('Error in DatabaseService.removeFolder() >>>', error);
        }
    }

    /**
     * `Просмотреть содержимое папки.`
     * @param folderName Имя папки в которой необходимо просмотреть файлы.
     */
    async showFolder(folderName: TExistingFolders) {
        try {
            await Database.showFolder(folderName);
        } catch (error) {
            console.error('Error in DatabaseService.showFolder() >>>', error);
        }
    }

}

export default new DatabaseService();

