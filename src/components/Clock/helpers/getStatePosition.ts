import { TPositions } from "../types"

/** `Получение начальной позиции колонки.` */
export const getStatePosition = (stateNumber: number, arrPositions: TPositions[], offset: number) => {
    const find = arrPositions.find(item => item.num === String(stateNumber).padStart(2, '0'));
    console.log('find = ', find);
    return find ? (find.top - offset) * -1 : 0;
}