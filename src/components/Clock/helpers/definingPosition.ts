import { TPositions } from "../types";
import { SharedValue } from "react-native-reanimated";

/** `Определение какое число ближайшее к текушей позиции.` */
export const definingPosition = (arrPositions: TPositions[], currentPositionSv: SharedValue<number>, offset: number): {top: number, num: string } => {
    'worklet'
    
    let element: {top: number, num: string } = {top: 0, num: '00'};
    const position = -currentPositionSv.value;
    const half = arrPositions[0].heightElement / 2
    console.log('position = ', position, ' &  half = ', half);
    
    for(const item of arrPositions) {
        if(item.top - offset - half < position && position < item.top - offset + half) {
            console.log(item.top - offset - half, ' / ', position, ' / ', item.top - offset + half);
            element.top = (item.top - offset) * -1;
            element.num = item.num;
            break;
        }
    }

    return element;
}