import CONFIGURATION from "@/constants/сonfiguration";
import { SQLiteDatabase } from "expo-sqlite";

/**
 * `Вывод в консоль данных таблицы CONFIGURATION.TABLE__DAYS`
 */
const showTableDays = async (db: SQLiteDatabase) => {
    const result = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE__DAYS}`);

    console.info(JSON.stringify(result, null, 2));
}

export default showTableDays;