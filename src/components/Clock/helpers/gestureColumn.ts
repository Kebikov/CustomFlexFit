import { Gesture } from "react-native-gesture-handler";
import { withSpring, runOnJS, useSharedValue } from "react-native-reanimated";
import { definingPosition } from "./definingPosition";
import { Platform, Vibration } from "react-native";
import * as Haptics from 'expo-haptics';

import type { IGestureColumn } from "../types";


/** `Обработчик жестов для колонки цифр.` */
export const gestureColumn = ({
    arrayPositions,
    currentPositionsSv,
    lastPositionsSv,
    offset,
    MAX_HI,
    num,
    setDataSv,
    isReadyData
}: IGestureColumn) => {

    /** `Последняя позиция на которой отработала вибрация.` */
    const vibroSv = useSharedValue<number>(0);
    /** `Вибрация.` */
    const vibro = () => {
        'worklet';
        if(Platform.OS === 'ios') {
            runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Rigid); 
        } else {
            runOnJS(Vibration.vibrate)(7);
        }
    }

    const setData = (positions: number) => {
        'worklet'
        /** `Ближайший элемент к центру в массиве.` */
        const element = definingPosition(arrayPositions, positions, offset);
                
        // Установка выбранных данных.
        setDataSv.value[num] = Number(element.num);
        isReadyData.value = true;
    }

        return Gesture.Pan()
            .onUpdate((evt) => {
                currentPositionsSv.value = lastPositionsSv.value + evt.translationY;

                // Для вибрации при перемешении ряда чисел.
                const delta = Math.abs(evt.translationY - vibroSv.value);
                if(currentPositionsSv.value < 0 && MAX_HI < currentPositionsSv.value) {
                    if (delta >= arrayPositions[0].heightElement) {
                        vibro();
                        vibroSv.value = evt.translationY;
                    }
                }

            })
            .onEnd((evt) => {
                isReadyData.value = false;

                // Ограничение движения в низ.
                if(currentPositionsSv.value >= 0) {
                    // Движение в низ.
                    currentPositionsSv.value = withSpring(0);
                    lastPositionsSv.value = 0;
                    setData(0);
                    return;
                }

                // Ограничение движения в вверх.
                if(currentPositionsSv.value <= MAX_HI) {
                    // Движение в верх.
                    currentPositionsSv.value = withSpring(MAX_HI);
                    lastPositionsSv.value = MAX_HI;
                    setData(MAX_HI);
                    return;
                }
    
                //** `Ближайший элемент к центру в массиве.` */
                const element = definingPosition(arrayPositions, currentPositionsSv.value, offset);

                // Для вибрации при перемешении ряда чисел.
                const delta = Math.abs(evt.translationY - vibroSv.value) + Math.abs(element.top - lastPositionsSv.value);
                if(currentPositionsSv.value < 0 && MAX_HI < currentPositionsSv.value) {
                    if (Math.round(delta) >= Math.round(arrayPositions[0].heightElement)) {
                        vibro();
                        vibroSv.value = 0;
                    }
                }

                lastPositionsSv.value = currentPositionsSv.value;
                currentPositionsSv.value = withSpring(element.top, {}, () => { 
                    lastPositionsSv.value = currentPositionsSv.value;
                });

                setData(element.top);
            })

}