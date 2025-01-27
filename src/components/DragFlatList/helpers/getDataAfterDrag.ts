import { TPositions } from "../types"


/**
 * `Вентет массив с текущей очередностью элементов на экране телефона.`
 * @param data Данные для отображения из useState
 * @param positionSv Текушие позиции элементов.
 * @returns 
 */
export const getDataAfterDrag = <T extends {id: number, order: number}>(data: T[], position: TPositions): T[] => {
    'worklet'
    
    console.log(JSON.stringify( data, null, 2));

    const lengthObject = Object.keys(position).length;
    const arrData = Array(lengthObject) as T[];

    for(let id in position) {
        const find = data.find(item => String(item.id) === id);

        if(find) {
            arrData[position[id].updatedIndex] = find;
            // Обнавление поля order
            arrData[position[id].updatedIndex].order = position[id].updatedIndex + 1;
        }
        
    }

    console.log('newData = ', JSON.stringify( arrData, null, 2));
    return arrData;
}

