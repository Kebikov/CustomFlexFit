import { IlengthColumn, TObj} from '../types';
import { tabObj, lines } from './dataForTable';


/**
 * `Формирование строк данных.`
 */
export function formationLine(columnLength: IlengthColumn[], obj: TObj): string {
    let line: string = lines.vertical;
    columnLength.forEach(objColumnLength => {
        const lineValue = String(obj[objColumnLength.key]).padEnd(objColumnLength.length, ' ');
        line = line + tabObj.start + lineValue + tabObj.end + lines.vertical;
    })
    return line;
}