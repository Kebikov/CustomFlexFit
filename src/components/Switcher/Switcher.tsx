import React, { useState, FC } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { COLOR_ROOT } from '@/constants/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';


interface ISwitcher {
    id: number;
    onPressing: (id: number) => void;
    isEnabled: boolean;

    height?: number;
    width?: number;
    diameter?: number;
    padding?: number;
    colorLeft?: string;
    colorRight?: string;
    animatedDuration?: number;
}

/**
 * @component `Переключатель.`
 * @param id Id для выбранного блока.
 * @param onPressing Функция обработки нажатия.
 * @param isEnabled ? Cостояние(вкл./выкл.).
 * @optional
 * @param height ? Высота контейнера. `default = 33`
 * @param width ? Ширина контейнера. `default = 22`
 * @param diameter ? Диаметр круга. `default = 22`
 * @param padding ? Отступ внутри контейнера. `default = 4`
 * @param colorLeft ? Цвет в левом положении. `default = COLOR_ROOT.BUTTON_COLOR_RED`
 * @param colorRight ? Цвет в правом положении. `default = COLOR_ROOT.BUTTON_COLOR_GREEN`
 * @param animatedDuration ? Продолжительность анимации. `default = 200`
 */
const Switcher: FC<ISwitcher> = ({
    id,
    onPressing,
    isEnabled,

    height = 36, // 33
    width = 52, // 52 
    diameter = 23, // 22
    padding = 4,
    colorLeft = COLOR_ROOT.BUTTON_COLOR_RED,
    colorRight = COLOR_ROOT.BUTTON_COLOR_GREEN,
    animatedDuration = 200
}) => {


    const circlePositionLeft = useSharedValue<number>(isEnabled ? width - diameter - padding * 2 - 2 : 2);
    const circleColor = useSharedValue<string>(isEnabled ? colorRight : colorLeft);

    const onPress = (id: number) => {
        'worklet';
        console.log('press');
        onPressing(id);
        if(isEnabled) {
            circleColor.value = withTiming(colorRight, {duration: animatedDuration});
            circlePositionLeft.value = withTiming(width - diameter - padding * 2 - 2, {duration: animatedDuration});
        } else {
            circleColor.value = withTiming(colorLeft, {duration: animatedDuration});
            circlePositionLeft.value = withTiming(2, {duration: animatedDuration});
        }
    }

    const amimatedStyle = useAnimatedStyle(() => {
        return {
            left: circlePositionLeft.value
        }
    });

    const amimatedStyleBody = useAnimatedStyle(() => {
        return {
            backgroundColor: circleColor.value
        }
    });

	return (
        <Pressable
            style={[styles.container, {height, width, padding}]} 
            onPress={() => onPress(id)}
        >
            <Animated.View style={[styles.body, amimatedStyleBody]}>
                <Animated.View 
                    style={[
                        styles.circle, 
                        amimatedStyle, 
                        {
                            width: diameter, 
                            height: diameter,
                            marginTop: -11.7,
                        }
                    ]} />
            </Animated.View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
    body: {
        position: 'relative',
        width: '100%',
        height: '100%',
        borderRadius: 20
    },
    circle: {
        position: 'absolute',
        top: '50%',
        borderRadius: 100,
        backgroundColor: 'white'
    }
});

export default Switcher;
