import { TPositions } from "../types"
import { SharedValue } from "react-native-reanimated";

/**
 * `Вентет массив с текущей очередностью элементов на экране телефона.`
 * @param data Данные для отображения из useState
 * @param positionSv Текушие позиции элементов.
 * @returns 
 */
export const getDataAfterDrag = <T>(data: T[], positionSv: SharedValue<TPositions>): T[] => {
    'worklet'
    const position = positionSv.value;
    const lengthObject = Object.keys(position).length;
    const arrData = Array(lengthObject);

    for(let key in position) {
        arrData[position[key].updatedIndex] = data[Number(key)]
    }

    return arrData;
}

