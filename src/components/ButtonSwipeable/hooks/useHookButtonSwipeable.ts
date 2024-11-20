import { useSharedValue, withTiming, interpolate, SharedValue } from "react-native-reanimated";

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
    const rightDownButton1Sv = useSharedValue<number>(-widthButton);
    /**
     * Последняя позиция кнопки #1.
     */
    const lastPositionDownButton1Sv = useSharedValue<number>(-widthButton);
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
        let offsetX = translationX * -1 - widthButton;
        translateButtonSv.value = positionButtonSv.value + translationX;
        //:
        rightDownButton1Sv.value = offsetX;

        translateDownButton2Sv.value = interpolate(translationX, [0, -activeWidthLeft], [0, -activeWidthLeft - widthButton]);
        translateDownButton3Sv.value = interpolate(translationX, [0, -activeWidthLeft], [0, -activeWidthLeft - widthButton * 2]);
    }
    /**
     * Переместить кнопку в позицию открытого состояния.
     */
    const openStateButton = (duration: number) => {
        'worklet';
        isActiveButton.value = true;
        translateButtonSv.value = withTiming(activeWidthLeft - shiftButton, {duration});
        //:
        console.log('widthButton = ', widthButton);
        rightDownButton1Sv.value = withTiming(0, {duration});
        translateDownButton2Sv.value = withTiming(activeWidthLeft + widthButton, {duration});
        translateDownButton3Sv.value = withTiming(activeWidthLeft + widthButton * 2, {duration});

        positionButtonSv.value = withTiming(activeWidthLeft);
        lastPositionDownButton1Sv.value = activeWidthLeft;
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
        //:
        rightDownButton1Sv.value = withTiming(-widthButton, {duration: 200});
        translateDownButton2Sv.value = withTiming(0, {duration: 200});
        translateDownButton3Sv.value = withTiming(0, {duration: 200});
        positionDownButton2Sv.value = 0;
        lastPositionDownButton1Sv.value = 0;
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
        lastPositionDownButton1Sv,
        /**
         * Смешение кнопки основной.
         */
        translateButtonSv,
        /**
         * Смешение кнопки #1.
         */
        rightDownButton1Sv,
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