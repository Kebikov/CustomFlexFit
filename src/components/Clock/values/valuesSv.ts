import Animated, 
{ 
    useSharedValue, 
    FadeIn, 
    FadeOut, 
    useAnimatedReaction 
} from 'react-native-reanimated';
import { getPosition } from '../helpers/getPosition';

import type { IStateDataClock } from '../types';



export const valuesSv = (
    id: string,
    selectedData: IStateDataClock,
    itemHeight: number,
    firstNumberArray: string[],
    secondNumberArray: string[]
) => {

    /**
     * `Позиция "Первого числа".`
     */
    const firstNumberPosition = useSharedValue<number>(0); 
    useAnimatedReaction(
        () => firstNumberPosition.value,
        (currentValue, previousValue) => {
            if(currentValue === 0) {
                firstNumberPosition.value = getPosition(selectedData[id].one, itemHeight, firstNumberArray);
            }
        }
    );
    /**
     * `Последняя позиция "Первого числа".`
     */
    const lastPositionFirstNumber = useSharedValue<number>(0);
    useAnimatedReaction(
        () => lastPositionFirstNumber.value,
        (currentValue, previousValue) => {
            if(currentValue === 0) {
                lastPositionFirstNumber.value = getPosition(selectedData[id].one, itemHeight, firstNumberArray);
            }
        }
    );

    /**
     * `Позиция "Второго числа".`
     */
    const secondNumberPosition = useSharedValue<number>(0);
    useAnimatedReaction(
        () => secondNumberPosition.value,
        (currentValue, previousValue) => {
            if(currentValue === 0) {
                secondNumberPosition.value = getPosition(selectedData[id].two, itemHeight, secondNumberArray);
            }
        }
    );
    /**
     * `Последняя позиция "Второго числа".`
     */
    const lastPositionSecondNumber = useSharedValue<number>(0);

    /**
     * `Выбраный пользователем первое число.`
     */
    const selectedFirstNumber = useSharedValue<number>(selectedData[id].one);
    /**
     * `Выбраное пользователем "Второе число".`
     */
    const selecteSecondNumber = useSharedValue<number>(selectedData[id].two);

    /**
     * `Последняя позиция вибрации для "Первого числа".`
     */
    const lastVibrationPositionFirstNumber = useSharedValue<number>(0);
    /**
     * `Последняя позиция вибрации для "Второго числа".`
     */
    const lastVibrationPositionSecondNumber = useSharedValue<number>(0);

    return {
        firstNumberPosition,
        secondNumberPosition,
        selectedFirstNumber,
        selecteSecondNumber,
        lastPositionFirstNumber,
        lastVibrationPositionFirstNumber,
        lastPositionSecondNumber,
        lastVibrationPositionSecondNumber
    }
}