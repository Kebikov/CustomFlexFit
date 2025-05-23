import { SQLiteDatabase } from 'expo-sqlite';
import Exercise from "../model/Exercise";
import type { ExerciseDTO } from '../DTO/ExerciseDTO';


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

     /** `//* Возврат всех записей.` */
    async find(db: SQLiteDatabase): Promise<ExerciseDTO[]> {
        const result = await Exercise.find(db);
        return result === undefined ? [] : result;
    }
}


export default new ExerciseService();