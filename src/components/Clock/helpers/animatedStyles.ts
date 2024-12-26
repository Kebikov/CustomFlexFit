import { 
    useAnimatedStyle, 
    interpolate, 
    SharedValue,
    useAnimatedReaction 
} from "react-native-reanimated";


interface IanimatedStyles {
    firstNumberPosition: SharedValue<number>;
    itemHeight: number;
    fullRotation: number;
    height: number;
    fullRotationSecondNumber: number;
    secondNumberPosition: SharedValue<number>;
    lengthArrayOne: number;
    lengthArrayTwo: number;
}

/**
 * `Анимированые стили для часов и минут.`
 * @param firstNumberPosition  sv Позиция первого числа.
 * @param secondNumberPosition sv Позиция второго числа.
 * 
 * @param itemHeight Высота одного элемента.
 * @param fullRotation Диаметр полного оборота часов.
 * @param height Высота окна с цыфрами.
 * @param fullRotationSecondNumber Диаметр полного оборота минут.
 * @param lengthArrayOne Длинна массива первых чисел в часах. 
 * @param lengthArrayTwo Длинна массива вторых чисел в часах.
 */
export const animatedStyles = ({
    firstNumberPosition,
    secondNumberPosition,
    itemHeight,
    fullRotation,
    height,
    fullRotationSecondNumber,
    lengthArrayOne,
    lengthArrayTwo
}: IanimatedStyles) => {
    
    const animatedFirstNumber = (i: number) => {
        return useAnimatedStyle(() => {
            
            const elementPositionBefore = firstNumberPosition.value + i * itemHeight;
            let iAfter = i;

            if(elementPositionBefore > fullRotation / 2) {
                iAfter = (lengthArrayOne - i) * -1;
            }

            let elementPositionAfter = firstNumberPosition.value + iAfter * itemHeight;

            if(elementPositionAfter < (fullRotation - height + itemHeight) * -1) {
                iAfter = lengthArrayOne + i;
                elementPositionAfter = firstNumberPosition.value + iAfter * itemHeight;
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

    const animatedSecondNumber = (i: number) => {
        return useAnimatedStyle(() => {

            const elementPositionBefore = secondNumberPosition.value + i * itemHeight;
            let iAfter = i;

            if(elementPositionBefore > fullRotationSecondNumber / 2) { // 216
                iAfter = (lengthArrayTwo - i) * -1;
            }

            let elementPositionAfter = secondNumberPosition.value + iAfter * itemHeight; 

            if(elementPositionAfter < (fullRotationSecondNumber - height + itemHeight) * -1) {
                iAfter = lengthArrayTwo + i;
                elementPositionAfter = secondNumberPosition.value + iAfter * itemHeight;
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
        animatedFirstNumber,
        animatedSecondNumber
    }
}