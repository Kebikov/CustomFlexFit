import { IExercise } from '@/constants/dataStartExercise';
import checkExistenceDataBase from "./DBManagment/checkExistenceDataBase";
import viewFolders from "./DBManagment/viewFolders";
import deleteData from "./DBManagment/deleteData";
import showAllTable from "./DBManagment/showAllTable";
import addDataStartInTableDays from "./DBManagment/addDataStartInTableDays";
import addDataStartInTableExercise from "./DBManagment/addDataStartInTableExercise";
import showTableExercise from './DBManagment/showTableExercise';
import showTableDays from './DBManagment/showTableDays';
import { SQLiteDatabase } from "expo-sqlite";
import checkDataExistenceInTable from './DBManagment/checkDataExistenceInTable';

interface IDBManagment {

    /**
     * `Проверка сушествования базы данных Configuration.DB_NAME`
     */
    checkExistenceDataBase: () => Promise<boolean>;

    /**
     * `Вывод в консоль файлов внутри папки.`
     * @param folder Папка с которой выводим данные, без значения будет показано содержимое корневой папки.
     * @example await viewFolders(folder)
     */
    viewFolders: (path?: string) => void;

    /**
     * `Проверка таблицы на наличие данных в ней.`
     */
    checkDataExistenceInTable: (db: SQLiteDatabase, table: string) => Promise<boolean>;

    /**
     * `Вывод в консоль данных таблицы CONFIGURATION.TABLE__DAYS`
     */
    showTableDays: (db: SQLiteDatabase) => Promise<void>;

    /**
     * `Вывод в консоль данных таблицы CONFIGURATION.TABLE_EXERCISE`
     */
    showTableExercise: (db: SQLiteDatabase) => Promise<void>;

    /**
     * @function
     * Удаление данных.
     * @param name Имя для удаления.
     * @example await deleteDataBase(name)
     * @returns Вывод в console.log() содержимого папки с базами данных.
     */
    deleteData: (db: SQLiteDatabase) => Promise<void>;

    /**
     * @function
     * Показ всех сушествуюших таблиц в базе данных.
     * @example await showAllTable()
     * @returns Вывод в console.log() массива имен всех существуюших таблиц, кроме системных.
     */
    showAllTable: (db: SQLiteDatabase, comand?: 'get') => Promise<string | undefined>;
    /**
     * `Добавление начальных данных в таблицу с именем "Configuration.TABLE__DAYS".`
     * @example await addDataStartInTableDays()
     */
    addDataStartInTableDays: (db: SQLiteDatabase) => Promise<void>;
    /**
     * `Добавление начальных данных в таблицу с именем "Configuration.TABLE_EXERCISE".`
     * @example await addDataStartInTableExercise()
     */
    addDataStartInTableExercise: (db: SQLiteDatabase, data?: IExercise[]) => Promise<void>;

}


const DBManagment: IDBManagment = {
    showTableDays,
    showTableExercise,
    checkExistenceDataBase,
    viewFolders,
    deleteData,
    showAllTable,
    addDataStartInTableDays,
    addDataStartInTableExercise,
    checkDataExistenceInTable
}

export default DBManagment;

