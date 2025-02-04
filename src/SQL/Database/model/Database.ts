import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import { TTables } from '@/constants/сonfiguration';
import { TExistingFolders } from '../types';


class Database {

    /**
     * `//* Закрытие базы данных.`
     */
    async close(db: SQLiteDatabase) {
        try {
            await db.closeAsync();
        } catch (error) {
            console.error('Error in [Database.close] >>>', error);
        }
    }

    /**
     * `//* Удаление базы даннных.`
     */
    async remove() {
        try {
            await SQLite.deleteDatabaseAsync(CONFIGURATION.DB_Name);
        } catch (error) {
            console.error('Error in [Database.remove] >>>', error);
        }
    }

    /**
     * `//* Возврат количества записей в таблице.`
     */
    async findCountTable(db: SQLiteDatabase, table: TTables): Promise<number | null | undefined> {
        try {

            const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${table}`);
            if(result !== null) {
                return result['COUNT(*)'];
            } else {
                return null;
            }

        } catch (error) {
            console.error('Error in [Database.findCountTable] >>>', error);
        }
    }

    /**
     * `//* Возврат всех таблиц в базе данных.`
     */
    async findTable(db: SQLiteDatabase): Promise<Array<string> | undefined> {
        try {
            const tables: Array<{"name": string}> = await db.getAllAsync(`SELECT name FROM sqlite_master WHERE type='table'`);
            const currentArrayTables: Array<string> = [];

            tables.forEach(item => {
                if(item.name !== 'sqlite_sequence') currentArrayTables.push(item.name);
            });
            
            return currentArrayTables;

        } catch (error) {
            console.error('Error in  [Database.findTable] >>>', error);
        }
    }

    /**
     * `//* Установка версии базы данных.`
     */
    async setVersion(db: SQLiteDatabase, version: number) {
        try {
            await db.runAsync(`PRAGMA user_version = ${version}`);
        } catch (error) {
            console.error('Error in [Database.setVersion] >>>', error);
        }
    }

    /**
     * `//* Возврат версии базы данных.`
     */
    async getVersion(db: SQLiteDatabase) {
        try {

            let version = await db.getFirstAsync<{ user_version: number } | null>('PRAGMA user_version');
            if(version && version.user_version) {
                return version.user_version;
            } else {
                return 0;
            }
        } catch (error) {
            console.error('Error in [Database.getVersion] >>>', error);
        }
    }

    /**
     * `//* включени более эфективного режима работы базы данных.`
     */
    async modeWal(db: SQLiteDatabase) {
        try {
            await db.runAsync(`PRAGMA journal_mode = 'wal'`);
        } catch (error) {
            console.error('Error in [Database.modeWal] >>>', error);
        }
        
    }

    /**
     * `Получение пути к папке в телефона, если папка не существует она будет создана и возвращен путь к ней.`
     * @param nameFolder 
     */
    async getPathToFolder(nameFolder: TExistingFolders): Promise<string | undefined> {
        try {
            const root = FileSystem.documentDirectory;
            if(!root) return undefined;

            const pathToFolder = root + nameFolder + '/';

            const isExistingFolder = await FileSystem.getInfoAsync(pathToFolder);

            if(!isExistingFolder.exists) {
                await FileSystem.makeDirectoryAsync(pathToFolder, {intermediates: true});
            }

            return pathToFolder;
        } catch (error) {
            console.error('Error in [Database.getPathToFolder] >>>', error);
        }
    }

    /**
     * `Просмотр корневой`
     */
    async showCasheFolder() {
        try {
            const root = FileSystem.documentDirectory;
            if(!root) return undefined;

            const myFolder = root + 'myFolder/';

            const files = await FileSystem.readDirectoryAsync(myFolder);
            const removeJpg = files.filter(item => {
                if(item.split('.').at(-1) === 'jpg') {
                    return item;
                }
            })

            // for(let item of removeJpg) {
            //     await FileSystem.deleteAsync(root + '/' + item);
            // }

            // const check = await FileSystem.getInfoAsync(pathPicasso);
            // if(!check.exists) {
            //     await FileSystem.makeDirectoryAsync(pathPicasso, {intermediates: true});
            // }

            // const files = await FileSystem.readDirectoryAsync(pathPicasso);

            // const folders1 = await FileSystem.readDirectoryAsync(pathPicasso);

        } catch (error) {
            console.error('Error in [Database.showCasheFolder] >>>', error);
        }
    }

    /**
     * `Просмотреть содержимое папки и вернуть имена файлов в ней.`
     * @param folderName Имя папки в которой необходимо просмотреть файлы.
     */
    async getFilesFromFolder(folderName: TExistingFolders): Promise<string[] | void> {
        try {
            const root = await FileSystem.documentDirectory;
            if(!root) return;

            const pathForShow = root + folderName;

            const isExist = await FileSystem.getInfoAsync(pathForShow);

            if(!isExist.exists) return console.info(`Папки с именем "${folderName}" не сушествует.`);

            const files = await FileSystem.readDirectoryAsync(pathForShow);

            console.info(`Файлы в папке "${folderName}:"`, files);
            return files;
        } catch (error) {
            console.error('Error in [Database.getFilesFromFolder] >>>', error);
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
            console.error('Error in [Database.removeFolder] >>>', error);
        }
    }
}

export default new Database();

