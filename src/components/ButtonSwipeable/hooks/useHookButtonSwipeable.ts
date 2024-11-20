import { useSharedValue, withTiming, interpolate, runOnJS, SharedValue } from "react-native-reanimated";

/**
 * `Hook с основными функциями.`
 * @param activeWidthLeft Отсечка смешения.
 * @param widthButton Ширина одной кнопки.
 * @param isActiveButton Активна ли кнопка.
 * @param shiftButton Смешение кнопки для ровномерного отступа при задании padding между кнопками.
 * @returns 
 */
export const useHookButtonSwipeable = (
    activeWidthLeft: number, 
    widthButton: number,
    isActiveButton: SharedValue<boolean>,
    shiftButton: number
) => {

    /**
     * Смешение кнопки основной.
     */
    const translateButtonSv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки основной.
     */
    const positionButtonSv = useSharedValue<number>(0);
    /**
     * Смешение кнопки #1.
     */
    const translateDownButton1Sv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки #1.
     */
    const positionDownButton1Sv = useSharedValue<number>(0);
    /**
     * Смешение кнопки #2.
     */
    const translateDownButton2Sv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки #2.
     */
    const positionDownButton2Sv = useSharedValue<number>(0);
    /**
     * Смешение кнопки #3.
     */
    const translateDownButton3Sv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки #3.
     */
    const positionDownButton3Sv = useSharedValue<number>(0);
    /**
     * `Обновление позиций кнопок.`
     * @param translationX  Координаты смешения.
     */
    const update = (translationX: number) => {
        'worklet';
        translateButtonSv.value = positionButtonSv.value + translationX;
        translateDownButton1Sv.value = positionDownButton1Sv.value + translationX;

        translateDownButton2Sv.value = positionDownButton2Sv.value + interpolate(translationX, [0, -activeWidthLeft], [0, -activeWidthLeft - widthButton]);
        translateDownButton3Sv.value = positionDownButton3Sv.value + interpolate(translationX, [0, -activeWidthLeft], [0, -activeWidthLeft - widthButton * 2]);
    }
    /**
     * Переместить кнопку в позицию открытого состояния.
     */
    const openStateButton = (duration: number) => {
        'worklet';
        isActiveButton.value = true;
        translateButtonSv.value = withTiming(activeWidthLeft - shiftButton, {duration});
        translateDownButton1Sv.value = withTiming(activeWidthLeft, {duration});
        translateDownButton2Sv.value = withTiming(activeWidthLeft + widthButton, {duration});
        translateDownButton3Sv.value = withTiming(activeWidthLeft + widthButton * 2, {duration});

        positionButtonSv.value = withTiming(activeWidthLeft);
        positionDownButton1Sv.value = activeWidthLeft;
        positionDownButton2Sv.value = activeWidthLeft + widthButton;
        positionDownButton3Sv.value = activeWidthLeft + widthButton * 2;
    }
    /**
     * `Переместить кнопку в позицию закрытого состояния.`
     * @param isAnimated С анимацией или без запускать.
     */
    const closeStateButton = () => {
        'worklet';
        isActiveButton.value = false;
        translateButtonSv.value = withTiming(0, {duration: 200}); 
        translateDownButton1Sv.value = withTiming(0, {duration: 200});
        translateDownButton2Sv.value = withTiming(0, {duration: 200});
        translateDownButton3Sv.value = withTiming(0, {duration: 200});
        positionDownButton2Sv.value = 0;
        positionDownButton1Sv.value = 0;
        positionButtonSv.value = 0;
        positionDownButton3Sv.value = 0;
    }
    return {
        /**
         * `Обновление позиций кнопок.`
         * @param translationX  Координаты смешения.
         */
        update,
        /**
         * Переместить кнопку в позицию открытого состояния.
         */
        openStateButton,
        /**
         * `Переместить кнопку в позицию закрытого состояния.`
         * @param isAnimated С анимацией или без запускать.
         */
        closeStateButton,
        /**
         * Последняя позиция кнопки основной.
         */
        positionButtonSv,
        /**
         * Последняя позиция кнопки #1.
         */
        positionDownButton1Sv,
        /**
         * Смешение кнопки основной.
         */
        translateButtonSv,
        /**
         * Смешение кнопки #1.
         */
        translateDownButton1Sv,
        /**
         * Смешение кнопки #2.
         */
        translateDownButton2Sv,
        /**
         * Смешение кнопки #3.
         */
        translateDownButton3Sv
    }
}