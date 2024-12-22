import { 
    SharedValue, interpolate, interpolateColor, 
    useAnimatedReaction, 
    useAnimatedStyle, 
    useDerivedValue, 
    useSharedValue, 
    withDelay, withSpring, withTiming, runOnJS 
} from "react-native-reanimated";
import { NullableNumber, TPositions } from "../types";
import { Gesture } from "react-native-gesture-handler";
import { COLOR_ROOT } from "@/constants/colors";
import VibrationApp from "@/helpers/VibrationApp";
import * as Haptics from 'expo-haptics';
import { Platform, Vibration } from "react-native";
import logApp from "@/helpers/log";
import { IUseGesture } from "../types";


const DELAY = 200;


export const useGesture = ({
    id,
    isDragging,
    currentPositions,
    maxHi,
    minHi,
    heightElement,
    activeButtonIdSv
}: IUseGesture) => {
    console.log('use currentPositions = ', currentPositions.value[id].updatedIndex);
    // id элемента который пользователь начал перетаскивать
    const draggedItemId = useSharedValue<NullableNumber>(null);
    
    const ID = Number(currentPositions.value[id].updatedIndex);

    // для замены с currentIndex
    const newIndex = useSharedValue<NullableNumber>(null);

    // для замены с newIndex
    const currentIndex = useSharedValue<NullableNumber>(null);

    const currentPositionsDerived = useDerivedValue(() => {
        return currentPositions.value;
    });

    const top = useSharedValue(currentPositions.value[id].updatedTop);

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
        () => currentPositionsDerived.value[id].updatedIndex,
        (currentValue, previousValue) => {
            //console.log(currentValue, previousValue);
            if (previousValue !== null && currentValue !== previousValue) {
                if (draggedItemIdDerived.value !== null && ID === draggedItemIdDerived.value) {
                    top.value = withSpring(currentPositionsDerived.value[id].updatedIndex * heightElement, {}, () => {
                        //console.log('Анимация 2 завершилась !');
                        runOnJS(Haptics.selectionAsync)();
                    });
                } else {
                    top.value = withTiming(currentPositionsDerived.value[id].updatedIndex * heightElement, { duration: 500 }, (evt) => {
                        //console.log('Анимация 1 завершилась !', evt);
                        if(!evt) runOnJS(Haptics.selectionAsync)();
                    });
                }
            }
        }
    );

    const isCurrentDraggingItem = useDerivedValue(() => {
        return isDraggingDerived.value && draggedItemIdDerived.value === ID;
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
            // Если есть функция, то обнуляем id активной кнопки, для закрытия всех кнопок во время перемещения кнопки.
            if(activeButtonIdSv) activeButtonIdSv.value = ''
            vibroPress();
            // начало передвижения элемента
            isDragging.value = 1;
            // установка отслеживаемого элемента
            draggedItemId.value = ID;
            // сохранение id для будущего обмена
            console.log('use id = ', id);
            currentIndex.value = currentPositionsDerived.value[id].updatedIndex;
        })
        .onUpdate((e) => {
            if (draggedItemIdDerived.value === null) return;

            const newTop = currentPositionsDerived.value[draggedItemIdDerived.value].updatedTop + e.translationY;

            if (currentIndex.value === null || newTop < minHi || newTop > maxHi) return;
            
            top.value = newTop;

            // вычисление нового индекса
            newIndex.value = Math.floor((newTop + heightElement / 2) / heightElement);

            // замена элементов
            if (newIndex.value !== currentIndex.value) {
                // найти идентификатор который находится в newIndex
                const newIndexItemKey = getKeyOfValue(newIndex.value, currentPositionsDerived.value);

                // Найдите исходный ID элемента, который в данный момент находится на текущем индексе (currentIndex).
                const currentDragIndexItemKey = getKeyOfValue(currentIndex.value, currentPositionsDerived.value);

                if (newIndexItemKey !== undefined && currentDragIndexItemKey !== undefined) {
                // Мы обновляем updatedTop и updatedIndex, так как в следующий раз мы хотим выполнять вычисления, исходя из нового значения top и нового индекса.
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

                    // update new index as current index
                    currentIndex.value = newIndex.value;
                }
            }
        })
        .onEnd(() => {
            if (currentIndex.value === null || newIndex.value === null) {
                return;
            }
            top.value = withSpring(newIndex.value * heightElement);
            // Найдите исходный ID элемента, который в данный момент находится на текущем индексе (currentIndex).
            const currentDragIndexItemKey = getKeyOfValue(currentIndex.value, currentPositionsDerived.value);

            if (currentDragIndexItemKey !== undefined) {
                // Обновите значения для элемента, перетаскивание которого только что завершилось.
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
                //if(evt) console.log('END');
            }));
        });
    
    //= Анимация 
    const animatedStyles = useAnimatedStyle(() => {
        console.log('top.value = ', top.value);
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
