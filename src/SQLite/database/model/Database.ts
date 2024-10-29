import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import { TTables } from '@/constants/сonfiguration';


export type TExistingFolders = 'myImage';

/**
 * @param folderForSave Папка в которую сохраняем файл. Без '/' в конце. [example - 'someFolderName']
 * @param pathToFile Путь к копируемому файлу из памяти телефона в память приложения.
 * @param saveFileName Имя сохроняемого файла. [example - '123.jpg']
 */
export interface ISave {
    folderForSave: TExistingFolders;
    pathToFile: string;
    saveFileName: string;
}


class Database {

    /**
     * `//* Закрытие базы данных.`
     */
    async close(db: SQLiteDatabase) {
        await db.closeAsync();
    }

    /**
     * `//* Удаление базы даннных.`
     */
    async remove() {
        await SQLite.deleteDatabaseAsync(CONFIGURATION.DB_Name);
    }

    /**
     * `//* Возврат количества записей в таблице.`
     */
    async findCountTable(db: SQLiteDatabase, table: TTables): Promise<number | null> {
        const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${table}`);
        if(result !== null) {
            return result['COUNT(*)'];
        } else {
            return null;
        }
    }

    /**
     * `//* Возврат всех таблиц в базе данных.`
     */
    async findTable(db: SQLiteDatabase): Promise<Array<string>> {
        const tables: Array<{"name": string}> = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table'`);
        const currentArrayTables: Array<string> = [];

        tables.forEach(item => {
            if(item.name !== 'sqlite_sequence') currentArrayTables.push(item.name);
        });
        
        return currentArrayTables;
    }

    /**
     * `//* Установка версии базы данных.`
     */
    async setVersion(db: SQLiteDatabase, version: number) {
        await db.runAsync(`PRAGMA user_version = ${version}`);
    }

    /**
     * `//* Возврат версии базы данных.`
     */
    async getVersion(db: SQLiteDatabase) {
        let version = await db.getFirstAsync<{ user_version: number } | null>('PRAGMA user_version');
        if(version && version.user_version) {
            return version.user_version;
        } else {
            return 0;
        }
    }

    /**
     * `//* включени более эфективного режима работы базы данных.`
     */
    async modeWal(db: SQLiteDatabase) {
        await db.runAsync(`PRAGMA journal_mode = 'wal'`);
    }

    /**
     * `//* Запись изображения в память приложения.`
     * @param folderForSave Папка в которую сохраняем файл. Без '/' в конце. [example - 'someFolderName']
     * @param pathToFile Путь к копируемому файлу из памяти телефона в память приложения.
     * @param saveFileName Имя сохроняемого файла. [example - '123.jpg']
     */
    async save(options: ISave): Promise<boolean> {
        try{
            const root = FileSystem.documentDirectory;
            if(!root) return false;

            const pathToFolder = root + options.folderForSave + '/';

            const isExistingFolder = await FileSystem.getInfoAsync(pathToFolder);

            if(!isExistingFolder.exists) {
                await FileSystem.makeDirectoryAsync(pathToFolder, {intermediates: true});
            }

            await FileSystem.copyAsync({from: options.pathToFile, to: pathToFolder + options.saveFileName});

            console.info('File saved!');
            return true;
        } catch(error) {
            console.error('Error in Database.saveImage() >>> ', error);
            return false;
        }
    }

    /**
     * `Просмотреть содержимое папки.`
     * @param folderName Имя папки в которой необходимо просмотреть файлы.
     */
    async showFolder(folderName: TExistingFolders): Promise<void> {
        try {
            const root = await FileSystem.documentDirectory;
            if(!root) return;

            const pathForShow = root + folderName;

            const isExist = await FileSystem.getInfoAsync(pathForShow);

            if(!isExist.exists) return console.info(`Папки с именем "${folderName}" не сушествует.`);

            const files = await FileSystem.readDirectoryAsync(pathForShow);

            console.info(`Файлы в папке "${folderName}:"`, files);
        } catch (error) {
            console.error('Error in Database.showFolder() >>>', error);
        }
    }

    /**
     * `Удаление папки.`
     * @param folderName Имя папки которую необходимо удалить. 
     */
    async removeFolder(folderName: TExistingFolders): Promise<void> {
        try {
            const root = await FileSystem.documentDirectory;
            if(!root) return;

            const pathForRemove = root + folderName;

            const isExist = await FileSystem.getInfoAsync(pathForRemove);

            if(isExist.exists) {
                await FileSystem.deleteAsync(pathForRemove);
                console.info(`Папка "${folderName}" успешно удалена.`);
            } else {
                console.info(`Папки с именем "${folderName}" не сушествует.`);
            }

        } catch (error) {
            console.error('Error in Database.removeFolder() >>>', error);
        }
    }
}

export default new Database();