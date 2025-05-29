import { SQLiteDatabase } from 'expo-sqlite';
import Day from '@/SQL/Day/model/Day';
import showMessage from '@/utils/showMessage';
import { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import HelperUtils from '@/utils/HelperUtils';
import { consoleTable } from 'react-native-console-table';



class DayServise {
    /**
     * `//* Показать все данные в таблице.`
     */
    async show(db: SQLiteDatabase) {
        try {
            const result = await this.find(db);
            consoleTable(result, {title: 'Day', selectionTitle: 'background_green', selectionHeader: 'background_magenta'});
        } catch (error) {
            console.error('Error in [DayServise.show] >>>', error);
        }
    }

    /**
     * `//* Создание таблицы.`
     */
    async createTable(db: SQLiteDatabase) {
        await Day.create(db);
        const foo = await Day.findByIdAndUpdate(db, {id: 12, title: 'sdf'})
    }

    /**
     * `//* Вывод в консоль данные таблицы.`
     */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Day.find(db);
        if(!result) return showMessage('Ошибка получения данных в таблице "Day".');
        if(Array.isArray(result) && result.length === 0) return showMessage('Нет данных в таблице "Day".');
        
        if(typeof result[0] === 'object') {
            //consoleTable(result);
        }
    }

    /**
     * `//* Возврат всех записей.`
     */
    async find(db: SQLiteDatabase): Promise<DayDTO[]> {
        const result = await Day.find(db);
        return result === undefined ? [] : result;
    }

    /**
     * `//* Возврат записи по ID.`
     */
    async findById(db: SQLiteDatabase, id: number): Promise<DayDTO | null | undefined> {
        try {
            const result = await Day.findById(db, id);
            return result ? result : null;
        } catch (error) {
            console.error('Error in [DayServise.findById] >>>', error);
        }
    }

    /**
     * `//* Добавление одной записи в таблицу.`
     */
    async insertOne(db: SQLiteDatabase, entity: App.StrictOmit<DayDTO, 'id'>): Promise<boolean> {
        try {
            // Если очередь равна 0, усанавливаем очередь.
            if(entity.queue === 0) {
                const maxQueue = await Day.maxValueColumn(db, 'queue');
                if(maxQueue === undefined) return false;
                entity.queue = maxQueue + 1;
            }

            // Заполняем поле даты, если пустое.
            if(entity.date === '') {
                const {textCurrentDay} = HelperUtils.getCurrentDateInFormatArray();
                entity.date = textCurrentDay;
            }
             // Добавление записи.
            await Day.insertOne(db, entity);
             // Показ всей таблицы.
            await this.show(db);
            return true;
        } catch (error) {
            console.error('Error in [DayServise.insertOne] >>>', error);
            return false;
        }
    }

    /**
     * `//* Максимальное значение в колонке, если в колонке числа.`
     */
    async maxValueColumn(db: SQLiteDatabase, column: keyof DayDTO): Promise<number | undefined> {
        const result = await Day.maxValueColumn(db, column);
        return result;
    }

    async findByIdAndUpdate(db: SQLiteDatabase, data: App.PartialExceptId<DayDTO> | App.PartialExceptId<DayDTO>[]) {
        await Day.findByIdAndUpdate(db, data);
    }

}

export default new DayServise();