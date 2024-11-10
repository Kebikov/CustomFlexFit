import { formationLine } from './formationLine';
import {IPrint} from '../types';

/**
 * `Вывод таблицы в терминал.`
 */
export const print = (dataForPrint: IPrint) => {

    console.log(dataForPrint.dash);
    console.log(dataForPrint.header);
    console.log(dataForPrint.dash);

    // Строки данных
    dataForPrint.data.forEach(itemObj => {
        const lineForLog = formationLine(dataForPrint.columnLength, itemObj);
        console.log(lineForLog);
    });
}