
/**
 * `Для установки начального положения часов.`
 * @param value Начальное установленое значение.
 * @param heightItem Высота одного элемента.
 * @param arrayStr Массив значений.
 * @return (number) Смешение элемента.
 */
export const getPosition = (value: number, heightItem: number, arrayStr: string[]): number => {
    const index = arrayStr.indexOf(String(value).padStart(2, '0'));
    console.log('arrayStr >>> ', arrayStr);
    console.log('index >>> ', index);
    if(index === 0) {
        const offsetNumber = 3;
        return offsetNumber * heightItem;
    } else if(index === 1) {
        const offsetNumber = 2;
        return offsetNumber * heightItem;
    } else if(index === 2) {
        const offsetNumber = 1;
        return offsetNumber * heightItem;
    } else {
        const offsetNumber = (index - 3) * -1;
        return offsetNumber * heightItem;
    }
}