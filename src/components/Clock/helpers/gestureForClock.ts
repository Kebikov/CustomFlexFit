import { Gesture } from "react-native-gesture-handler";
import { runOnJS, SharedValue, withTiming } from "react-native-reanimated";
import { Vibration, Platform } from "react-native";
import * as Haptics from 'expo-haptics';


interface IgestureForClock {
    svPosition: SharedValue<number>;
    svLastPosition: SharedValue<number>;
    svSelectedNumber: SharedValue<number>;
    fullRotation: number;
    gaps: number[];
    itemHeight: number;
    svLastVibrationPosition: SharedValue<number>;
    maxValue: number;
    step: number;
}


/**
 * `Вернет обработчик жестов для числа.` 
 * @param svPosition Позиция числа.
 * @param svLastPosition Последняя позиция числа.
 * @param svSelectedNumber sv Выбранное пользователем число.
 * @param fullRotation Диаметр полного оборота числа.
 * @param gaps Массив промежутков для установленых чисел, для определения в какой промежежуток попадает выбраная цыфра и установить ее номинал на основании промежутка.
 * @param itemHeight Высота одного элемента.
 * @param svLastVibrationPosition sv Последняя позиция вибрации числа.
 * @param maxValue Максимальное значение числа.
 * @param step Шаг увеличения числа.
 */
export const gestureForClock = ({
    svPosition,
    svLastPosition,
    svSelectedNumber,
    fullRotation,
    gaps,
    itemHeight,
    svLastVibrationPosition,
    maxValue,
    step
}: IgestureForClock) => {

    /**
     * `Определение номинала первого отображаемого числа.`
     * @param step Шаго увеличения числа.
     */
    function firstNumber(st: number) {
        let result = 0;
        for(let i = 0; i < 3; i++) result = result + st; 
        return result;
    }

    //* Состовление массива со значениями при положительной позиции.
    let valuePlusArray: number[] = [];
    let startPlus = firstNumber(step);
    for(let i = 0; i <= gaps.length; i++) { 
        valuePlusArray.push(startPlus);
        startPlus = startPlus - step;
        if(startPlus < 0) startPlus = maxValue - step;     
    }

    //* Состовление массива со значениями при отрицательной позиции.
    let valueMinusArray: number[] = [];
    let startMinus = firstNumber(step);
    for(let i = 0; i <= gaps.length; i++) {
        valueMinusArray.push(startMinus);
        startMinus = startMinus + step;
        if(startMinus >= maxValue) startMinus = 0;
    }

    const vibro = () => {
        'worklet';
        if(Platform.OS === 'ios') {
            runOnJS(Haptics.selectionAsync)();
        } else {
            runOnJS(Vibration.vibrate)(7);
        }
    }

    //* Обработчик событий жестов.
    const gesturePan = Gesture.Pan()
        .onUpdate((e) => {
            svPosition.value = (svLastPosition.value + e.translationY) % fullRotation;
            const delta = Math.abs(e.translationY - svLastVibrationPosition.value);

            if (delta >= itemHeight) {
                vibro();
                svLastVibrationPosition.value = e.translationY;
            }
        })
        .onEnd((e) => {

            let point: undefined | {value: number, i: number};
            const position = svPosition.value === fullRotation * -1 ? 0 : svPosition.value;

            for(let i = 0; i < gaps.length; i++) {
                if(0 <= position) {
                    if(gaps[i] < position && position < gaps[i + 1]) {
                        point = Math.abs( Math.abs(gaps[i]) - Math.abs(position) ) <= itemHeight / 2 ? {value: gaps[i], i} : {value: gaps[i + 1], i: i + 1};
                    }
                } else {
                    if(gaps[i] * -1 > position && position > gaps[i + 1] * -1) {
                        point = Math.abs( Math.abs(gaps[i]) - Math.abs(position) ) <= itemHeight / 2 ? {value: gaps[i] * -1, i: i * -1} : {value: gaps[i + 1] * -1, i: (i + 1) * -1};
                    }
                }
            }
            
            if(point !== undefined) {
                svPosition.value = withTiming(point.value, {duration: 200}, () => vibro());
                svLastPosition.value = point.value;

                if(point.i > 0) {
                    svSelectedNumber.value = valuePlusArray[point.i];
                } else {
                    svSelectedNumber.value = valueMinusArray[point.i * -1];
                }
            } else {
                svLastPosition.value = svPosition.value;
            }
        });

    return {
        gesturePan
    }
}