import getCurrentDateInFormatArray from "./helpers/getCurrentDateInFormatArray";
import pickObject from "./helpers/pickObject";
import transferSecInTime from "./helpers/transferSecInTime";
type TValue<T> = (keyof T)[];


class HelperUtils {

    /** 
      * `Выбор свойств из обьекта или массива обьектов.` 
      */
    static pickObject<T extends {id: number}>(item: T | T[], value: TValue<T> ): App.PartialExceptId<T> | App.PartialExceptId<T>[] {
        return pickObject(item, value);
    }

    /** 
      * `Сортировка массива обьектов по свойству queue.` 
      */
    static sortByQueue <T extends {queue: number}>(arrForSort: T[]) {
        return arrForSort.sort((x, y) => x.queue - y.queue);
    }

    /**
     * `Получение текушей даты в формате массива.`
     * @return {Object}
     * @property arraySplitMinus  example: ["2024", "01", "08"]
     * @property textCurrentDay example: '08.01.2024'
     * @example
     * arraySplitMinus = ["2024", "01", "08"]
     * textCurrentDay = '08.01.2024'
     */
    static getCurrentDateInFormatArray() {
        return getCurrentDateInFormatArray();
    }

    /**
     * Перевод секунд во время.
     * @param sec Время в секундах.
     * @example
     * req > 150
     * res > '02:30'
     */
    static transferSecInTime(sec: number) {
        return transferSecInTime(sec);
    }
}


export default HelperUtils;

