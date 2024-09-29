import CONFIGURATION from "@/constants/сonfiguration";
import { SQLiteDatabase } from "expo-sqlite";

/**
 * `Вывод в консоль данных таблицы CONFIGURATION.TABLE_EXERCISE`
 */
const showTableExercise = async (db: SQLiteDatabase) => {
    const result = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_EXERCISE}`);

    console.info(JSON.stringify(result, null, 2));
}

export default showTableExercise;