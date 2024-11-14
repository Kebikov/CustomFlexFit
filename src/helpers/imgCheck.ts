import DatabaseService from "@/SQL/Database/service/DatabaseService";
import Database from "@/SQL/Database/model/Database";

/**
 * `Проверка value:`
 * - if value === number => return value: number;
 * - if value === string => return value: number;
 */
const imgCheck = async (value: number | string): Promise<number | {uri: string} | undefined> => {

    if(typeof value === 'number' && !isNaN(value)) {
        return value;
    } 
    
    if(typeof value === 'string') {
        const splitOnePart = value.split('.')[0];

        if( !isNaN( Number(splitOnePart) ) ) {
            return {uri: await Database.getPathToFolder('myImage') + '/' + value}
        }

        if( isNaN(Number(value)) && typeof value === 'string') {
            return {uri: value}
        } 
    }

};

export default imgCheck;
