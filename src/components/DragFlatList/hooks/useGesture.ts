import { SharedValue, interpolate, interpolateColor, useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming, runOnJS } from "react-native-reanimated";
import { NullableNumber, TPositions } from "../types";
import { Gesture } from "react-native-gesture-handler";
import { COLOR_ROOT } from "@/constants/colors";
import VibrationApp from "@/helpers/VibrationApp";
import * as Haptics from 'expo-haptics';
import { Platform, Vibration } from "react-native";

const DELAY = 200;

export const useGesture = (
    /** `Данные для отображения` */
    item: {id: number | string},
    /** `Переменная для указывающяя происходит ли в данный момент перемешение какого либо элемента.` */
    isDragging: SharedValue<0 | 1>,
    /** `Id элемента который в данный момент перемешяется.` */
    draggedItemId: SharedValue<NullableNumber>,
    /** `Текушее позиции всех элементов.` */
    currentPositions: SharedValue<TPositions>,
    /** `Минимальная высота всего списка.` */
    minHi: number,
    /** `Максимильная высота всего списка.` */
    maxHi: number,
    /** `Высота одного элемента.` */
    heightElement: number,
    /** `SetStateAction для установки id активной кнопки` */
    setActiveButtonId?: React.Dispatch<React.SetStateAction<string>>
) => {

    const ID = Number(item.id);

    // used for swapping with currentIndex
    const newIndex = useSharedValue<NullableNumber>(null);

    //used for swapping with newIndex
    const currentIndex = useSharedValue<NullableNumber>(null);

    const currentPositionsDerived = useDerivedValue(() => {
        return currentPositions.value;
    });

    const top = useSharedValue(ID * heightElement);

    const isDraggingDerived = useDerivedValue(() => {
        return isDragging.value;
    });

    const draggedItemIdDerived = useDerivedValue(() => {
        return draggedItemId.value;
    });

    const vibroPress = () => {
        'worklet';
        Platform.OS === 'ios' ?  runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light) : runOnJS(Vibration.vibrate)(7);
    }


    useAnimatedReaction(
        () => {
            return currentPositionsDerived.value[ID].updatedIndex;
        },
        (currentValue, previousValue) => {
            //console.log(currentValue, previousValue);
            if (previousValue !== null && currentValue !== previousValue) {
                if (draggedItemIdDerived.value !== null && item.id === draggedItemIdDerived.value) {
                    top.value = withSpring(currentPositionsDerived.value[item.id].updatedIndex * heightElement, {}, () => {
                        //console.log('Анимация 2 завершилась !');
                        runOnJS(Haptics.selectionAsync)();
                    });
                } else {
                    top.value = withTiming(currentPositionsDerived.value[ID].updatedIndex * heightElement, { duration: 500 }, (evt) => {
                        //console.log('Анимация 1 завершилась !', evt);
                        if(!evt) runOnJS(Haptics.selectionAsync)();
                    });
                }
            }
        }
    );


    const isCurrentDraggingItem = useDerivedValue(() => {
        return isDraggingDerived.value && draggedItemIdDerived.value === Number(item.id);
    });

    const getKeyOfValue = (value: number, obj: TPositions): number | undefined => {
        "worklet";
        for (const [key, val] of Object.entries(obj)) {
            if (val.updatedIndex === value) {
                return Number(key);
            }
        }
        return undefined; // Return undefined if the value is not found
    };



    const gesturePan = Gesture.Pan()
        .activateAfterLongPress(500)
        .onStart(() => {
            // Если есть функция, то обнуляем id активной кнопки,_
            //_ для закрытия всех кнопок во время перемещения кнопки.
            if(setActiveButtonId) {
                runOnJS(setActiveButtonId)('');
            }
            vibroPress();
            //start dragging
            //isDragging.value = withSpring(1);
            isDragging.value = 1;

            //keep track of dragged item
            draggedItemId.value = ID;
            //store dragged item id for future swap
            currentIndex.value = currentPositionsDerived.value[ID].updatedIndex;
        })
        .onUpdate((e) => {
            if (draggedItemIdDerived.value === null) {
                return;
            }

            const newTop = currentPositionsDerived.value[draggedItemIdDerived.value].updatedTop + e.translationY;

            if (currentIndex.value === null || newTop < minHi || newTop > maxHi) {
                //dragging out of bound
                return;
            }
            top.value = newTop;

            // calculate the new index where drag is headed to
            newIndex.value = Math.floor((newTop + heightElement / 2) / heightElement);

            //swap the items present at newIndex and currentIndex
            if (newIndex.value !== currentIndex.value) {
                //find id of the item that currently resides at newIndex
                const newIndexItemKey = getKeyOfValue(newIndex.value, currentPositionsDerived.value);

                //find id of the item that currently resides at currentIndex
                const currentDragIndexItemKey = getKeyOfValue(currentIndex.value, currentPositionsDerived.value);

                if (newIndexItemKey !== undefined && currentDragIndexItemKey !== undefined) {
                //we update updatedTop and updatedIndex as next time we want to do calculations from new top value and new index
                    currentPositions.value = {
                        ...currentPositionsDerived.value,
                        [newIndexItemKey]: {
                            ...currentPositionsDerived.value[newIndexItemKey],
                            updatedIndex: currentIndex.value,
                            updatedTop: currentIndex.value * heightElement,
                        },
                        [currentDragIndexItemKey]: {
                            ...currentPositionsDerived.value[currentDragIndexItemKey],
                            updatedIndex: newIndex.value,
                        },
                    };

                    //update new index as current index
                    currentIndex.value = newIndex.value;
                }
            }
        })
        .onEnd(() => {
            if (currentIndex.value === null || newIndex.value === null) {
                return;
            }
            top.value = withSpring(newIndex.value * heightElement);
            //find original id of the item that currently resides at currentIndex
            const currentDragIndexItemKey = getKeyOfValue(currentIndex.value, currentPositionsDerived.value);

            if (currentDragIndexItemKey !== undefined) {
                // update the values for item whose drag we just stopped
                currentPositions.value = {
                ...currentPositionsDerived.value,
                [currentDragIndexItemKey]: {
                    ...currentPositionsDerived.value[currentDragIndexItemKey],
                    updatedTop: newIndex.value * heightElement,
                },
                };
            }
            //stop dragging`
            isDragging.value = withDelay(DELAY, withTiming(0, {duration: 0}, (evt) => {
                if(evt) console.log('END');
            }));
        })


    const animatedStyles = useAnimatedStyle(() => {

        return {
            top: top.value,
            opacity: 
                isCurrentDraggingItem.value 
                ? withTiming(.5, {duration: DELAY})
                : withTiming(1, {duration: DELAY})
            ,
            zIndex: isCurrentDraggingItem.value ? 10 : 0
        };
    });

    return {
        animatedStyles,
        gesturePan
    };
};
