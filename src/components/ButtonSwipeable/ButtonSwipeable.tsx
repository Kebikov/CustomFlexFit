import { useHookButtonSwipeable } from './hooks/useHookButtonSwipeable';
import { useHookAnimatedStyle } from './hooks/useHookAnimatedStyle';
import { COLOR_ROOT } from '@/constants/colors';
import React, { FC, useState, useMemo } from 'react';
import { StyleSheet, View, Dimensions, Image, Pressable, ViewStyle } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {useSharedValue, useAnimatedReaction, runOnJS, runOnUI} from 'react-native-reanimated';
import VibrationApp from '@/helpers/VibrationApp';
import ICON from '@/source/icon';
import { IButtonSwipeable } from './types'


/**
 * `Кнопка со скрытыми кнопками.`
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
    widthOneButton,
    heightOneButton,
    idButton,
    setActiveButtonId,
    activeButtonId
}) => {
        
    /** Активна ли основная кнопка, самая верхняя, большая. */
    const isActiveButton = useSharedValue<boolean>(false);
    /** Ширина экрана телефона. */
    const windowsWidth = Dimensions.get('window').width;
    /** Ширина в процентах, сколько место будет выделено под кнопки. */
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
    /** Выделенная ширина под кнопки. */
    const activeWidth = (windowsWidth * spaceForButtons) / 100;
    /** Ширина одной кнопки. */
    const widthButton = widthOneButton ? widthOneButton : activeWidth / totalButton;
    /** Отсечка смешения. */
    const activeWidthLeft = -activeWidth;

    const {
        update, 
        openStateButton, 
        closeStateButton,
        positionButtonSv,
        translateButtonSv,
        rightPositionButton1Sv,
        rightPositionButton2Sv,
        rightPositionButton3Sv
    } = useHookButtonSwipeable(
        activeWidthLeft, 
        widthButton, 
        isActiveButton,
        totalButton,
        widthOneButton,
    );
    
    const {
        animatedStyleButton,
        animatedStyleDownButton1,
        animatedStyleDownButton2,
        animatedStyleDownButton3
    } = useHookAnimatedStyle(
        translateButtonSv, 
        rightPositionButton1Sv, 
        rightPositionButton2Sv, 
        rightPositionButton3Sv
    );

    /** Обработчик жестов. */
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

    /** Обработка нажатия основной кнопки. */
    const onHandlePress = () => {
        'worklet';
        VibrationApp.pressButton();
        isActiveButton.value ? closeStateButton() : openStateButton(250);
        isActiveButton.value = !isActiveButton.value;
    }

    /** Стиль для контейнера кнопки. */
    const styleContainer : ViewStyle = {
        position: 'absolute', 
        top: heightOneButton ? '50%' : 0,
        marginTop: heightOneButton ? -heightOneButton / 2 : 0, 
        height: heightOneButton ? heightOneButton : '100%',
        width: widthButton,
    };


    /** Стиль для тела кнопки. */
    const styleBodyButton = (colorButton: string): ViewStyle => ({
        width: '100%',
        height: '100%', 
        padding: paddingInsideButton, 
        backgroundColor: colorButton, 
        borderRadius: borderRadiusButton
    });

    /** Кнопка под кнопкой. */
    const buttonDown = (
        animatedStyle: {right: number},
        onPressButton: (() => void) | undefined,
        iconForButton: number | undefined,
        colorButton: string
    ) => {
        return(
            <Animated.View 
                style={[
                    animatedStyle,
                    styleContainer
                ]} 
            >
                <Pressable 
                    style={{...styleBodyButton(colorButton)}}
                    onPress={
                        onPressButton
                        ? 
                        () => {
                            VibrationApp.pressButton(); 
                            onPressButton(); 
                            closeStateButton();
                        } 
                        : 
                        undefined
                    }
                >
                    <Image source={iconForButton} style={[styles.img, {tintColor: iconColor}]} />
                </Pressable>
            </Animated.View>
        )
    }

    // Если, id(idButton) кнопки и установленный активный id(activeButtonId) не совподают, закрываем данную кнопку.
    if(activeButtonId && idButton) {
        if(activeButtonId !== idButton) {
            runOnUI(closeStateButton)();
        }
    }

    // Отслеживание состояния кнопки и установка id в setActiveButtonId, если кнопка стала активной.
    useAnimatedReaction(
        () => isActiveButton.value,
        (currentValue, previousValue) => {
            if (currentValue === true && idButton && setActiveButtonId) {
                console.log(`Shared value changed: ${idButton}`);
                runOnJS(setActiveButtonId)(idButton);
            }
        },
        [idButton]
    );


    return (
        <View style={[styles.body, {marginTop, overflow: 'hidden'}]} >
            <GestureDetector gesture={panGesture} >
                <Animated.View style={[styles.button, animatedStyleButton]} >
                    <Pressable
                        style={styles.button_press}
                        onPress={() => onHandlePress()}
                    >
                        {children}
                    </Pressable>
                </Animated.View>
            </GestureDetector>
            {/* Background */}
            <View style={[styles.down]}>
                <View style={styles.down_body} >
                    {/*//* Button 1  */}
                    { buttonDown(animatedStyleDownButton1, onPressButton1, iconForButton1, colorButton1) }
                    {/*//* Button 2  */}
                    {
                        totalButton === 2 || totalButton === 3 
                        ?
                        buttonDown(animatedStyleDownButton2, onPressButton2, iconForButton2, colorButton2) 
                        :
                        null
                    }
                    {/*//* Button 3  */}
                    {
                        totalButton === 3 
                        ?
                        buttonDown(animatedStyleDownButton3, onPressButton3, iconForButton3, colorButton3) 
                        : 
                        null
                    }
                </View>
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
        position: 'relative',
        zIndex: 2,
        top: 0,
        width: '100%',
        height: 'auto', 
    },
    down: { 
        position: 'absolute',
        zIndex: 1,
        top: 0, 
        right: 0, 
        height: '100%', 
        width: '100%',

        flexDirection: 'row', 
        justifyContent: 'flex-end'
    },
    down_body: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
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

