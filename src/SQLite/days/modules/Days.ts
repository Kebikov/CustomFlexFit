import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';

class Days {

    /**
     * `//* Создание таблицы Days.`
     */
    async createTable(db: SQLiteDatabase): Promise<void> {
        await db.runAsync(`
            CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE__DAYS}
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
    }

    /**
     * `//* Вывод в консоль данные таблицы DAYS.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE__DAYS}`);
        console.info(JSON.stringify(result, null, 2));
    }

    
}

export default new Days();