import { SQLiteDatabase } from 'expo-sqlite';
import List_Equipment from '../model/List_Equipment';
import displayError from '@/helpers/displayError';
import { List_Equipment_DTO } from '../DTO/List_EquipmentDTO';
import CONFIGURATION from '@/constants/сonfiguration';



class List_Equipment_Service {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await List_Equipment.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const resultConfig = await db.getAllAsync(`PRAGMA table_info(${CONFIGURATION.TABLE_RELATION_List_Equipment})`);
        const result = await List_Equipment.find(db); 
        console.info('Config table "List_Equipment" ***************************************************************');
        console.info(JSON.stringify( resultConfig, null, 2));
        console.info('Data table "List_Equipment" ***************************************************************');
        console.info(JSON.stringify( result, null, 2));
    }

}

export default new List_Equipment_Service();