import { DATA_DAYS, IDataDays } from "@/constants/dataDays"
import CONFIGURATION from "@/constants/сonfiguration";
import checkExistenceDataBase from "./checkExistenceDataBase";
import * as SQLite from 'expo-sqlite';
import { SQLiteDatabase } from "expo-sqlite";
import showAllTable from "./showAllTable";

/**
 * `Добавление начальных данных в таблицу "Configuration.TABLE__DAYS".`
 * - Условие: сработает, если таблица пустая, в ней нет данных.
 * @param data Массив обьектов дней, при его передаче данные устанавливаются с него.
 */
const addDataStartInTableDays = async (db: SQLiteDatabase, data: IDataDays[] | null = null) => {
    try{
        /**
         * Команда для SQL по добавлению данных.
         */
        let commandStart: string = `INSERT INTO ${CONFIGURATION.TABLE__DAYS} (day, img, date, title, description, lastExercise) VALUES `;

        if(data) {
            data.forEach(item => {
                commandStart += `("${item.day}", "${item.img}", "${item.date}", "${item.title}", "${item.description}", "${item.lastExercise ? 1 : 0}"),`;
            });
        } else {
            DATA_DAYS.forEach(item => {
                commandStart += `("${item.day}", "${item.img}", "${item.date}", "${item.title}", "${item.description}", "${item.lastExercise ? 1 : 0}"),`;
            });
        }

        // Удаление зарпятой в конце команды.
        let command = commandStart.slice(0, -1);
        const isExistTable = await checkExistenceDataBase();
        if (!isExistTable) {
            console.info(`База данных ${CONFIGURATION.DB_NAME} не сушествует.`);
            return;
        }
        const days = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE__DAYS}`);

        if(days.length === 0) {
            await db.execAsync(command);
        }
    } catch(error) {
        console.error('Error in addDataStartInTableDays >>> ',  error);
        throw error;
    }

}

export default addDataStartInTableDays;