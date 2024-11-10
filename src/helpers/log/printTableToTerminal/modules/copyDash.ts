import { tabObj } from './dataForTable';
import {IlengthColumn} from '../types';

/**
 * `Для состовления разделителя в зависимости от суммы максимальных значений длинны всех колокок таблицы.`
 * 
 * `В итоге получим строку вида "-----", длинной всей таблицы.`
 */
export function copyDash(columnLength: IlengthColumn[]): string {
    const fullLength = columnLength.reduce((acc, item) => acc + item.length, 0);

    let dash: string = '';
    for(let i = 0; i <= fullLength; i++) dash += '-';
    for(let i = 0; i <= columnLength.length; i++) dash += tabObj.dashStart + tabObj.dashEnd;
    return dash;
}