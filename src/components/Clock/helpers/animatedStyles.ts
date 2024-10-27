import { useAnimatedStyle, interpolate, SharedValue } from "react-native-reanimated";


interface IanimatedStyles {
    hoursPosition: SharedValue<number>;
    itemHeight: number;
    fullRotation: number;
    height: number;
    fullRotationMinutes: number;
    minutesPosition: SharedValue<number>;
    lengthArrayOne: number;
    lengthArrayTwo: number;
}

/**
 * `Анимированые стили для часов и минут.`
 * @param hoursPosition  sv Позиция часа.
 * @param minutesPosition sv Позиция минут.
 * 
 * @param itemHeight Высота одного элемента.
 * @param fullRotation Диаметр полного оборота часов.
 * @param height Высота окна с цыфрами.
 * @param fullRotationMinutes Диаметр полного оборота минут.
 * @param lengthArrayOne Длинна массива первых чисел в часах. 
 * @param lengthArrayTwo Длинна массива вторых чисел в часах.
 */
export const animatedStyles = ({
    hoursPosition,
    minutesPosition,
    itemHeight,
    fullRotation,
    height,
    fullRotationMinutes,
    lengthArrayOne,
    lengthArrayTwo
}: IanimatedStyles) => {

    const animatedHours = (i: number) => {
        return useAnimatedStyle(() => {

            const elementPositionBefore = hoursPosition.value + i * itemHeight;
            let iAfter = i;

            if(elementPositionBefore > fullRotation / 2) {
                iAfter = (lengthArrayOne - i) * -1;
            }

            let elementPositionAfter = hoursPosition.value + iAfter * itemHeight;

            if(elementPositionAfter < (fullRotation - height + itemHeight) * -1) {
                iAfter = lengthArrayOne + i;
                elementPositionAfter = hoursPosition.value + iAfter * itemHeight;
            }

            const inboundData = [0, itemHeight * 3, itemHeight * 6];
            
            return{
                top: elementPositionAfter,
                transform: [
                    {
                        rotateX: `${interpolate(elementPositionAfter, inboundData, [90, 0, 90])}deg`
                    }, 
                    {
                        scale: interpolate(elementPositionAfter, inboundData, [.5, 1, .5])
                    }
                ],
                opacity: interpolate(elementPositionAfter, inboundData, [.1, 1, .1])
            }
        })
    }

    const animatedMinutes = (i: number) => {
        return useAnimatedStyle(() => {

            const elementPositionBefore = minutesPosition.value + i * itemHeight;
            let iAfter = i;

            if(elementPositionBefore > fullRotationMinutes / 2) { // 216
                iAfter = (lengthArrayTwo - i) * -1;
            }

            let elementPositionAfter = minutesPosition.value + iAfter * itemHeight; 

            if(elementPositionAfter < (fullRotationMinutes - height + itemHeight) * -1) {
                iAfter = lengthArrayTwo + i;
                elementPositionAfter = minutesPosition.value + iAfter * itemHeight;
            }

            const inboundData = [0, itemHeight * 3, itemHeight * 6];

            return{
                top: elementPositionAfter,
                transform: [
                    {
                        rotateX: `${interpolate(elementPositionAfter, inboundData, [90, 0, 90])}deg`
                    }, 
                    {
                        scale: interpolate(elementPositionAfter, inboundData, [.5, 1, .5])
                    }
                ],
                opacity: interpolate(elementPositionAfter, inboundData, [.1, 1, .1])
            }
        })
    }

    return {
        animatedHours,
        animatedMinutes
    }
}