import { useSharedValue, withTiming, interpolate, SharedValue } from "react-native-reanimated";

/**
 * `Hook с основными функциями.`
 * @param activeWidthLeft Отсечка смешения.
 * @param widthButton Ширина одной кнопки.
 * @param widthOneButton Заданная пользователем ширина одной кнопки.
 * @param isActiveButton Активна ли кнопка.
 * @param totalButton Количество кнопок.
 * @param shiftButton Смешение кнопки для ровномерного отступа при задании padding между кнопками.
 */
export const useHookButtonSwipeable = (
    activeWidthLeft: number, 
    widthButton: number,
    isActiveButton: SharedValue<boolean>,
    totalButton: number,
    widthOneButton?: number,
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
    const rightPositionButton3Sv = useSharedValue<number>(-widthButton);
    /**
     * Последняя позиция кнопки #3.
     */
    const lastRightPositionButton3Sv = useSharedValue<number>(-widthButton);
    /** Равное растояние между кнопками и краями, для выравнивания, если заданна ширена. */
    let shift = widthOneButton ? (activeWidth - widthOneButton * totalButton) / (totalButton + 1) : 0;
    /**
     * `Обновление позиций кнопок.`
     * @param translationX  Координаты смешения.
     */
    const update = (translationX: number) => {
        'worklet';
        /** Позиция кнопки #1 */
        let activeWidthButton1 = activeWidth - shift;
        /** Позиция кнопки #2 */
        let activeWidthButton2 = activeWidth - shift * 2 - widthButton;
        /** Позиция кнопки #3 */
        let activeWidthButton3 = activeWidth - shift * 3 - widthButton * 2;

        translateButtonSv.value = positionButtonSv.value + translationX;
        rightPositionButton1Sv.value = lastRightPositionButton1Sv.value + interpolate(translationX, [0, activeWidthLeft], [0, activeWidthButton1]);
        rightPositionButton2Sv.value = lastRightPositionButton2Sv.value + interpolate(translationX, [0, activeWidthLeft], [0, activeWidthButton2]);
        rightPositionButton3Sv.value = lastRightPositionButton3Sv.value + interpolate(translationX, [0, activeWidthLeft], [0, activeWidthButton3]);
    }
    /**
     * Переместить кнопку в позицию открытого состояния.
     */
    const openStateButton = (duration: number) => {
        'worklet';
        isActiveButton.value = true;
        /** Позиция кнопки #1 */
        let positionButton1 = activeWidth - shift - widthButton;
        /** Позиция кнопки #2 */
        let positionButton2 = activeWidth - shift * 2 - widthButton * 2;
        /** Позиция кнопки #3 */
        let positionButton3 = activeWidth - shift * 3 - widthButton * 3;

        translateButtonSv.value = withTiming(activeWidthLeft, {duration});
        rightPositionButton1Sv.value = withTiming(positionButton1, {duration});
        rightPositionButton2Sv.value = withTiming(positionButton2, {duration});
        rightPositionButton3Sv.value = withTiming(positionButton3, {duration});

        positionButtonSv.value = withTiming(activeWidthLeft);
        lastRightPositionButton1Sv.value = positionButton1;
        lastRightPositionButton2Sv.value = positionButton2;
        lastRightPositionButton3Sv.value = positionButton3;
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