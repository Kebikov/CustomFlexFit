import styles from './styles';
import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { COLOR_ROOT } from '@/constants/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';
import { ISwitcher } from './types';


/** @component `//= Переключатель.` */
const Switcher: FC<ISwitcher> = ({
    id,
    onPressing,
    isEnabled,
    height = 44, 
    width = 62, 
    diameter,
    padding = 8,
    colorOff = COLOR_ROOT.BUTTON_COLOR_RED,
    colorOn = COLOR_ROOT.BUTTON_COLOR_GREEN,
    animatedDuration = 200
}) => {
     /** `Отступ для круга от контейнера.` */
    const gap = 2;
     /** `Высота контейнера для переключателя.` */
    const heightContainer = height - padding * 2;
     /** `Ширина контейнера для переключателя.` */
    const widthContainer = width - padding * 2;
     /** `Диаметр круга переключателя.` */
    const circleDiameter = diameter ? diameter : heightContainer - gap;
     /** `Крайняя позиция переключателя.` */
    const endPosition = widthContainer - circleDiameter - gap;
     /** `Начальная позиция переключателя.` */
     const startPosition = 0 + gap;

    const circlePosition = useSharedValue<number>(isEnabled ? endPosition : startPosition);
    const circleColor = useSharedValue<string>(isEnabled ? colorOff : colorOn);

    const amimatedPosition = useAnimatedStyle(() => {
        return {
            left: circlePosition.value
        }
    });

    const amimatedColor = useAnimatedStyle(() => {
        return {
            backgroundColor: circleColor.value
        }
    });

    useEffect(() => {
        if(isEnabled) {
            circleColor.value = withTiming(colorOn, {duration: animatedDuration});
            circlePosition.value = withTiming(endPosition, {duration: animatedDuration});
        } else {
            circleColor.value = withTiming(colorOff, {duration: animatedDuration});
            circlePosition.value = withTiming(startPosition, {duration: animatedDuration});
        }
    }, [isEnabled]);

	return (
        <Pressable
            style={[styles.container, {height, width, padding}]} 
            onPress={() => onPressing(id)}
        >
            <Animated.View style={[styles.body, amimatedColor]}>
                <Animated.View 
                    style={[
                        styles.circle, 
                        amimatedPosition, 
                        {
                            top: '50%',
                            width: circleDiameter, 
                            height: circleDiameter,
                            marginTop: -circleDiameter / 2,
                        }
                    ]} />
            </Animated.View>
        </Pressable>
    )
};


export default Switcher;
