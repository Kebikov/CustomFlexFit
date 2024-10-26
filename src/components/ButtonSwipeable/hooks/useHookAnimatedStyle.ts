import { useAnimatedStyle, SharedValue } from 'react-native-reanimated';


export const useHookAnimatedStyle = (
    translateButtonSv: SharedValue<number>, 
    translateDownButton1Sv:SharedValue<number>,
    translateDownButton2Sv:SharedValue<number>,
    translateDownButton3Sv:SharedValue<number>,
) => {

        // animated styles
        const animatedStyleButton = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateX: translateButtonSv.value
                    }
                ]
            }
        });
        const animatedStyleDownButton1 = useAnimatedStyle(() => {
            return {
                transform: [
                    {
                        translateX: translateDownButton1Sv.value
                    }
                ]
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