import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '../../constants/colors';
import VibrationApp from '../../helpers/VibrationApp';
import useConvertFont from '../../hook/useConvertFont';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { Shadow } from 'react-native-shadow-2';


const ButtonAnimated = Animated.createAnimatedComponent(View);


interface IButtonGreen {
    text: string;
    handlePess: Function;
    marginTop?: number;
    marginBottom?: number;
    fontSize?: number;
    backgroundColor?: string;
    widthFlex?: number;
    shadowDistance?: number;
    sadowColor?: string;
}


const DURATION = 0;


/**
 * @component `Кнопка салатового цвета.`
 * @param text Текст кнопки.
 * @param handlePess  Функция обработки нажатия кнопки.
 * @optional
 * @param marginTop ? Отступ с верху. [default - 0]
 * @param marginBottom ? Отступ с низу. [default - 0]
 * @param fontSize ? Размер шрифта. [default - 19]
 * @param backgroundColor ? Цвет фона кнопки. [default - COLOR_ROOT.LIME]
 * @param widthFlex ? Ширина как Flex. [default - .9]
 * @param shadowDistance ? Размер тени. [default - 0]
 * @param sadowColor ? Цвет тени. [default - '#fff']
 */
const ButtonGreen: FC<IButtonGreen> = ({
    text,
    handlePess = () => {},
    marginTop = 0,
    marginBottom = 0,
    fontSize = 19,
    backgroundColor = COLOR_ROOT.LIME,
    widthFlex = .9,
    shadowDistance = 0,
    sadowColor = '#fff'
}) => {

    const scale = useSharedValue(1);
    const {convertFont} = useConvertFont();
    const animatedStyle = useAnimatedStyle(() => {

        return {
            transform: [{scale: scale.value}]
        }
    });

    return (
        
        <ButtonAnimated style={[styles.box_button, animatedStyle, {marginBottom, marginTop, paddingHorizontal: shadowDistance}]} >
            <Shadow
                containerStyle={{flex: widthFlex}}
                style={[styles.shadow_style, {alignSelf: 'stretch', backgroundColor}]}
                distance={shadowDistance}
                startColor={sadowColor}
            >
                <View style={styles.shadow_view} >
                    <Pressable
                        style={[styles.button]}
                        onPress={() => {
                            VibrationApp.pressButton();
                            setTimeout(() => {
                                handlePess();
                            }, DURATION);
                        }}
                        onPressIn={() => {
                            VibrationApp.pressButton();
                            scale.value = .95;
                        }}
                        onPressOut={() => scale.value = withTiming(1, {duration: DURATION})}
                    >
                        <Text style={[styles.text_button, {fontSize: convertFont(fontSize)}]}>{text}</Text>
                    </Pressable>
                </View>
            </Shadow>
        </ButtonAnimated>
    );
};


const styles = StyleSheet.create({
    box_button: {
        justifyContent: 'center',
        flexDirection: 'row'
    },
            shadow_style: {
                borderRadius: 40,
                height: 50,
            },
                shadow_view: {
                    flex: 1
                },
                button: {
                    // backgroundColor: props
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                    text_button: {
                        textAlign: 'center',
                        textAlignVertical: 'center',
                        fontFamily: 'Sport600',
                        textTransform: 'uppercase'
                    },
});


export default ButtonGreen;
