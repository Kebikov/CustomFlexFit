import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { RepsRestDTO } from '../DTO/RepsRestDTO';


class RepsRest {

    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            const result = await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_RepsRest}
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    reps INT,
                    rest INT,
                    id_List INT NOT NULL,

                    CONSTRAINT FK_RepsRest
                    FOREIGN KEY (id_List)
                    REFERENCES List (id) 
                    ON DELETE CASCADE
                )
            `);
        } catch (error) {
            console.error('Error in  >>>', error);
        }
    }

    /**
     * `//* Возврат записей в таблице.`
     */
    async find(db: SQLiteDatabase): Promise<RepsRestDTO[] | undefined> {
        try{
            const result: RepsRestDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_RepsRest}`);
            return result;
        } catch(error) {
            console.error('Error in Days.find >>> ', error);
        }
    }

}

export default new RepsRest();