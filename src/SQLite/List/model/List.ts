import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { ListDTO } from '../DTO/ListDTO';


class List {

    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            const result = await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_List}
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    queue INTEGER UNIQUE,
                    id_Day INTEGER NOT NULL,
                    id_Exercise INTEGER NOT NULL,

                    CONSTRAINT FK_List_id_Day
                    FOREIGN KEY (id_Day)
                    REFERENCES Day (id)
                    ON DELETE CASCADE,

                    CONSTRAINT FK_List_id_Exercise
                    FOREIGN KEY (id_Day)
                    REFERENCES Day (id)
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
    async find(db: SQLiteDatabase): Promise<ListDTO[] | undefined> {
        try{
            const result: ListDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_List}`);
            return result;
        } catch(error) {
            console.error('Error in Days.find >>> ', error);
        }
    }

}

export default new List();