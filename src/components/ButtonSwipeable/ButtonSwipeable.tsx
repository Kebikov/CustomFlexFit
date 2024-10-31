import { useHookButtonSwipeable } from './hooks/useHookButtonSwipeable';
import { useHookAnimatedStyle } from './hooks/useHookAnimatedStyle';
import { COLOR_ROOT } from '@/constants/colors';
import React, { FC, useState, useMemo } from 'react';
import { StyleSheet, View, Dimensions, Image, Pressable } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import ICON from '@/source/icon';
import type { RenderItemParams } from 'react-native-draggable-flatlist';


interface IButtonSwipeable<I> {
    children: JSX.Element | JSX.Element[];
    totalButton: 1 | 2 | 3;
    onPressButton1: Function;

    onPressButton2?: Function;
    onPressButton3?: Function;
    iconForButton1?: number;
    iconForButton2?: number;
    iconForButton3?: number;
    paddingForButton?: number;
    colorButton1?: string;
    colorButton2?: string;
    colorButton3?: string;
    marginTop?: number;
    iconColor?: string;
    drag?: () => void;
    isActive?: boolean;
}

/**
 * @widgets `Кнопка со скрытыми кнопками.`
 * @param children Дочерний элемент оболочки.
 * @param totalButton Количество кнопок под кнопкой.
 * @param onPressButton1 Функция обработываюшая нажатия на кнопку #1.
 * @optional
 * @param onPressButton2 ? Функция обработываюшая нажатия на кнопку #2.
 * @param onPressButton3  ? Функция обработываюшая нажатия на кнопку #3.
 * @param iconForButton1 ? Иконка кнопки #1.
 * @param iconForButton2 ? Иконка кнопки #2.
 * @param iconForButton3 ? Иконка кнопки #3.
 * @param paddingForButton ? Отступ для появляюшихся кнопок.
 * @param colorButton1 ? Цвет кнопки 1.
 * @param colorButton2 ? Цвет кнопки 2.
 * @param colorButton3 ? Цвет кнопки 3.
 * @param isScrollActiveSv ? SharedValue устанавливаюшее активность внешнего скрола.
 * @param marginTop ? Отступ с верху.
 * @param iconColor ? Цвет эконки.
 * @param drag ? Используется при FlatlistDrag, действие при длительном нажатии.
 * @param isActive ? Используется при FlatlistDrag, флаг когда происходит перемешение элемента.
 */
const ButtonSwipeable = <I,>({ 
    children, 
    totalButton, 
    onPressButton1, 
    onPressButton2, 
    onPressButton3,
    iconForButton1 = ICON.EDIT_BTN,
    iconForButton2 = ICON.COPY,
    iconForButton3 = ICON.DEL_BTN,
    paddingForButton = 23,
    colorButton1 = COLOR_ROOT.BUTTON_COLOR_GREEN,
    colorButton2 = COLOR_ROOT.BUTTON_COLOR_YELLOW,
    colorButton3 = COLOR_ROOT.BUTTON_COLOR_RED,
    marginTop,
    iconColor,
    drag,
    isActive
}: IButtonSwipeable<I>) => {
    /**
     * @param isActiveButton Состояние кнопки, в открытом или закрытом состоянии находится кнопка.
     */
    const [isActiveButton, setIsActiveButton] = useState<boolean>(false);
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
    const {
        update, 
        openStateButton, 
        closeStateButton,
        positionButtonSv,
        translateButtonSv,
        translateDownButton1Sv,
        translateDownButton2Sv,
        translateDownButton3Sv
    } = useHookButtonSwipeable(activeWidthLeft, widthButton, setIsActiveButton);
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
        setIsActiveButton(state => {
            state ? closeStateButton() : openStateButton(250);
            return !state;
        });
    }

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
                            width: widthButton, 
                            right: -widthButton, 
                            backgroundColor: colorButton1
                        }
                    ]} 
                >
                    <Pressable 
                        style={{flex: 1, padding: paddingForButton}}
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
                                width: widthButton, 
                                right: -widthButton,
                                backgroundColor: colorButton2
                            }
                        ]} 
                    >
                        <Pressable 
                            style={{flex: 1, padding: paddingForButton}} 
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
                                width: widthButton,
                                right: -widthButton,
                                backgroundColor: colorButton3
                            }
                        ]} 
                    >
                        <Pressable 
                            style={{flex: 1, padding: paddingForButton}} 
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
        height: '100%',
        borderRadius: 10
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

