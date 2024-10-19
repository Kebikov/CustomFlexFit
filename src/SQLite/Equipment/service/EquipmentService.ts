import { SQLiteDatabase } from 'expo-sqlite';
import displayError from '@/helpers/displayError';
import Equipment from '../model/Equipment';
import { EquipmentDTO } from '../DTO/EquipmentDTO';
import CONFIGURATION from '@/constants/сonfiguration';
import DatabaseService from '@/SQLite/Database/service/DatabaseService';


class EquipmentServise {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Equipment.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Equipment.find(db); 
        if(!result) return displayError('in Days.find');
        console.info(JSON.stringify( result, null, 2));
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<EquipmentDTO[]> {
        const result = await Equipment.find(db);
        return result === undefined ? [] : result;
    }
}

export default new EquipmentServise();