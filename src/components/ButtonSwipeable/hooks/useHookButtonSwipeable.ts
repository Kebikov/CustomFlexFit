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
     * `Выделенная ширина для кнопок.`
     */
    const activeWidth = activeWidthLeft * -1;

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
    const rightPositionButton1Sv = useSharedValue<number>(-widthButton);
    /**
     * Последняя позиция кнопки #1.
     */
    const lastRightPositionButton1Sv = useSharedValue<number>(-widthButton);

    /**
     * Смешение кнопки #2.
     */
    const rightPositionButton2Sv = useSharedValue<number>(-widthButton)
    /**
     * Последняя позиция кнопки #2.
     */
    const lastRightPositionButton2Sv = useSharedValue<number>(-widthButton);

    /**
     * Смешение кнопки #3.
     */
    const rightPositionButton3Sv = useSharedValue<number>(0);
    /**
     * Последняя позиция кнопки #3.
     */
    const lastRightPositionButton3Sv = useSharedValue<number>(0);
    /**
     * `Обновление позиций кнопок.`
     * @param translationX  Координаты смешения.
     */
    const update = (translationX: number) => {
        'worklet';
        console.log('update = ', translationX);
        translateButtonSv.value = positionButtonSv.value + translationX;
        //:
        console.log('lastRightPositionButton1Sv = ', lastRightPositionButton1Sv.value);
        rightPositionButton1Sv.value = lastRightPositionButton1Sv.value + interpolate(translationX, [0, activeWidthLeft], [0, activeWidth]);
        rightPositionButton2Sv.value = lastRightPositionButton2Sv.value + interpolate(translationX, [0, activeWidthLeft], [0, activeWidth - widthButton]);
        rightPositionButton3Sv.value = lastRightPositionButton3Sv.value + interpolate(translationX, [0, activeWidthLeft], [0, activeWidth - widthButton * 2]);
    }
    /**
     * Переместить кнопку в позицию открытого состояния.
     */
    const openStateButton = (duration: number) => {
        'worklet';
        isActiveButton.value = true;
        translateButtonSv.value = withTiming(activeWidthLeft - shiftButton, {duration});
        //:
        console.log('activeWidth = ', activeWidth);
        console.log('widthButton = ', widthButton);
        console.log('result = ', activeWidth - widthButton * 2);
        rightPositionButton1Sv.value = withTiming(activeWidth - widthButton, {duration});
        rightPositionButton2Sv.value = withTiming(activeWidth - widthButton * 2, {duration});
        rightPositionButton3Sv.value = withTiming(activeWidth - widthButton * 3, {duration});

        positionButtonSv.value = withTiming(activeWidthLeft);
        //:
        lastRightPositionButton1Sv.value = activeWidth - widthButton;

        lastRightPositionButton2Sv.value = activeWidth - widthButton * 2;
        lastRightPositionButton3Sv.value = activeWidthLeft + widthButton * 3;
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
        rightPositionButton1Sv.value = withTiming(-widthButton, {duration: 200});
        rightPositionButton2Sv.value = withTiming(-widthButton, {duration: 200});
        rightPositionButton3Sv.value = withTiming(-widthButton, {duration: 200});
        
        //:
        positionButtonSv.value = 0;
        lastRightPositionButton1Sv.value = -widthButton;
        lastRightPositionButton2Sv.value = -widthButton;
        lastRightPositionButton3Sv.value = -widthButton;
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
        lastRightPositionButton1Sv,
        /**
         * Смешение кнопки основной.
         */
        translateButtonSv,
        /**
         * Смешение кнопки #1.
         */
        rightPositionButton1Sv,
        /**
         * Смешение кнопки #2.
         */
        rightPositionButton2Sv,
        /**
         * Смешение кнопки #3.
         */
        rightPositionButton3Sv
    }
}