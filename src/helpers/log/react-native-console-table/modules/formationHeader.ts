import {IlengthColumn, IOptions} from '../types';
import { selectText } from './selectText';
import { tabObj, selectionTypeObj } from './dataForTable';

/**
 * `Формирование заголовка для таблицы.`
 */
export function formationHeader(columnLength: IlengthColumn[], options: IOptions | undefined): string {
    let str: string = '\u2502'
    columnLength.forEach(item => {

        let bodyText: string = '';
        let bodyTextWithTab: string = '';
        //: Добавляем выделение текста, если оно установлено.
        if(options && options.selectionType) {
            bodyText = item.key.padEnd(item.length, ' ');
            bodyTextWithTab = selectText(tabObj.start + bodyText + tabObj.end, selectionTypeObj[options.selectionType]);
        } else {
            bodyText = item.key.padEnd(item.length, ' ');
            bodyTextWithTab = tabObj.start + bodyText + tabObj.end;
        }
        // помимо основного выравнивания текста пробелами, делаем отступы в начале и в конце текста
        str = str + bodyTextWithTab + '\u2502';
    });
    return str;
}