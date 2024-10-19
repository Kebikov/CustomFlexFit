import { SQLiteDatabase } from 'expo-sqlite';
import List from '../model/List';
import displayError from '@/helpers/displayError';
import { ListDTO } from '../DTO/ListDTO';


class ListService {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await List.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await List.find(db); 
        if(!result) return displayError('in List.find');
        console.info(JSON.stringify( result, null, 2));
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<ListDTO[]> {
        const result = await List.find(db);
        return result === undefined ? [] : result;
    }
}

export default new ListService();