import { IOptions } from './types';
import { formation } from './modules/formation'
import { print } from './modules/print';


/**
 * `//* Вывод в консоль данных в виде таблицы.`
 * @param data данные для вывода
 * @param options обьект настроек 
 */
export const consoleTable = <T extends object>(
    data?: T[], 
    options?: IOptions
) => {

    if(!data) return console.log('31m%s0m', 'No data available for the table.');

    const {
        header, 
        dashUp,
        dashCenter,
        dashBottom, 
        columnLength
    } = formation(data, options);

    print({
        dashUp, 
        dashCenter,
        dashBottom,
        data, 
        header, 
        columnLength, 
        options
    });
}


