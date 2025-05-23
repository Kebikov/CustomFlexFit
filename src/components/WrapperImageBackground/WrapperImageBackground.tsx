import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '../WrapperScroll/WrapperScroll';
import Menu from '../Menu/Menu';
import { LinearGradient } from 'expo-linear-gradient';
import { COLOR_ROOT } from '@/constants/colors';


interface ILinearGradient {
    colors: [string, string, ...string[]];
    start: {
        x: number;
        y: number;
    }
}

interface IWrapperImageBackground {
    children: JSX.Element | JSX.Element[];
     /** `Цвет перекрытия фонового изображения.` */
    overlayColor?: string;
     /** `Фоновое изображение.` */
    imageBackground?: number;
     /** `Установка в качестве фона гредиента, принимает обьект с начальными данными. `default = undefined`` */
    linearGradient?: ILinearGradient;
     /** `Если не нужен ScrollView, передаем false. [default = true]` */
    isScrollEnabled?: boolean;
}


/** `Обертка для страниц с фоновым изображением.` */
const WrapperImageBackground: FC<IWrapperImageBackground> = ({
    children,
    overlayColor,
    imageBackground,
    linearGradient,
    isScrollEnabled = true
}) => {

    const body = (
        <>
            {/* <Menu/> */}
            <View style={[styles.overlay, {backgroundColor: overlayColor}]} >
                <WrapperScroll
                    isScrollEnabled={isScrollEnabled}
                >
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