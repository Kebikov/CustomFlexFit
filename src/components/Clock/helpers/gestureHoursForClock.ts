import { Gesture } from "react-native-gesture-handler";
import { runOnJS, SharedValue, withTiming } from "react-native-reanimated";
import { Vibration, Platform } from "react-native";
import * as Haptics from 'expo-haptics';


interface IgestureHoursForClock {
    hoursPosition: SharedValue<number>;
    lastHoursPosition: SharedValue<number>;
    selectedHour: SharedValue<number>;
    fullRotation: number;
    gaps: number[];
    itemHeight: number;
    lastVibrationPositionHour: SharedValue<number>;
    maxValue: number;
    step: number;
}


/**
 * `Вернет обработчик жестов для числа.` 
 * @param hoursPosition Позиция числа.
 * @param lastHoursPosition Последняя позиция числа.
 * @param selectedHour sv Выбранное пользователем число.
 * @param fullRotation Диаметр полного оборота числа.
 * @param gaps Массив промежутков для установленых чисел, для определения в какой промежежуток попадает выбраная цыфра и установить ее номинал на основании промежутка.
 * @param itemHeight Высота одного элемента.
 * @param lastVibrationPositionHour sv Последняя позиция вибрации числа.
 * @param maxValue Максимальное значение числа.
 * @param step Шаг увеличения числа.
 */
export const gestureHoursForClock = ({
    hoursPosition,
    lastHoursPosition,
    selectedHour,
    fullRotation,
    gaps,
    itemHeight,
    lastVibrationPositionHour,
    maxValue,
    step
}: IgestureHoursForClock) => {

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
    for(let i = 0; i <= gaps.length - step; i++) { 
        valuePlusArray.push(startPlus);
        startPlus = startPlus - step;
        if(startPlus < 0) startPlus = maxValue - step;     
    }
    //console.log(valuePlusArray);

    //* Состовление массива со значениями при отрицательной позиции.
    let valueMinusArray: number[] = [];
    let startMinus = firstNumber(step);
    for(let i = 0; i <= gaps.length - step; i++) {
        valueMinusArray.push(startMinus);
        startMinus = startMinus + step;
        if(startMinus >= maxValue) startMinus = 0;
    }
    //console.log(valueMinusArray);

    //* Обработчик событий жестов.
    const gesturePanHours = Gesture.Pan()
        .onUpdate((e) => {
            hoursPosition.value = (lastHoursPosition.value + e.translationY) % fullRotation;
            const position = e.translationY - lastVibrationPositionHour.value;

            const delta = Math.abs(position);
            if (delta >= itemHeight) {
                if(Platform.OS === 'ios') {
                    runOnJS(Haptics.selectionAsync)();
                } else {
                    runOnJS(Vibration.vibrate)(7);
                }
                lastVibrationPositionHour.value = e.translationY;
            }
        })
        .onEnd(() => {
            let point: undefined | {value: number, i: number};
            const position = hoursPosition.value === fullRotation * -1 ? 0 : hoursPosition.value;

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
                hoursPosition.value = withTiming(point.value, {duration: 200});
                lastHoursPosition.value = point.value;
                if(point.i > 0) {
                    console.log('sing += ', valuePlusArray[point.i]);
                    selectedHour.value = valuePlusArray[point.i];
                } else {
                    console.log('sing -= ', valueMinusArray[point.i * -1]);
                    selectedHour.value = valueMinusArray[point.i * -1];
                }
            } else {
                lastHoursPosition.value = hoursPosition.value;
            }
        });

    return {
        gesturePanHours
    }
}