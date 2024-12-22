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

    /** `Индекс очередности элемента` */
    const index = Number(currentPositions.value[id].updatedIndex);
    console.log('index = ', index);

    /** `Новый индекс для элемента` */
    const newIndex = useSharedValue<NullableNumber>(null);

    /** `Текуший индекс элемента который пользователь начал перетаскивать` */
    const currentIndex = useSharedValue<NullableNumber>(null);

    const top = useSharedValue(currentPositions.value[id].updatedTop);

    const vibroPress = () => {
        'worklet';
        Platform.OS === 'ios' ?  runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Light) : runOnJS(Vibration.vibrate)(7);
    }

    useAnimatedReaction(
        () => currentPositions.value[id].updatedIndex,
        (currentValue, previousValue) => {
            //console.log(currentValue, previousValue);
            if (previousValue !== null && currentValue !== previousValue) {
                if (currentIndex.value !== null && index === currentIndex.value) {
                    top.value = withSpring(currentPositions.value[id].updatedIndex * heightElement, {}, () => {
                        runOnJS(Haptics.selectionAsync)();
                    });
                } else {
                    top.value = withTiming(currentPositions.value[id].updatedIndex * heightElement, { duration: 500 }, (evt) => {
                        if(!evt) runOnJS(Haptics.selectionAsync)();
                    });
                }
            }
        }
    );

    /** `Это ? Текуший передвигаемый элемент` */
    const isCurrentDraggingItem = useDerivedValue(() => {
        return isDragging.value && currentIndex.value === index;
    });

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
            // Если есть функция, то обнуляем id активной кнопки, для закрытия всех кнопок во время перемещения кнопки.
            if(activeButtonIdSv) activeButtonIdSv.value = ''
            vibroPress();
            // начало передвижения элемента
            isDragging.value = 1;

            // сохранение id для будущего обмена
            console.log('use id = ', id);
            console.log('use index = ', index);
            currentIndex.value = currentPositions.value[id].updatedIndex;
        })
        .onUpdate((e) => {
            if (currentIndex.value === null) return;

            const newTop = currentPositions.value[id].updatedTop + e.translationY;

            if (currentIndex.value === null || newTop < minHi || newTop > maxHi) return;
            
            top.value = newTop;

            // вычисление нового индекса
            newIndex.value = Math.floor((newTop + heightElement / 2) / heightElement);

            // замена элементов
            if (newIndex.value !== currentIndex.value) {
                /** `Id элемента на место которого будет установлен перемешаемый элемент` */
                const newIdItemKey = getIdPlace(newIndex.value, currentPositions.value);
                console.log('newIndexItemKey = ', newIdItemKey);

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
            if (currentIndex.value === null || newIndex.value === null) {
                return;
            }
            top.value = withSpring(newIndex.value * heightElement);
            // Найдите исходный ID элемента, который в данный момент находится на текущем индексе (currentIndex).
            const currentDragIdItemKey = getIdPlace(currentIndex.value, currentPositions.value);

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
            isDragging.value = withDelay(DELAY, withTiming(0, {duration: 0}, (evt) => {
                //if(evt) console.log('END');
            }));
        });
    
    //= Анимация 
    const animatedStyles = useAnimatedStyle(() => {
        //console.log('top.value = ', top.value); 
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
