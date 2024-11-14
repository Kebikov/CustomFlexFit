import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { ExerciseDTO } from '@/SQL/Exercise/DTO/ExerciseDTO';


class Exercise {

    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_Exercise}
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                description TEXT,
                img TEXT
            )
        `);
    }

    /**
     * `//* Возврат записей в таблице.`
     */
    async find(db: SQLiteDatabase): Promise<ExerciseDTO[]> {
        const result: ExerciseDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_Exercise}`);
        return result;
    }

}

export default new Exercise();