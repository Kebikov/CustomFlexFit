import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '../WrapperScroll/WrapperScroll';
import Menu from '../Menu/Menu';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR_ROOT } from '@/constants/colors';


interface ILinearGradient {
    colors: string[];
    start: {
        x: number;
        y: number;
    }
}

interface IWrapperImageBackground {
    children: JSX.Element | JSX.Element[];
    overlayColor?: string;
    imageBackground?: number;
    linearGradient?: ILinearGradient;
}


/**
 * @wrapper `Обертка для страниц с фоновым изображением.`
 * @param imageBackground Фоновое изображение.
 * @param overlayColor ? Цвет перекрытия фонового изображения.
 * @optional
 * @param linearGradient ? Установка в качестве фона гредиента, принимает обьект с начальными данными. `default = undefined`
 */
const WrapperImageBackground: FC<IWrapperImageBackground> = ({
    children,
    overlayColor,
    imageBackground,
    linearGradient
}) => {

    const body = (
        <>
            {/* <Menu/> */}
            <View style={[styles.overlay, {backgroundColor: overlayColor}]} >
                <WrapperScroll>
                    {children}
                </WrapperScroll>
            </View>
        </>
    );


    return (
        <>
            {
                linearGradient ?
                    <LinearGradient
                        colors={linearGradient.colors} 
                        start={linearGradient.start} 
                        style={[styles.imageBackground]}
                    >
                        {body}
                    </LinearGradient>
                    :
                    <ImageBackground
                        source={imageBackground}
                        style={[styles.imageBackground]}
                    >
                        {body}
                    </ImageBackground>
            }
        </>
    );
};


const styles = StyleSheet.create({
    imageBackground: {
        flex: 1
    },
    overlay: {
        flex: 1
    }
});


export default WrapperImageBackground;