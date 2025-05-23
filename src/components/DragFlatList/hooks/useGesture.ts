import { useAnimatedReaction, useAnimatedStyle, useDerivedValue, useSharedValue, withDelay, withSpring, withTiming, runOnJS } from "react-native-reanimated";
import { NullableNumber, TPositions } from "../types";
import { Gesture } from "react-native-gesture-handler";
import * as Haptics from 'expo-haptics';
import { Platform, Vibration } from "react-native";
import { IUseGesture } from "../types";
import { DELAY, TIME_OF_ELEVATION } from "../constants";


export const useGesture = ({
    id,
    isDragging,
    currentPositions,
    maxHi,
    minHi,
    heightElement
}: IUseGesture) => {

    /** `Индекс очередности элемента до начала перемешения` */
    const startIndexDv = useDerivedValue<NullableNumber>(() => {
        if(currentPositions.value[id]?.updatedIndex !== null && !isNaN( Number(currentPositions.value[id]?.updatedIndex) ) ) {
            return currentPositions.value[id].updatedIndex;
        } else {
            return null;
        }
    });

    /** `Новый индекс для элемента` */
    const newIndex = useSharedValue<NullableNumber>(null);

    /** `Текуший индекс элемента который пользователь начал перетаскивать` */
    const currentIndex = useSharedValue<NullableNumber>(null);
    
    const topSv = useSharedValue<NullableNumber>(null);

    const opacitySv = useSharedValue<number>(0);

    /** `Это ? Текуший передвигаемый элемент` */
    const isCurrentDraggingItem = useDerivedValue(() => isDragging.value && currentIndex.value === startIndexDv.value);

    useAnimatedReaction(
        () => isCurrentDraggingItem.value,
        (currentValue, previousValue) => {
            if(currentValue && startIndexDv.value !== null && currentIndex.value === startIndexDv.value ) {
                opacitySv.value = withTiming(.5, {duration: 200})
            } else {
                opacitySv.value = withTiming(1, {duration: 400})
            }
        }
    )

    useAnimatedReaction(
        () => currentPositions.value[id].updatedTop,
        (currentValue, previousValue) => {
            if(previousValue === null) {
                topSv.value = currentPositions.value[id].updatedTop;
            }
        }
    )
    
    const vibroPress = () => { 'worklet';
        Platform.OS === 'ios' ?  runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light) : runOnJS(Vibration.vibrate)(7);
    }

    // Сработает как только поменялся индекс у элемента.
    useAnimatedReaction(
        () => currentPositions.value[id].updatedIndex,
        (currentValue, previousValue) => {
            if (previousValue !== null && currentValue !== previousValue) {
                topSv.value = withTiming(currentPositions.value[id].updatedIndex * heightElement, { duration: 500 }, (evt) => {
                    if(!evt) runOnJS(Haptics.selectionAsync)();
                });
            }
        }
    );

    /**
     * `Возврат id элемента на чье место займет перемешаемый элемент`
     */
    const getIdPlace = (value: number, obj: TPositions): number | string | undefined => {
        "worklet";
        for (const [key, val] of Object.entries(obj)) {
            if (val.updatedIndex === value) {
                return key;
            }
        }
        return undefined; // Return undefined if the value is not found
    };

    const gesturePan = Gesture.Pan()
        .activateAfterLongPress(500)
        .onStart(() => {
            vibroPress();
            // начало передвижения элемента
            isDragging.value = 1;
            currentIndex.value = currentPositions.value[id].updatedIndex;
        })
        .onUpdate((e) => {
            if (currentIndex.value === null) return;

            const newTop = currentPositions.value[id].updatedTop + e.translationY;

            if (currentIndex.value === null || newTop < minHi || newTop > maxHi) return;
            
            topSv.value = newTop;

            // вычисление нового индекса
            newIndex.value = Math.floor((newTop + heightElement / 2) / heightElement);

            // замена элементов
            if (newIndex.value !== currentIndex.value) {
                /** `Id элемента на место которого будет установлен перемешаемый элемент` */
                const newIdItemKey = getIdPlace(newIndex.value, currentPositions.value);

                if (newIdItemKey !== undefined && id !== undefined) {
                // Мы обновляем updatedTop и updatedIndex, так как в следующий раз мы хотим выполнять вычисления, исходя из нового значения top и нового индекса.
                    currentPositions.value = {
                        ...currentPositions.value,
                        [newIdItemKey]: {
                            ...currentPositions.value[newIdItemKey],
                            updatedIndex: currentIndex.value,
                            updatedTop: currentIndex.value * heightElement,
                        },
                        [id]: {
                            ...currentPositions.value[id],
                            updatedIndex: newIndex.value,
                        },
                    };

                    // update new index as current index
                    currentIndex.value = newIndex.value;
                }
            }
        })
        .onEnd(() => {
            if (currentIndex.value === null || newIndex.value === null) return;
            
            // Найдите исходный ID элемента, который в данный момент находится на текущем индексе (currentIndex).
            const currentDragIdItemKey = getIdPlace(currentIndex.value, currentPositions.value);

            currentIndex.value = null;
            topSv.value = withSpring(newIndex.value * heightElement);

            if (currentDragIdItemKey !== undefined) {
                // Обновите значения для элемента, перетаскивание которого только что завершилось.
                currentPositions.value = {
                ...currentPositions.value,
                [currentDragIdItemKey]: {
                    ...currentPositions.value[currentDragIdItemKey],
                    updatedTop: newIndex.value * heightElement,
                },
                };
            }
            //stop dragging`
            isDragging.value = withDelay(DELAY, withTiming(0, {duration: 0}));
        });
    
    //= Анимация 
    const animatedStyles = useAnimatedStyle(() => {
        return {
            top: topSv.value,
            opacity: opacitySv.value,
            zIndex: isCurrentDraggingItem.value ? 10 : 0
        };
    });

    return {
        animatedStyles,
        gesturePan
    };
};
