import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { DayDTO, DayDTOomitId } from '@/SQLite/Day/DTO/DayDTO';


class Day {

    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            const result = await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_Day}
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    queue INT UNIQUE,
                    img TEXT,
                    date TEXT,
                    title TEXT,
                    description TEXT,
                    lastExercise INTEGER
                )
            `);
        } catch (error) {
            console.error('Error in Day.create() >>>', error);
        }
    }

    /**
     * `//* Возврат записей в таблице.`
     */
    async find(db: SQLiteDatabase): Promise<DayDTO[] | undefined> {
        try{
            const result: DayDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_Day}`);
            return result;
        } catch(error) {
            console.error('Error in Day.find >>> ', error);
        }
    }

    /**
     * `//* Добавление одной записи в таблицу.`
     */
    async insertOne(db: SQLiteDatabase, entity: DayDTOomitId) {
        try {
            const result = await db.runAsync(`
                INSERT INTO ${CONFIGURATION.TABLE_Day}
                ('queue', 'img', 'date', 'title', 'description', 'lastExercise')
                VALUES
                (?, ?, ?, ?, ?, ?)    
            `,[entity.queue, entity.img, entity.date, entity.title, entity.description, entity.lastExercise]);
        } catch (error) {
            console.error('Error in Day.insertOne() >>>', error);
        }
    }

}

export default new Day();