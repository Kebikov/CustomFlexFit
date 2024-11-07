/**
 * `Проверка, является ли value после преобразования в число верным форматом, 
 * если да, вернет value как число, 
 * если нет, вернет обьект {uri: value}`
 */
const imgCheck = (value: number | string): number | {uri: string} => {
    if(typeof value === 'number' && !isNaN(value)) {
        return value;
    } else {
        if( isNaN(Number(value)) && typeof value === 'string') {
            return {uri: value}
        } else {
            return Number(value);
        }
    }

};

export default imgCheck;
