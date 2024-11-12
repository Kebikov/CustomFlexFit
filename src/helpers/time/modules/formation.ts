import { IlengthColumn, TObj, IOptions, IFormation } from '../types';
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
export const formation = (
    arrObj: Array<TObj>, 
    options?: IOptions
): IFormation => {

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
        /**
         * `Максимальная длинна колонки, определенная по максимальной длинне значения находяшегося в колонке.`
         */
        const maxLengthColumn = Math.max(key.length, ...values.map(value => String(value).length)); 
        columnLength = [...columnLength, {key, length: maxLengthColumn}];
    });
    /**
     *  `Разделительная линия таблицы.`
     */
    const {dashUp, dashCenter, dashBottom} = copyDash(columnLength);
    /**
     * `Шапка таблицы.`
     */
    const header = formationHeader(columnLength, options);

    if(options && options.title) {
        const titleLength = options.title.length;
        const fullHeaderLength = header.length;
        const difference = fullHeaderLength - titleLength - 2;
        const halfDifference = Math.floor(difference / 2);
        const resultTitle = options.title.padStart(halfDifference, ' ').padEnd(difference - halfDifference, ' ');
        console.log('resultTitle = ', resultTitle);
        console.log('resultTitle length = ', resultTitle.length);
    }
    console.log('header length =', header.length);
    return {
        columnLength,
        dashUp,
        dashCenter,
        dashBottom,
        header
    }
}