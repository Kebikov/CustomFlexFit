/**
 * @param position Смешение элемента.
 * @param offsetNumber Число используемое для смешения.
 */
interface IGetPosition {
    position: number;
    offsetNumber: number; 
}

/**
 * `Для установки начального положения часов.`
 * @param value Начальное установленое значение.
 * @param heightItem Высота одного элемента.
 * @param arrayStr Массив значений.
 */
export const getPosition = (value: number, heightItem: number, arrayStr: string[]): IGetPosition => {
    const index = arrayStr.indexOf(String(value).padStart(2, '0'));

    if(index === 0) {
        const offsetNumber = 3;
        const position = offsetNumber * heightItem;
        return {offsetNumber, position}
    } else if(index === 1) {
        const offsetNumber = 2;
        const position = offsetNumber * heightItem;
        return {offsetNumber, position}
    } else if(index === 2) {
        const offsetNumber = 1;
        const position = offsetNumber * heightItem;
        return {offsetNumber, position}
    } else {
        const offsetNumber = (index - 3) * -1;
        const position = offsetNumber * heightItem;
        return {offsetNumber, position};
    }
}