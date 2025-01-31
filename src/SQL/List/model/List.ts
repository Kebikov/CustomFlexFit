import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { ListDTO } from '../DTO/ListDTO';


class List {

    /** `//* Создание таблицы.` */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_List}
                (
                    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
                    "order" INT UNIQUE,
                    "id_Day" INT NOT NULL,
                    "id_Exercise" INT NOT NULL,

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
            console.error('Error in List.create >>>', error);
        }
    }

    /** `//* Возврат записей в таблице.` */
    async find(db: SQLiteDatabase): Promise<ListDTO[] | undefined> {
        try{
            const result: ListDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_List}`);
            return result;
        } catch(error) {
            console.error('Error in List.find >>> ', error);
        }
    }

}

export default new List();