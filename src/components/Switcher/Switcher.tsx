import React, { FC, useEffect } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import { COLOR_ROOT } from '@/constants/colors';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, runOnJS } from 'react-native-reanimated';


interface ISwitcher {
    id: number;
    onPressing: (id: number) => void;
    isEnabled: boolean;

    height?: number;
    width?: number;
    diameter?: number;
    padding?: number;
    colorOff?: string;
    colorOn?: string;
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
 * @param colorOff ? Цвет в левом положении. `default = COLOR_ROOT.BUTTON_COLOR_RED`
 * @param colorOn ? Цвет в правом положении. `default = COLOR_ROOT.BUTTON_COLOR_GREEN`
 * @param animatedDuration ? Продолжительность анимации. `default = 200`
 */
const Switcher: FC<ISwitcher> = ({
    id,
    onPressing,
    isEnabled,

    height = 44, 
    width = 64, 
    diameter,
    padding = 8,
    colorOff = COLOR_ROOT.BUTTON_COLOR_RED,
    colorOn = COLOR_ROOT.BUTTON_COLOR_GREEN,
    animatedDuration = 200
}) => {
     /** `Высота контейнера для переключателя.` */
    const heightContainer = height - padding * 2;
     /** `Ширина контейнера для переключателя.` */
    const widthContainer = width - padding * 2;
     /** `Диаметр круга переключателя.` */
    const circleDiameter = diameter ? diameter : heightContainer;
     /** `Крайняя позиция переключателя.` */
    const endPosition = widthContainer - circleDiameter;
     /** `Начальная позиция переключателя.` */
     const startPosition = 0;

    const circlePosition = useSharedValue<number>(isEnabled ? endPosition : startPosition);
    const circleColor = useSharedValue<string>(isEnabled ? colorOff : colorOn);

    const onPress = (id: number) => {
        'worklet';
        runOnJS(onPressing)(id);
    }

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
            onPress={() => {
                console.log('press');
                onPress(id);
            }}
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

const styles = StyleSheet.create({
	container: {
		alignItems: 'flex-start',
		justifyContent: 'center'
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
