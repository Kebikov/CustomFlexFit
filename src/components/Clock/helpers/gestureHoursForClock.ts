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
    offsetHours: number;
    maxValue: number;
}

/**
 * `Вернет обработчик жестов для часов.` 
 */
export const gestureHoursForClock = ({
    hoursPosition,
    lastHoursPosition,
    selectedHour,
    fullRotation,
    gaps,
    itemHeight,
    lastVibrationPositionHour,
    offsetHours,
    maxValue
}: IgestureHoursForClock) => {

    //* Состовление массива со значениями при положительной позиции.
    let valuePlusArray: number[] = [];
    let startPlus = 3;
    for(let i = 0; i <= gaps.length - 1; i++) {
        valuePlusArray.push(startPlus);
        startPlus = startPlus - 1;
        if(startPlus < 0) startPlus = maxValue - 1;
    }

    //* Состовление массива со значениями при отрицательной позиции.
    let valueMinusArray: number[] = [];
    let startMinus = 3;
    for(let i = 0; i <= gaps.length - 1; i++) {
        valueMinusArray.push(startMinus);
        startMinus = startMinus + 1;
        if(startMinus >= maxValue) startMinus = 0;
    }

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
                    selectedHour.value = valuePlusArray[point.i];
                } else {
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