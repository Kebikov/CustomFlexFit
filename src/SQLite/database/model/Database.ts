import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';


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
    async findCountTable(db: SQLiteDatabase, table: string): Promise<number | null> {
        const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${table}`);
        console.log('findCountTable = ', result);
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
        console.log('version DB = ', version);
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
     * `//* Root folder`
     */
    async rootFolder(path: string) {
        try{
            const root = await FileSystem.documentDirectory;
            if(!root) return;
            const pathForfolder = root + 'myFolder/';
            const isExistingFolder = await FileSystem.getInfoAsync(pathForfolder);
            if(!isExistingFolder.exists) {
                await FileSystem.makeDirectoryAsync(pathForfolder, {intermediates: true});
            }
            console.log('path >>> ', path);
            //
            await FileSystem.copyAsync({from: path, to: pathForfolder + 'dfc052e5bfba.jpeg'});
            const files = await FileSystem.readDirectoryAsync(pathForfolder);
            console.log(JSON.stringify(files, null, 2));
        } catch(error) {
            console.log('Error in rootFolder >>> ', error);
        }
    }

    /**
     * `Просмотреть папку.`
     */
    async showFolder() {
        try {
            const root = await FileSystem.documentDirectory;
            if(!root) return;
            console.log('root >>> ', root);
            const pathForfolder = root + 'myFolder/';
            const isExist = await FileSystem.getInfoAsync(pathForfolder);
            if(!isExist.exists) {
                await FileSystem.makeDirectoryAsync(pathForfolder, {intermediates: true});
                console.log('Папка создана !!!');
            }

            const isExistNew = await FileSystem.getInfoAsync(pathForfolder);
            console.log(isExistNew);
            // const files = await FileSystem.readDirectoryAsync(pathForfolder);
            // console.log(JSON.stringify( files, null, 2));
        } catch (error) {
            console.error('Error in  >>>', error);
        }
    }


    async deleteFolder() {
        try {
            const root = await FileSystem.documentDirectory;
            if(!root) return;
            const pathForfolder = root + 'myFolder/';
            const isExist = await FileSystem.getInfoAsync(pathForfolder);
            if(isExist.exists) {
                await FileSystem.deleteAsync(pathForfolder);
                console.log('Папка удалена !!!');
            }

        } catch (error) {
            console.error('Error in  >>>', error);
        }
    }
}

export default new Database();