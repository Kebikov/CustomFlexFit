import { TPositions } from "../types"
import { SharedValue } from "react-native-reanimated";

/**
 * `Вентет массив с текущей очередностью элементов на экране телефона.`
 * @param data Данные для отображения из useState
 * @param positionSv Текушие позиции элементов.
 * @returns 
 */
export const getDataAfterDrag = <T extends {id: string}>(data: T[], positionSv: SharedValue<TPositions>): T[] => {
    'worklet'
    const position = positionSv.value;
    const lengthObject = Object.keys(position).length;
    const arrData = Array(lengthObject);

    for(let id in position) {
        arrData[position[id].updatedIndex] = data.find(item => item.id === id)
    }

    return arrData;
}

