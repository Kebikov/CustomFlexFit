import { SQLiteDatabase } from 'expo-sqlite';
import Day_Exercise from '../model/Day_Exercise';


class Day_Exercise_Service {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Day_Exercise.create(db);
    }

}

export default new Day_Exercise_Service();