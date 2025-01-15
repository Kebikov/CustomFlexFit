
 /** `Извлечение данных для добавления в таблицу.` */
export const extractForInsert = <T extends object>(entity: T) => {

    const keys = Object.keys(entity) as (keyof T)[];
    const issues = Array.from({length: keys.length}, () => '?');
    const data = keys.map(item => entity[item]); 

    return {
        keys,
        issues,
        data
    }
}