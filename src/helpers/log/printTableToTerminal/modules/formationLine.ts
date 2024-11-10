import { IlengthColumn, TObj} from '../types';
import { tabObj } from './dataForTable';


/**
 * `Формирование строк данных.`
 */
export function formationLine(columnLength: IlengthColumn[], obj: TObj): string {
    let line: string = '|';
    columnLength.forEach(objColumnLength => {
        const lineValue = String(obj[objColumnLength.key]).padEnd(objColumnLength.length, ' ');
        line = line + tabObj.start + lineValue + tabObj.end + '|';
    })
    return line;
}