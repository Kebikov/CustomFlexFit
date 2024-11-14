import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { DayDTO, DayDTOomitId } from '@/SQL/Day/DTO/DayDTO';



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
    async insertOne(db: SQLiteDatabase, entity: DayDTO) {
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

    /**
     * `Количество записей в таблице.`
     */
    async total(db: SQLiteDatabase): Promise<number> {
        const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${CONFIGURATION.TABLE_Day}`);

        if(result === null || result["COUNT(*)"] === 0) {
            return 0;
        } else {
            return result["COUNT(*)"];
        }    
    }

    /**
     * `Максимальное значение в колонке, если в колонке числа.`
     */
    async maxValueColumn(db: SQLiteDatabase, column: keyof DayDTO): Promise<number | undefined> {
        try {
            const result: {MAX: unknown} | null = await db.getFirstAsync(`
                SELECT MAX(${column}) AS MAX
                FROM ${CONFIGURATION.TABLE_Day}
            `);
            if(result && result.MAX === null) return 0;
            
            if(result && typeof result.MAX === 'number') {
                return result.MAX;
            } else {
                return undefined;
            }
            
        } catch (error) {
            console.error('Error in Day.maxValue >>>', error);
        }
    }

}

export default new Day();