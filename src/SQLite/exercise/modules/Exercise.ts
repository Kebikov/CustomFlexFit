import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';

class Exercise {

    /**
     * `//* Создание таблицы Exercise.`
     */
    async createTable(db: SQLiteDatabase): Promise<void> {
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_EXERCISE}
            (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                day INTEGER,
                exercise INTEGER UNIQUE,
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
     * `//* Вывод в консоль данные таблицы Exercise.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_EXERCISE}`);
        console.info(JSON.stringify(result, null, 2));
    }

    
}

export default new Exercise();