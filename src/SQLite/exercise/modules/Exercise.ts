import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { ExerciseDTO } from '../DTO/exercise.dto';


class Exercise {

    /**
     * `//* Создание таблицы Exercise.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_EXERCISE}
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                day INTEGER,
                exercise INTEGER,
                title TEXT,
                description TEXT,
                weightNeck TEXT,
                weightOne TEXT,
                weightTwo TEXT,
                amount INTEGER,
                amountExercise INTEGER,
                isUp TEXT,
                img INTEGER,
                burpee INTEGER
            )
        `);
    }

    /**
     * `//* Возврат записей в таблице.`
     */
    async find(db: SQLiteDatabase): Promise<ExerciseDTO[]> {
        const result: ExerciseDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_EXERCISE}`);
        return result;
    }

    /**
     * `//* Возврат упражнений по дню занятий.`
     */
    async findByDay(db: SQLiteDatabase, day: number): Promise<ExerciseDTO[]> {
        const data: Array<ExerciseDTO> = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_EXERCISE} WHERE day = ${day}`);
        return data;
    }

}

export default new Exercise();