import { SQLiteDatabase } from 'expo-sqlite';
import Set_Equipment from '../model/Set_Equipment';


class Set_Equipment_Service {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Set_Equipment.create(db);
    }

}

export default new Set_Equipment_Service();