import { SQLiteDatabase } from 'expo-sqlite';
import RepsRest from '../model/RepsRest';
import showMessage from '@/helpers/showMessage';
import { RepsRestDTO } from '../DTO/RepsRestDTO';


class RepsRestServise {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await RepsRest.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await RepsRest.find(db); 
        if(!result) return showMessage('in Days.find');
        console.info(JSON.stringify( result, null, 2));
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<RepsRestDTO[]> {
        const result = await RepsRest.find(db);
        return result === undefined ? [] : result;
    }
}

export default new RepsRestServise();