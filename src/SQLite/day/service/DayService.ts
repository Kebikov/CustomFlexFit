import { SQLiteDatabase } from 'expo-sqlite';
import Day from '@/SQLite/Day/modules/Day';
import displayError from '@/helpers/displayError';
import { DayDTO } from '@/SQLite/Day/DTO/DayDTO';
import CONFIGURATION from '@/constants/сonfiguration';
import DatabaseService from '@/SQLite/Database/service/DatabaseService';


class DayServise {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Day.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Day.find(db); 
        if(!result) return displayError('in Days.find');
        console.info(JSON.stringify( result, null, 2));
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<DayDTO[]> {
        const result = await Day.find(db);
        return result === undefined ? [] : result;
    }
}

export default new DayServise();