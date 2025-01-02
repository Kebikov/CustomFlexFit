import { Gesture } from "react-native-gesture-handler";
import { SharedValue, withSpring } from "react-native-reanimated";
import { definingPosition } from "./definingPosition";
import { TPositions } from "../types";


/** `Обработчик жестов для колонки цифр.` */
export const gestureColumn = (
    arrayPositions: TPositions[],
    currentPositionsSv: SharedValue<number>,
    lastPositionsSv: SharedValue<number>,
    offset: number,
    MAX_HI: number
) => {

        return Gesture.Pan()
            .onUpdate((evt) => {
                currentPositionsSv.value = lastPositionsSv.value + evt.translationY;
            })
            .onEnd((evt) => {
    
                if(currentPositionsSv.value >= 0) {
                    // Движение в низ.
                    currentPositionsSv.value = withSpring(0);
                    lastPositionsSv.value = 0;
                    return;
                }
    
                if(currentPositionsSv.value <= MAX_HI) {
                    // Движение в верх.
                    currentPositionsSv.value = withSpring(MAX_HI);
                    lastPositionsSv.value = MAX_HI;
                    return;
                }
    
                /** `Ближайший элемент к центру в массиве.` */
                const element = definingPosition(arrayPositions, currentPositionsSv, offset);
                console.log('element = ', element);
                currentPositionsSv.value = withSpring(element.top);
                lastPositionsSv.value = currentPositionsSv.value;
            })

}