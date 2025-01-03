import { Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import Animated, {
    useAnimatedStyle,
    SharedValue,
    interpolate
} from 'react-native-reanimated';

import type { TPositions } from '../types';


interface IItemNumber {
    item: TPositions;
    colorText: string;
    currentPositionSv: SharedValue<number>;
    /** `Смешения для центра начального элемента.` */
    offset: number;
}


/** //= `Элемент одного числа.` */
const ItemNumber: FC<IItemNumber> = ({
    item,
    colorText,
    currentPositionSv,
    offset
}) => {

    const animatedNumber = useAnimatedStyle(() => {

        const top = currentPositionSv.value + item.top;
        const zeroPoint = top - offset;
        const inRange = [-90, 0, 90];
        const opacity = interpolate(zeroPoint, inRange, [0, 1, 0]);
        const rotateX = `${interpolate(zeroPoint, inRange, [70, 0, 70])}deg`;
        const scale = interpolate(zeroPoint, inRange, [.7, 1, .7])

        return {
            top,
            opacity,
            transform: [
                { rotateX },
                { scale }
            ]
        }
    });
    
    return (
        <Animated.View style={[styles.timeBox, {height: item.heightElement}, animatedNumber]} >
            <Text style={[styles.timeText, {color: colorText}]} >{item.num}</Text>
        </Animated.View>
    );
};


const styles = StyleSheet.create({
    timeBox: {
        position: 'absolute',
        left: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        fontSize: Platform.OS === 'ios' ? 23 : 21,
        textAlign: 'center',
    }
});


export default ItemNumber;