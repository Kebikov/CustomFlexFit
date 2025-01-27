import { SQLiteDatabase } from 'expo-sqlite';
import Exercise from "../modules/Exercise";


class ExerciseService {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Exercise.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Exercise.find(db);
        console.info(JSON.stringify(result, null, 2));
    }

}

export default new ExerciseService();