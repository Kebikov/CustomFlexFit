import i18next from 'i18next';
import { SQLiteDatabase } from 'expo-sqlite';
import Day from '@/SQLite/Day/modules/Day';
import showMessage from '@/helpers/showMessage';
import { DayDTO } from '@/SQLite/Day/DTO/DayDTO';
import { DayDTOomitId } from '@/SQLite/Day/DTO/DayDTO';
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
        if(!result) return showMessage('in Days.find');
        console.info(JSON.stringify( result, null, 2));
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
    async insertOne(db: SQLiteDatabase, entity: DayDTOomitId): Promise<boolean> {
        try {
            if(!this.checkEntity(entity, 'queue', 'type number')) return false;
            if(!this.checkEntity(entity, 'img', 'type number/string')) return false;
            if(!this.checkEntity(entity, 'date', 'type string')) return false;
            if(!this.checkEntity(entity, 'title', 'type string')) return false;
            if(!this.checkEntity(entity, 'description', 'type string')) return false;
            if(!this.checkEntity(entity, 'lastExercise', 'type number')) return false;

            if(entity.queue === 0) {
                const find = await Day.find(db);
                if(Array.isArray(find) && find.length > 0) {
                    const queueDays: number[] = [];
                    find.forEach(item => queueDays.push(item.queue));
                    const maxQueue = Math.max(...queueDays);
                    entity.queue = maxQueue + 1;
                } else {
                    entity.queue = 1;
                }
            }

            if(typeof entity.img === 'number') entity.img = String(entity.img);
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
     * `Проверка сушествования данных в свойстве с заданным типом.`
     */
    private checkEntity(entity: DayDTOomitId,  property: keyof DayDTOomitId, typeCheck: keyof ICheck) {

        let msg: string = '';

        switch(property) {
            case 'queue':
                msg = i18next.t('alert_and_toast.imgNotSelect');
                break;
            case 'img':
                msg = i18next.t('alert_and_toast.imgNotSelect');
                break;
            case 'title':
                msg = i18next.t('alert_and_toast.notTitle');
                break;
            case 'description': 
                msg = i18next.t('alert_and_toast.notDescription');
                break;
            default:
                msg = 'Error in checkEntity';
                break;
        }

        const check: ICheck = {
            'type number': (property) => {
                if(property in entity && typeof entity[property] === 'number') {
                    return true;
                } else {
                    showMessage(msg);
                    return false;
                }
            },
            'type string': (property) => {
                if(property === 'date') return property in entity && typeof entity[property] === 'string' ? true : false;
                
                if(property in entity && typeof entity[property] === 'string' && entity[property] !== '') {
                    return true;
                } else {
                    showMessage(msg);
                    return false;
                }
            },
            'type number/string': (property) => {
                if(property in entity && typeof entity.img === 'number' || typeof entity.img === 'string' && entity[property] !== '') {
                    return true;
                } else {
                    showMessage(msg);
                    return false;
                }
            }
        }

        return check[typeCheck](property)
    }
}

export default new DayServise();