import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { List_Equipment_DTO } from '../DTO/List_EquipmentDTO';


class List_Equipment {

    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            const result = await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_RELATION_List_Equipment}
                (
                    id_List INT REFERENCES List(id),
                    id_Equipment INT REFERENCES Equipment(id),

                    CONSTRAINT PK_List_Equipment 
                    PRIMARY KEY (id_List, id_Equipment),

                    CONSTRAINT FK_List
                    FOREIGN KEY (id_List)
                    REFERENCES List(id)
                    ON DELETE CASCADE,

                    CONSTRAINT FK_Equipment
                    FOREIGN KEY (id_Equipment)
                    REFERENCES Equipment(id)
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
    async find(db: SQLiteDatabase): Promise<List_Equipment_DTO[] | undefined> {
        try{
            const result: List_Equipment_DTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_RELATION_List_Equipment}`);
            return result;
        } catch(error) {
            console.error('Error in Days.find >>> ', error);
        }
    }

}

export default new List_Equipment();