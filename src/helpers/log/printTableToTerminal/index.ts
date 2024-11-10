import { signObj, tabObj, selectionTypeObj } from './modules/dataForTable';
import { TObj, IOptions, IlengthColumn } from './types';
import { selectText } from './modules/selectText';
import { copyDash } from './modules/copyDash';
import { formationHeader } from './modules/formationHeader';
import { formation } from './modules/formation'
import { formationLine } from './modules/formationLine';
import { print } from './modules/print';


const defaultOptions: IOptions = {
    sing: 'box', 
    selectionType: 'textStyle_bold'
}


/**
 * `//* Вывод в консоль данных в виде таблицы.`
 * @param data данные для вывода
 * @param options обьект настроек 
 */
export const printTableToTerminal = (
    data: TObj[] | undefined, 
    options: IOptions | undefined  =  defaultOptions
) => {

    if(!data) return console.log('31m%s0m', 'Данные для таблицы отсутствуют.');

    const {header, dash, columnLength} = formation(data, options);

    print({dash,data,header,columnLength});
}

