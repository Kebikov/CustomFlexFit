import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC } from 'react';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    SharedValue
} from 'react-native-reanimated';

import type { TPositions } from '../types';


interface IItemNumber {
    item: TPositions;
    colorText: string;
    currentPositionSv: SharedValue<number>;
}


/** `Элемент одного числа.` */
const ItemNumber: FC<IItemNumber> = ({
    item,
    colorText,
    currentPositionSv
}) => {

    const animatedNumber = useAnimatedStyle(() => {
        return {
            top: currentPositionSv.value + item.top
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