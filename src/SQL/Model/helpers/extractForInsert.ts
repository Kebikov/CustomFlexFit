
 /** `Извлечение данных для добавления в таблицу.` */
export const extractForInsert = <T extends object>(entity: T) => {

    const keysEntity = Object.keys(entity) as (keyof T)[];
    const issues = Array.from({length: keysEntity.length}, () => '?');
    const data = keysEntity.map(item => entity[item]); 

     /** `Оборачивание каждого ключа в ковычки, для предотврашения конфликта зарезервированных системных имен.` */
    const keys = keysEntity.map(key => `"${key as string}"`) as (keyof T)[];

    console.log(keys);
    console.log(issues);
    console.log(data);

    return {
        keys,
        issues,
        data
    }
}