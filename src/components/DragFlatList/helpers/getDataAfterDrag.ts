import { TPositions } from "../types"


/**
 * `Вентет массив с текущей очередностью элементов на экране телефона.`
 * @param data Данные для отображения из useState
 * @param positionSv Текушие позиции элементов.
 * @returns 
 */
export const getDataAfterDrag = <T extends {id: number}>(data: T[], position: TPositions): T[] => {
    'worklet'
    console.log('data =', typeof data[0].id);
    const lengthObject = Object.keys(position).length;
    const arrData = Array(lengthObject);

    for(let id in position) {
        arrData[position[id].updatedIndex] = data.find(item => String(item.id) === id)
    }

    console.log('newData = ', arrData);
    return arrData;
}

