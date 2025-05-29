
/**
 * `Получение текушей даты в формате массива.`
 * @return {Object}
 * @property arraySplitMinus  example: ["2024", "01", "08"]
 * @property textCurrentDay example: '08.01.2024'
 * @example
 * arraySplitMinus = ["2024", "01", "08"]
 * textCurrentDay = '08.01.2024'
 */
const getCurrentDateInFormatArray = () => {
    /**
     * Текушяя дата строкой.
     * @example "2024-01-08T13:17:21.153Z"
     */
    const date: string = new Date().toISOString();
    /**
     * Массив из строки разспличеный по "Т".
     * @example ["2024-01-08", "13:18:24.209Z"]
     */
    const arraySplitT: string[] = date.split('T');
    /**
     * Массив из строки разспличеный по "-".
     * @example  ["2024", "01", "08"]
     */
    const arraySplitMinus: string[] = arraySplitT[0].split('-');

    const textCurrentDay = `${arraySplitMinus[2]}.${arraySplitMinus[1]}.${arraySplitMinus[0]}`;

    return {
        arraySplitMinus,
        textCurrentDay
    }
}


export default getCurrentDateInFormatArray;