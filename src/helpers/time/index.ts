import { IOptions } from './types';
import { formation } from './modules/formation'
import { print } from './modules/print';


/**
 * `Display an array of objects (with the same interface) as a table in the terminal.`
 * @param data Data for console output as a table
 * @param options Object settings 
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


