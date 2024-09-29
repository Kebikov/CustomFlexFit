import { DATA_DAYS, IDataDays } from "@/constants/dataDays"
import Configuration from "../../constants/сonfiguration";
import checkExistenceDataBase from "./checkExistenceDataBase";
import * as SQLite from 'expo-sqlite';

/**
 * `Добавление начальных данных в таблицу "Configuration.TABLE__DAYS".`
 * - Условие: сработает, если таблица пустая, в ней нет данных.
 * @param data Массив обьектов дней, при его передаче данные устанавливаются с него.
 * @example await addDataStartInTableDays()
 */
const addDataStartInTableDays = async (data: IDataDays[] | null = null) => {
    /**
     * Команда для SQL по добавлению данных.
     */
    let commandStart: string = `INSERT INTO ${Configuration.TABLE__DAYS} (day, img, date, title, description, lastExercise) VALUES `;

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
		console.info(`База данных ${Configuration.DB_NAME} не сушествует.`);
		return;
	}

    const db = await SQLite.openDatabaseAsync(Configuration.DB_NAME);

    const days = await db.getAllAsync(`SELECT * FROM ${Configuration.TABLE__DAYS}`);
    if(days.length === 0) {
        const result = await db.runAsync(command);
        console.log('addDataStartInTableDays = ', result.changes);
    }

}

export default addDataStartInTableDays;