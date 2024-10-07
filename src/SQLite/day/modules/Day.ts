import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { DayDTO } from '@/SQLite/day/DTO/day.dto';

class Day {

    /**
     * `//* Создание таблицы Days.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE__DAY}
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    day INTEGER UNIQUE,
                    img INTEGER,
                    date TEXT,
                    title TEXT,
                    description TEXT,
                    lastExercise INTEGER
                )
            `);
        } catch (error) {
            console.error('Error in  >>>', error);
        }
    }

    /**
     * `//* Возврат записей в таблице.`
     */
    async find(db: SQLiteDatabase): Promise<DayDTO[] | undefined> {
        try{
            const result: DayDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE__DAY}`);
            return result;
        } catch(error) {
            console.error('Error in Days.find >>> ', error);
        }
    }

}

export default new Day();