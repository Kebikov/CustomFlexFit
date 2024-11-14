import { SQLiteDatabase } from 'expo-sqlite';
import showMessage from '@/helpers/showMessage';
import Equipment from '../model/Equipment';
import { EquipmentDTO } from '../DTO/EquipmentDTO';
import CONFIGURATION from '@/constants/сonfiguration';
import DatabaseService from '@/SQL/Database/service/DatabaseService';


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
        if(!result) return showMessage('in Days.find');
        console.info(JSON.stringify( result, null, 2));
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<EquipmentDTO[]> {
        const result = await Equipment.find(db);
        return result === undefined ? [] : result;
    }

    /**
     * `//* Добавление начальных данных.`
     */
    async initializeDatabase(db: SQLiteDatabase, data: Omit<EquipmentDTO, 'id'>[]) {

        for(const item of data) {
            await Equipment.insertOne(db, {
                title: item.title,
                type: item.type,
                weight: item.weight,
                img: item.img
            });
        }
    }
}

export default new EquipmentServise();