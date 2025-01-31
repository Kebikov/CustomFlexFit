import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { Day_Exercise_DTO } from '../DTO/Day_ExerciseDTO';


class Day_Exercise {


    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_RELATION_Day_Exercise}
                (
                    id_Day INT REFERENCES Day(id),
                    id_Exercise INT REFERENCES Exercise(id),

                    PRIMARY KEY (id_Day, id_Exercise),

                    REFERENCES Day(id)
                    ON DELETE CASCADE,

                    REFERENCES Exercise(id)
                    ON DELETE CASCADE
                )
            `);
        } catch (error) {
            console.error('Error in [Day_Exercise.create] >>>', error);
        }
    }

}

export default new Day_Exercise();