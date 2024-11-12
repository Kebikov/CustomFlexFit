import { SQLiteDatabase } from 'expo-sqlite';
import * as SQLite from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import * as FileSystem from 'expo-file-system';
import { TTables } from '@/constants/сonfiguration';
import { checkIfConfigIsValid } from 'react-native-reanimated/lib/typescript/reanimated2/animation/springUtils';


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
    async saveImg(options: ISave): Promise<boolean> {
        try{
            const pathToFolder = await this.getPathToFolder('myImage');
            // Копируем файл из "options.pathToFile" > в "pathToFolder + options.saveFileName"
            await FileSystem.copyAsync({from: options.pathToFile, to: pathToFolder + options.saveFileName});

            console.info('File saved!');
            return true;
        } catch(error) {
            console.error('Error in Database.saveImage() >>> ', error);
            return false;
        }
    }

    /**
     * `Получение пути к папке в телефона.`
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
            console.error('Error in Database.getPathToFolder >>>', error);
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
            console.log(JSON.stringify( files, null, 2));

            const removeJpg = files.filter(item => {
                if(item.split('.').at(-1) === 'jpg') {
                    return item;
                }
            })

            console.log('removeJpg = ', JSON.stringify( removeJpg, null, 2));

            // for(let item of removeJpg) {
            //     //console.log(myFolder + item);
            //     await FileSystem.deleteAsync(root + '/' + item);
            // }

            // const check = await FileSystem.getInfoAsync(pathPicasso);
            // console.log('check = ', check);
            // if(!check.exists) {
            //     await FileSystem.makeDirectoryAsync(pathPicasso, {intermediates: true});
            // }

            // const files = await FileSystem.readDirectoryAsync(pathPicasso);
            // console.log('pathPicasso = ', JSON.stringify( files, null, 2));
            // console.log(files.length);



            // "image1722356151124.jpg",

            // const folders1 = await FileSystem.readDirectoryAsync(pathPicasso);
            // console.log(JSON.stringify( folders1, null, 2));
            // console.log(folders1.length);

        } catch (error) {
            console.error('Error in showCasheFolder >>>', error);
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

            // console.info(`Файлы в папке "${folderName}:"`, files);
            return files;
        } catch (error) {
            console.error('Error in Database.getFilesFromFolder() >>>', error);
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

