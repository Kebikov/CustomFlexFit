import { SQLiteDatabase } from 'expo-sqlite';
import { extractForInsert } from './helpers/extractForInsert';


interface IModel {
     /** `Имя таблицы.` */
    table: string
     /** `Модель таблицы.` */
    model: string;
     /** `Дополнительная информация для ошибок.` */
    info: string;
}

export function Model<T extends {id: number}>({
    table,
    model,
    info
}: IModel) {
    
    class Model {
        /** `Имя модели.` */
        static table: string = table;
         /** `Модель таблицы.` */
        static model: string = model;
         /** `Дополнительная информация для ошибок.` */
        static info: string = info;

         /** `//* Создание таблицы.` */
        static async create(db: SQLiteDatabase) {
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS "${this.table}"
                (
                    ${this.model}
                )
            `)
            .catch((error) => { 
                console.error(`Error in [${this.info}.create] >>> `, error) 
            })
        }

         /** `//* Возврат всех записей в таблице.` */
        static async find(db: SQLiteDatabase): Promise<T[] | undefined> {
            try{
                const result: T[] = await db.getAllAsync(`SELECT * FROM "${this.table}"`);
                return result;
            } catch(error) { 
                console.error(`Error in ${this.info}.find >>>`, error); 
            };
        }

         /** `//* Возврат записи по ID.` */
        static async findById(db: SQLiteDatabase, id: number): Promise<T | null | undefined > {
            try {
                const result: T | null = await db.getFirstAsync(`
                    SELECT * FROM "${this.table}" 
                    WHERE id = ? 
                `, [id]);

                return result;
            } catch (error) {
                console.error(`Error in [${this.info}.findById] >>>`, error);
            }
        }

         /** `//* Добавление одной записи в таблицу.` */
        static async insertOne<T extends object>(db: SQLiteDatabase, entity: T extends {id: any} ? never : T) {
            try {
                const {keys, issues, data} = extractForInsert(entity);

                await db.runAsync(`
                    INSERT INTO ${this.table} 
                    (${keys.join(',')})
                    VALUES
                    (${issues.join(',')})    
                `, data as Array<string | number>);

            } catch (error) {
                console.error(`Error in [${this.info}.insertOne] >>>`, error);
            }
        }

         /** `//* Количество записей в таблице.`  */
        static async total(db: SQLiteDatabase): Promise<number | undefined> {
            try {
                const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${this.table}`);
                if(result === null || result["COUNT(*)"] === 0) {
                    return 0;
                } else {
                    return result["COUNT(*)"];
                }    
            } catch (error) {
                console.error(`Error in [${this.info}.total] >>>`, error);
            }

        }

         /** `//* Максимальное значение в колонке, если в колонке числа.` */
        static async maxValueColumn<T>(db: SQLiteDatabase, column: keyof T): Promise<number | undefined> {
            try {
                const result: {MAX: unknown} | null = await db.getFirstAsync(`
                    SELECT MAX("${column as string}") AS MAX
                    FROM "${this.table}"
                `);

                 // Вернет {result.MAX: null}, если в столбце нет данных.
                if(result && result.MAX === null) return 0;
                
                if(result && typeof result.MAX === 'number') {
                    return result.MAX;
                } else {
                    return undefined;
                }
                
            } catch (error) {
                console.error(`Error in [${this.info}.maxValueColumn] >>>`, error);
            }
        }

         /** `//* Удаление записи по ID.` */
        static async findByIdAndDelete(db: SQLiteDatabase, id: number) {
            try {
                await db.runAsync(`DELETE FROM ${this.table} WHERE id = ?`, [id]);
            } catch (error) {
                console.error(`Error in [${this.info}.findByIdAndDelete] >>>`, error);
            }
        }

         /** `//* Обновление записи по ID.` */
        static async findByIdAndUpdate(
            db: SQLiteDatabase, 
            params: App.PartialExceptId<T> | App.PartialExceptId<T>[] 
        ) {
            try {
                 /** `Обновление данных одной записи.` */
                const update = async <T extends {id: number}>(item: T) => {
                    const keys = Object.keys(item);
                     /** `Все ключи, кроме ID.` */
                    const keysWithoutId = keys.filter(item => item !== 'id');
                    let values: string[] = [];
                
                    for(const key of keysWithoutId) {
                        // Если значение string, оборачиваем значение в ковычки.
                        const keyValue = typeof item[key as keyof typeof item] === 'string' ? `"${item[key as keyof typeof item]}"` : item[key as keyof typeof item];
                        values.push(`"${key}" = ${keyValue}`)
                    }
                    console.log(values.join(','));
                    await db.runAsync(`
                        UPDATE "${this.table}" 
                        SET 
                        ${values.join(',')}
                        WHERE
                        id = ${item.id}
                    `);
                }

                // Если, передан массив, то запускаем обновление в цикле.
                if(Array.isArray(params)) {
                    await db.withTransactionAsync(async () => {
                        for(const item of params) {
                            await update(item);
                        }
                    });
                } else {
                    await update(params);
                }

            } catch (error) {
                console.error(`Error in [${this.info}.findByIdAndUpdate] >>>`, error);
            }
        }

        //  /** `//* Обновление поля order(очередности).` */
        // static async findByIdAndUpdateOrder<T extends {id: number, order: number}>(db: SQLiteDatabase, data: T[]) {
        //     try {
        //         await db.withTransactionAsync(async () => {
        //             for(const item of data) {
        //                 await db.runAsync(
        //                     `
        //                         UPDATE ${this.table} 
        //                         SET
        //                         "order" = ?
        //                         WHERE
        //                         id = ?
        //                     `,[item.order, item.id]
        //                 );
        //             }
        //         });
        //     } catch (error) {
        //         console.error(`Error in [${this.info}.updateOrders] >>>`, error);
        //     }
        // }
    }

    return Model;
}
