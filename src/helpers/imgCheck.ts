/**
 * `Проверка, является ли value после преобразования в число верным форматом, 
 * если да, вернет value как число, 
 * если нет, вернет обьект {uri: value}`
 */
const imgCheck = (value: number | string): number | {uri: string} | undefined => {
    if(typeof value === 'number' && !isNaN(value)) {
        return value;
    } else if(typeof value === 'string') {

        const splitOnePart = value.split('.')[0];

        if( !isNaN( Number(splitOnePart) ) ) {
            return Number(splitOnePart);
        }

        if( isNaN(Number(value)) && typeof value === 'string') {
            return {uri: value}
        } 
    }

};

export default imgCheck;
