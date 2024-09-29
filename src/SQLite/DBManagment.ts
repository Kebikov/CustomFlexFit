import { IExercise } from '@/constants/dataStartExercise';
import { IConfiguration } from "../constants/сonfiguration";
import showTableDays from './DBManagment/showTableDays';
import Configuration from "../constants/сonfiguration";
import checkExistenceDataBase from "./DBManagment/checkExistenceDataBase";
import viewFolders from "./DBManagment/viewFolders";
import select from "./DBManagment/select";
import inset from "./DBManagment/inset";
import deleteData from "./DBManagment/deleteData";
import showAllTable from "./DBManagment/showAllTable";
import addDataStartInTableDays from "./DBManagment/addDataStartInTableDays";
import addDataStartInTableExercise from "./DBManagment/addDataStartInTableExercise";
import { updateTableExercise } from "./DBManagment/updateTableExercise";
import showTableExercise from './DBManagment/showTableExercise';
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

    // /**
    //  * @function
    //  * Вывод данных из таблицы.
    //  * @param table Имя таблицы.
    //  * @example await select(table)
    //  * @returns Вывод данных в console.log().
    //  */
    // select: Function;
    // /**
    //  * @function
    //  * Выполнение команд SQL.
    //  * @param command Команда выполнения SQL.
    //  * @example await inset(command)
    //  * @returns Promise > Данные запроса.
    //  */
    // inset: Function;
    /**
     * @function
     * Удаление данных.
     * @param name Имя для удаления.
     * @example await deleteDataBase(name)
     * @returns Вывод в console.log() содержимого папки с базами данных.
     */
    deleteData: Function;
    /**
     * @function
     * Показ всех сушествуюших таблиц в базе данных.
     * @example await showAllTable()
     * @returns Вывод в console.log() массива имен всех существуюших таблиц, кроме системных.
     */
    showAllTable: (db: SQLiteDatabase) => Promise<void>;
    /**
     * `Добавление начальных данных в таблицу с именем "Configuration.TABLE__DAYS".`
     * @example await addDataStartInTableDays()
     */
    addDataStartInTableDays: () => Promise<void>;
    /**
     * `Добавление начальных данных в таблицу с именем "Configuration.TABLE_EXERCISE".`
     * @example await addDataStartInTableExercise()
     */
    addDataStartInTableExercise: (db: SQLiteDatabase, data?: IExercise[]) => Promise<void>;
    // /**
    //  * @function
    //  * Сохранение в BD данных дня о упражнениях.
    //  * @param dataArray Массив с обьектами упражнений.
    //  * @returns {Promise<boolean>} true: добавление прошло без ошибок, false: c ошибками.
    //  */
    // updateTableExercise: (dataArray: IExercise[]) => Promise<boolean>;
}


const DBManagment: IDBManagment = {
    showTableDays,
    showTableExercise,
    checkExistenceDataBase,
    viewFolders,
    // select,
    // inset,
    deleteData,
    showAllTable,
    addDataStartInTableDays,
    addDataStartInTableExercise,
    checkDataExistenceInTable,
    // updateTableExercise
}

export default DBManagment;

