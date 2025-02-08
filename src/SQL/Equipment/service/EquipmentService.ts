import { SQLiteDatabase } from 'expo-sqlite';
import showMessage from '@/helpers/showMessage';
import Equipment from '../model/Equipment';
import { EquipmentDTO } from '../DTO/EquipmentDTO';


class EquipmentServise {

    /** `//* Создание таблицы.` */
    async createTable(db: SQLiteDatabase) {
        await Equipment.create(db);
    }

    /** `//* Вывод в консоль данные таблицы.` */
    async showTableInConsole(db: SQLiteDatabase): Promise<void> {
        const result = await Equipment.find(db); 
        if(!result) return showMessage('in Days.find');
        console.info(JSON.stringify( result, null, 2));
    }

     /** `//* Возврат всех записей.` */
    async find(db: SQLiteDatabase): Promise<EquipmentDTO[]> {
        const result = await Equipment.find(db);
        return result === undefined ? [] : result;
    }

     /** `//* Добавление начальных данных.` */
    async initializeDatabase(db: SQLiteDatabase, data: Omit<EquipmentDTO, 'id'>[]) {
        await db.withTransactionAsync(async () => {
            for(const item of data) {
                await Equipment.insertOne(db, {
                    title: item.title,
                    type: item.type,
                    weight: item.weight,
                    img: item.img,
                    order: item.order
                });
            }
        });
    }

     /** `//* Удаление записи по ID.` */
    async findByIdAndDelete(db: SQLiteDatabase, id: number) {
        await Equipment.findByIdAndDelete(db, id);
    }

    async findByIdAndUpdate<K extends Partial<Omit<EquipmentDTO, 'id'>> & {id: number}>(db: SQLiteDatabase, params: K | K[]) {
        try {
            await Equipment.findByIdAndUpdate(db, params);
        } catch (error) {
            console.error('Error in [EquipmentServise.findByIdAndUpdate] >>>', error);
        }
    }

     /** `//* Обновление поля order(очередности).` */
    async findByIdAndUpdateOrder<T extends {id: number, order: number}>(db: SQLiteDatabase, data: T[]) {
        await Equipment.findByIdAndUpdateOrder(db, data);
    }
}

export default new EquipmentServise();