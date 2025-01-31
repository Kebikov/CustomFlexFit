import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { List_Equipment_DTO } from '../DTO/Set_EquipmentDTO';


class List_Equipment {


    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_RELATION_Set_Equipment}
                (
                    id_Set INT REFERENCES Set(id),
                    id_Equipment INT REFERENCES Equipment(id),

                    PRIMARY KEY (id_Set, id_Equipment),

                    REFERENCES Set(id)
                    ON DELETE CASCADE,

                    REFERENCES Equipment(id)
                    ON DELETE CASCADE
                )
            `);
        } catch (error) {
            console.error('Error in [List_Equipment.create] >>>', error);
        }
    }

    /**
     * `//* Возврат записей в таблице.`
     */
    async find(db: SQLiteDatabase): Promise<List_Equipment_DTO[] | undefined> {
        try{
            const result: List_Equipment_DTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_RELATION_Set_Equipment}`);
            return result;
        } catch(error) {
            console.error('Error in [List_Equipment.find] >>> ', error);
        }
    }

}

export default new List_Equipment();