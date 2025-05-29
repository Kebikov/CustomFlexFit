import { TPositions } from "../types"


/**
 * `Вентет массив с текущей очередностью элементов на экране телефона.`
 * @param data Данные для отображения из useState
 * @param positionSv Текушие позиции элементов.
 * @returns 
 */
export const getDataAfterDrag = <T extends {id: number, queue: number}>(data: T[], position: TPositions): T[] => {
    'worklet'

    const lengthObject = Object.keys(position).length;
    const arrData = Array(lengthObject) as T[];

    for(let id in position) {
        const find = data.find(item => String(item.id) === id);

        if(find) {
            arrData[position[id].updatedIndex] = find;
            // Обнавление поля queue
            arrData[position[id].updatedIndex].queue = position[id].updatedIndex + 1;
        }
        
    }

    return arrData;
}

