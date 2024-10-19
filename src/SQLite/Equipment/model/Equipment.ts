import { SQLiteDatabase } from 'expo-sqlite';
import CONFIGURATION from '@/constants/сonfiguration';
import { EquipmentDTO } from '../DTO/EquipmentDTO';


class Equipment {

    /**
     * `//* Создание таблицы.`
     */
    async create(db: SQLiteDatabase): Promise<void> {
        try {
            const result = await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${CONFIGURATION.TABLE_Equipment}
                (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    title TEXT,
                    type TEXT,
                    weight INTEGER
                )
            `);
        } catch (error) {
            console.error('Error in  >>>', error);
        }
    }

    /**
     * `//* Возврат записей в таблице.`
     */
    async find(db: SQLiteDatabase): Promise<EquipmentDTO[] | undefined> {
        try{
            const result: EquipmentDTO[] = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_Equipment}`);
            return result;
        } catch(error) {
            console.error('Error in Days.find >>> ', error);
        }
    }

}

export default new Equipment();