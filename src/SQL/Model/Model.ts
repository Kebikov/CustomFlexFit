import { SQLiteDatabase } from 'expo-sqlite';
import { extractForInsert } from './helpers/extractForInsert';


export function Model<T>() {
    class Model {
        /** `Имя модели.` */
        static table: string;
        static column: string;
        static info: string;

        /** `//= Создание таблицы.` 
        */
        static async create(db: SQLiteDatabase) {
            await db.runAsync(`
                CREATE TABLE IF NOT EXISTS ${this.table}
                (
                    ${this.column}
                )
            `)
            .catch((error) => { 
                console.error(`${this.info}`, error) 
            })
        }

        /** `//= Возврат всех записей в таблице.` 
        */
        static async find(db: SQLiteDatabase): Promise<T[] | undefined> {
            try{
                const result: T[] = await db.getAllAsync(`SELECT * FROM ${this.table}`);
                return result;
            } catch(error) { 
                console.error(`${this.info}`, error) 
            };
        }

        /** `//= Добавление одной записи в таблицу.` 
        */
        static async insertOne<T extends object>(db: SQLiteDatabase, entity: T) {
            try {
                const {keys, issues, data} = extractForInsert(entity);

                await db.runAsync(`
                    INSERT INTO ${this.table} 
                    (${keys.join(',')})
                    VALUES
                    (${issues.join(',')})    
                `, data as Array<string | number>);
            } catch (error) {
                console.error(`${this.info}`, error);
            }
        }

        /** `//= Количество записей в таблице.` 
         */
        static async total(db: SQLiteDatabase): Promise<number> {
            const result: {"COUNT(*)": number} | null = await db.getFirstAsync(`SELECT COUNT(*) FROM ${this.table}`);
        
            if(result === null || result["COUNT(*)"] === 0) {
                return 0;
            } else {
                return result["COUNT(*)"];
            }    
        }

        /** `//= Максимальное значение в колонке, если в колонке числа.`
         */
        static async maxValueColumn<T>(db: SQLiteDatabase, column: keyof T): Promise<number | undefined> {
            try {
                const result: {MAX: unknown} | null = await db.getFirstAsync(`
                    SELECT MAX(${column as string}) AS MAX
                    FROM ${this.table}
                `);
                if(result && result.MAX === null) return 0;
                
                if(result && typeof result.MAX === 'number') {
                    return result.MAX;
                } else {
                    return undefined;
                }
                
            } catch (error) {
                console.error(`${this.info}`, error);
            }
        }
    }

    return Model;
}
