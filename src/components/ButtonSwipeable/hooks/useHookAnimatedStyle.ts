import { useAnimatedStyle, SharedValue } from 'react-native-reanimated';


export const useHookAnimatedStyle = (
    translateButtonSv: SharedValue<number>, 
    rightPositionButton1Sv:SharedValue<number>,
    rightPositionButton2Sv:SharedValue<number>,
    rightPositionButton3Sv:SharedValue<number>
) => {

        // animated styles
        const animatedStyleButton = useAnimatedStyle(() => {
            return {
                left: translateButtonSv.value
            }
        });
        const animatedStyleDownButton1 = useAnimatedStyle(() => {

            return {
                right: rightPositionButton1Sv.value
            }
        });
        const animatedStyleDownButton2 = useAnimatedStyle(() => {
            return {
                right: rightPositionButton2Sv.value
            }
        });
        const animatedStyleDownButton3 = useAnimatedStyle(() => {
            return {
                right: rightPositionButton3Sv.value
            }
        });

    return {
        animatedStyleButton,
        animatedStyleDownButton1,
        animatedStyleDownButton2,
        animatedStyleDownButton3
    }
}