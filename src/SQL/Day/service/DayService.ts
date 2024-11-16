import i18next from 'i18next';
import { SQLiteDatabase } from 'expo-sqlite';
import Day from '@/SQL/Day/modules/Day';
import showMessage from '@/helpers/showMessage';
import { DayDTO } from '@/SQL/Day/DTO/DayDTO';
import { DayDTOomitId } from '@/SQL/Day/DTO/DayDTO';
import getCurrentDateInFormatArray from '@/helpers/getCurrentDateInFormatArray';



interface ICheck {
    'type number': (value: keyof DayDTOomitId) => boolean;
    'type string': (value: keyof DayDTOomitId) => boolean;
    'type number/string': (value: keyof DayDTOomitId) => boolean;
}


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
     * `//* Добавление одной записи в таблицу.`
     */
    async insertOne(db: SQLiteDatabase, entity: DayDTO): Promise<boolean> {
        try {
            // Если очередь равна 0, усанавливаем очередь.
            if(entity.queue === 0) {
                const maxQueue = await Day.maxValueColumn(db, 'queue');
                if(maxQueue === undefined) return false;

                if(maxQueue > 0) {
                    entity.queue = maxQueue + 1;
                } else {
                    entity.queue = 1;
                }
            }

            // Заполняем поле даты, если пустое.
            if(entity.date === '') {
                const {textCurrentDay} = getCurrentDateInFormatArray();
                entity.date = textCurrentDay;
            }

            await Day.insertOne(db, entity);

            console.info('Добавлена запись в таблицу: Day');
            return true;
        } catch (error) {
            console.error('Error in DayServise.insertOne() >>>', error);
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

}

export default new DayServise();