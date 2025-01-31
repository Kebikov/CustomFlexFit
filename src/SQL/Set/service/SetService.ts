import { SQLiteDatabase } from 'expo-sqlite';
import Set from '../model/Set';
import showMessage from '@/helpers/showMessage';
import { SetDTO } from '../DTO/SetDTO';


class SetServise {

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Set.create(db);
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Set.find(db); 
        if(!result) return showMessage('in Days.find');
        console.info(JSON.stringify( result, null, 2));
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<SetDTO[]> {
        const result = await Set.find(db);
        return result === undefined ? [] : result;
    }
}

export default new SetServise();