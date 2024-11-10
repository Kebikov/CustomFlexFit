import { IlengthColumn, TObj, IOptions } from '../types';
import { copyDash } from './copyDash';
import { formationHeader } from './formationHeader';


/**
 * `Формирование:`
 * - разделительной линии,
 * - шапки таблицы,
 * - обьекта с ключом и максимальной длинной колонки.
 * @param arrObj Массив обьектов, с данными для отображения.
 * @returns обьект c:
 * - dash: разделительная линия,
 * - header: шапка таблицы,
 * - columnLength: обьект с ключом и максимальной длинной колонки.
 */
export function formation(arrObj: Array<TObj>, options: IOptions): {columnLength: IlengthColumn[], dash: string, header: string} {
    /**
     * `Обьект с ключом и максимальной длинной колонки, которое имеет одно из его значений.`
     */
    let columnLength: IlengthColumn[] = [];
    /**
     * `Все ключи обьекта.`
     */
    const keysObj: string[] = Object.keys(arrObj[0]);

    
    keysObj.forEach(key => {
        const values: (string | number)[] = [];
        arrObj.forEach(item => {
            values.push(item[key]);
        });
        const maxLengthColumn = Math.max(key.length, ...values.map(value => String(value).length)); 
        columnLength = [...columnLength, {key, length: maxLengthColumn}];
    });
    /**
     *  `Разделительная линия таблицы.`
     */
    const dash = copyDash(columnLength);
    /**
     * `Шапка таблицы.`
     */
    const header = formationHeader(columnLength, options);

    return {
        columnLength,
        dash,
        header
    }
}