import { useAnimatedStyle, SharedValue } from 'react-native-reanimated';


export const useHookAnimatedStyle = (
    translateButtonSv: SharedValue<number>, 
    rightDownButton1Sv:SharedValue<number>,
    translateDownButton2Sv:SharedValue<number>,
    translateDownButton3Sv:SharedValue<number>,
    widthButton: number
) => {

        // animated styles
        const animatedStyleButton = useAnimatedStyle(() => {
            return {
                left: translateButtonSv.value
            }
        });
        const animatedStyleDownButton1 = useAnimatedStyle(() => {
            console.log('1 = ', rightDownButton1Sv.value);
            return {
                right: rightDownButton1Sv.value
            }
        });
        const animatedStyleDownButton2 = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateX: translateDownButton2Sv.value
                    }
                ]
            }
        });
        const animatedStyleDownButton3 = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateX: translateDownButton3Sv.value
                    }
                ]
            }
        });

    return {
        animatedStyleButton,
        animatedStyleDownButton1,
        animatedStyleDownButton2,
        animatedStyleDownButton3
    }
}