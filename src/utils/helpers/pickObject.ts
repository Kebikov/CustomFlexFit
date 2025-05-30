type TValue<T> = (keyof T)[];

/** 
 * `Фильтрация обьекта, вернет обьект только с переданными ключами. Например только с полями: id и name.` 
 */
function filterObject<T extends {id: number}>(item: T, value: TValue<T>): App.PartialExceptId<T> {
    return Object.fromEntries(
            Object.entries(item).filter(([key, keyValue]) => value.includes(key as keyof T))
        ) as App.PartialExceptId<T>;
};

/** 
 * `Выбор свойств из обьекта или массива обьектов.` 
 */
function pickObject<T extends {id: number}>(item: T | T[], value: TValue<T> ): App.PartialExceptId<T> | App.PartialExceptId<T>[] {
    if(Array.isArray(item)) {
        // Если передан массив для сортировки.
        return item.map(obj => {
            return filterObject(obj, value);
        });
    } else {
        // Если передан обьект для сортировки.
        return filterObject(item, value);
    }
}

export default pickObject;