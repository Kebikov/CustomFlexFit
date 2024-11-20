import { useHookButtonSwipeable } from './hooks/useHookButtonSwipeable';
import { useHookAnimatedStyle } from './hooks/useHookAnimatedStyle';
import { COLOR_ROOT } from '@/constants/colors';
import React, { FC, useState, useMemo } from 'react';
import { StyleSheet, View, Dimensions, Image, Pressable, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {useSharedValue} from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import ICON from '@/source/icon';


interface IButtonSwipeable {
    children: JSX.Element | JSX.Element[];
    totalButton: 1 | 2 | 3;
    onPressButton1: Function;

    onPressButton2?: Function;
    onPressButton3?: Function;
    iconForButton1?: number;
    iconForButton2?: number;
    iconForButton3?: number;
    paddingInsideButton?: number;
    borderRadiusButton?: number;
    colorButton1?: string;
    colorButton2?: string;
    colorButton3?: string;
    marginTop?: number;
    iconColor?: string;
    drag?: () => void;
    isActive?: boolean;
    paddingOutsideButtonHorizontal?: number;
    paddingOutsideButtonVertical?: number;
}
`default = `
/**
 * @widgets `Кнопка со скрытыми кнопками.`
 * @param children Дочерний элемент оболочки.
 * @param totalButton Количество кнопок под кнопкой.
 * @param onPressButton1 Функция обработываюшая нажатия на кнопку #1.
 * @optional
 * @param onPressButton2 ? Функция обработываюшая нажатия на кнопку #2. `default = undefined`
 * @param onPressButton3  ? Функция обработываюшая нажатия на кнопку #3. `default = undefined`
 * @param iconForButton1 ? Иконка кнопки #1. `default = ICON.EDIT_BTN`
 * @param iconForButton2 ? Иконка кнопки #2. `default = ICON.COPY`
 * @param iconForButton3 ? Иконка кнопки #3. `default = ICON.DEL_BTN`
 * @param paddingInsideButton ? Отступ внутри кнопки для регулировки размера иконки внутри кнопки. `default = 23`
 * @param paddingOutsideButtonHorizontal ? Отступ горизонтальный, внешний, для регулировки размера кнопок по горизонтали. `default = 0`
 * @param paddingOutsideButtonVertical ? Отступ вертикальный, внешний, для регулировки размера кнопок по вертикали. `default = 0`
 * @param borderRadiusButton ? Радиус закругления блока. `default = 10`
 * @param colorButton1 ? Цвет кнопки 1. `default = COLOR_ROOT.BUTTON_COLOR_GREEN`
 * @param colorButton2 ? Цвет кнопки 2. `default = COLOR_ROOT.BUTTON_COLOR_YELLOW`
 * @param colorButton3 ? Цвет кнопки 3. `default = COLOR_ROOT.BUTTON_COLOR_RED`
 * @param marginTop ? Отступ с верху. `default = undefined`
 * @param iconColor ? Цвет эконки. `default = undefined`
 * @param drag ? Функция из DraggableFlatList, для обработки перемешения элемента. `default = undefined`
 * @param isActive ? Булевое значение из DraggableFlatList, во время перемешения true. `default = undefined`
 */
const ButtonSwipeable: FC<IButtonSwipeable> = ({ 
    children, 
    totalButton, 
    onPressButton1, 
    onPressButton2, 
    onPressButton3,
    iconForButton1 = ICON.EDIT_BTN,
    iconForButton2 = ICON.COPY,
    iconForButton3 = ICON.DEL_BTN,
    paddingInsideButton = 23,
    borderRadiusButton = 10,
    colorButton1 = COLOR_ROOT.BUTTON_COLOR_GREEN,
    colorButton2 = COLOR_ROOT.BUTTON_COLOR_YELLOW,
    colorButton3 = COLOR_ROOT.BUTTON_COLOR_RED,
    marginTop,
    iconColor,
    drag,
    isActive,
    paddingOutsideButtonHorizontal = 0,
    paddingOutsideButtonVertical = 0
}) => {
    /**
     * @param isActiveButton Состояние кнопки, в открытом или закрытом состоянии находится кнопка.
     */
    const isActiveButton = useSharedValue<boolean>(false);
    /**
     * Ширина экрана телефона.
     */
    const windowsWidth = Dimensions.get('window').width;
    /**
     * `Ширина в процентах, сколько место будет выделено под кнопки.`
     */
    let spaceForButtons = 0;
    switch(totalButton) {
        case 1: spaceForButtons = 20;
            break;
        case 2: spaceForButtons = 33;
            break;
        case 3: spaceForButtons = 50;
            break;
        default: spaceForButtons = 50;
            break;
    }
    /**
     * Выделенная ширина под кнопки.
     */
    const activeWidth = windowsWidth * spaceForButtons / 100;
    /**
     * Ширина одной кнопки.
     */
    const widthButton = activeWidth / totalButton;
    /**
     * Отсечка смешения.
     */
    const activeWidthLeft = -activeWidth;
    /**
     * `Смешение кнопки для ровномерного отступа при задании padding между кнопками.`
     */
    const shiftButton = paddingOutsideButtonHorizontal;
    const {
        update, 
        openStateButton, 
        closeStateButton,
        positionButtonSv,
        translateButtonSv,
        translateDownButton1Sv,
        translateDownButton2Sv,
        translateDownButton3Sv
    } = useHookButtonSwipeable(activeWidthLeft, widthButton, isActiveButton, shiftButton);
    const {
        animatedStyleButton,
        animatedStyleDownButton1,
        animatedStyleDownButton2,
        animatedStyleDownButton3
    } = useHookAnimatedStyle(translateButtonSv, translateDownButton1Sv, translateDownButton2Sv, translateDownButton3Sv);

    /**
     * Обработчик жестов.
     */
    const panGesture = useMemo(() => Gesture.Pan()
        .activeOffsetX([-10, 10])
        .onUpdate(({translationX, translationY}) => {
            if(translationX < 0) {
                update(translationX);
            }
            if(positionButtonSv.value === activeWidthLeft && translationX > 0) {
                update(translationX);
            }
        })
        .onEnd(({translationX}) => {
            if(translationX < 0) {
                // Движение с права на лево <<< --- <<<
                if(translateButtonSv.value > activeWidthLeft / 3) {
                    closeStateButton();
                } else {
                    openStateButton(100);
                }
            } else {
                // Движение с лева на права >>> --- >>>
                closeStateButton();
            }
        }),[]);
    /**
     * Обработка нажатия основной кнопки.
     */
    const onHandlePress = () => {
        'worklet';
        VibrationApp.pressButton();
        isActiveButton.value ? closeStateButton() : openStateButton(250);
        isActiveButton.value = !isActiveButton.value;
    }

    /**
     * `Стиль для контейнера кнопки.`
     */
    const styleContainerButton: ViewStyle = ({
        width: widthButton, 
        right: -widthButton,
        paddingHorizontal: paddingOutsideButtonHorizontal,
        paddingVertical: paddingOutsideButtonVertical 
    });

    /**
     * `Стиль для тела кнопки.`
     */
        const styleBodyButton = (colorButton: string): ViewStyle => ({
            flex: 1, 
            padding: paddingInsideButton, 
            backgroundColor: colorButton, 
            borderRadius: borderRadiusButton
        });


    return (
        <View style={[styles.body, {marginTop, overflow: 'hidden'}]} >
            <GestureDetector gesture={panGesture} >
                <Animated.View style={[styles.button, animatedStyleButton]} >
                    <Pressable 
                        onLongPress={drag}
                        disabled={isActive} 
                        style={styles.button_press}
                        onPress={() => onHandlePress()}
                    >
                        {children}
                    </Pressable>
                </Animated.View>
            </GestureDetector>
            {/* Background */}
            <View style={[styles.down]}>
                <Animated.View 
                    style={[styles.down_button_common, animatedStyleDownButton1,
                        {
                            ...styleContainerButton
                        }
                    ]} 
                >
                    <Pressable 
                        style={{...styleBodyButton(colorButton1)}}
                        onPress={
                            onPressButton1 
                            ? 
                            () => {
                                VibrationApp.pressButton(); 
                                onPressButton1(); 
                                closeStateButton();
                            } 
                            : 
                            null
                        }
                    >
                        <Image source={iconForButton1} style={[styles.img, {tintColor: iconColor}]} />
                    </Pressable>
                </Animated.View>
                {
                    totalButton === 2 || totalButton === 3 
                    ?
                    <Animated.View 
                        style={[styles.down_button_common, animatedStyleDownButton2,
                            {
                                ...styleContainerButton
                            }
                        ]} 
                    >
                        <Pressable 
                            style={{...styleBodyButton(colorButton2)}} 
                            onPress={
                                onPressButton2 
                                ? 
                                () => {
                                    VibrationApp.pressButton();
                                    onPressButton2();
                                    closeStateButton();
                                } 
                                : 
                                null
                            }
                        >
                            <Image source={iconForButton2} style={[styles.img, {tintColor: iconColor}]} />
                        </Pressable>
                    </Animated.View>
                    :
                    null
                }
                {
                    totalButton === 3 
                    ?
                    <Animated.View 
                        style={[styles.down_button_common, animatedStyleDownButton3,
                            {
                                ...styleContainerButton
                            }
                        ]} 
                    >
                        <Pressable 
                            style={{...styleBodyButton(colorButton3)}} 
                            onPress={
                                onPressButton3 
                                ? 
                                () => {
                                    VibrationApp.pressButton();
                                    onPressButton3();
                                    closeStateButton();
                                }
                                : 
                                null
                            }
                        >
                            <Image source={iconForButton3} style={[styles.img, {tintColor: iconColor}]} />
                        </Pressable>
                    </Animated.View>
                    : 
                    null
                }
            </View>

        </View>
    );
};

const styles = StyleSheet.create({
    body: { 
        position: 'relative', 
        width: '100%' 
    },
    button: { 
        width: '100%' 
    },
    down: { 
        position: 'absolute',
        top: 0, 
        right: -1, 
        height: '100%', 
        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    down_button_common: { 
        position: 'absolute', 
        top: 0, 
        height: '100%'
    },
    button_press: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    img: { 
        objectFit: 'contain', 
        width: '100%', 
        height: '100%',
        tintColor: 'white'
    }
});

export default ButtonSwipeable;

