import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '../WrapperScroll/WrapperScroll';
import Menu from '../Menu/Menu';


interface IWrapperImageBackground {
    children: JSX.Element | JSX.Element[];
    overlayColor?: string;
    imageBackground?: number;
}


/**
 * @wrapper `Обертка для страниц с фоновым изображением.`
 * @param imageBackground Фоновое изображение.
 * @param overlayColor ? Цвет перекрытия фонового изображения.
 */
const WrapperImageBackground: FC<IWrapperImageBackground> = ({
    children,
    overlayColor,
    imageBackground
}) => {

    return (
        <ImageBackground
            source={imageBackground}
            style={[styles.imageBackground]}
        >
            <Menu/>
            <View style={[styles.overlay, {backgroundColor: overlayColor}]} >
                <WrapperScroll>
                    {children}
                </WrapperScroll>
            </View>
        </ImageBackground>
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