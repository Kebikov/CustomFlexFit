import { View, Text, StyleSheet, ImageBackground, Image, Pressable, Platform } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@/redux/store/hooks';
import { useHookRouter } from '@/router/useHookRouter';
import type { DayDTOomitId, DayDTO } from '@/SQL/Day/DTO/DayDTO';
import getCurrentDateInFormatArray from '@/helpers/getCurrentDateInFormatArray';
import { styleFontConvertForTitle } from '@/styles/font';
import useConvertFont from '@/hook/useConvertFont';
import { Shadow } from 'react-native-shadow-2';
import IMAGE from '@/source/img';
import imgCheck from '@/helpers/imgCheck';
import { styleDayElement } from '../DayElement/DayElement';



interface IDayElementZero {
    title?: string;
    description?: string;
    backgroundZero?: boolean;
    img?: number | string | object | undefined;
    isShowShadow?: boolean;
    width?: number;
}


/**
 * @component `Карточка дня занятий с нулевыми данными.`
 * @optional
 * @param title ? Установливаеваемый заголовок.
 * @param description ? Устанавливаемое описание дня занятий.
 * @param backgroundZero ? Цвет фона пока нет изображения.
 * @param img ? Выбраное изображение для фона дня.
 * @param isShowShadow ? Отображать ли тень. [default - true]
 * @param width ? Ширина компонента в процентах. [example - 100]
 */
const DayElementZero: FC<IDayElementZero> = ({ 
    title,
    description,
    backgroundZero,
    img,
    isShowShadow = true,
    width = 100
}) => {
    console.debug('day >>> ', typeof img);
    const {textCurrentDay} = getCurrentDateInFormatArray();
    const {convertFont} = useConvertFont();

    const [image, setImage] = useState<number | {uri: string} | undefined>();

    useEffect(() => {
        (async () => {
            const currentImg = await imgCheck(
                img ? img 
                : 
                backgroundZero ? IMAGE.ZERO_FON 
                : 
                undefined
            );

            setImage(currentImg);
        })();
    }, [img]);

	return (
        <View style={[styleDayElement.container, {width: `${width}%`}]} >
            <Shadow 
                containerStyle={{flex: 1}}
                style={[styleDayElement.shadow_style, {alignSelf: 'stretch'}]} 
                distance={isShowShadow ? 12 : 0} 
                startColor='rgba(255, 255, 255, .3)' 
            >
                <View style={styleDayElement.shadow_view} >
                    <Pressable
                        //onPress={() => day ? appRouter.navigate({pathname: '/exercise/[id]', params: {dayExercise: day.day}}) : {}}
                        style={styleDayElement.main}
                    >
                        <ImageBackground 
                            source={image} 
                            style={[styleDayElement.imageBackground]}
                        >
                            <View style={styleDayElement.overlay} />
                            <Image source={require('@/source/img/dumbbell-white.png')} style={styleDayElement.dumbbell} />
                            
                            <View style={[styleDayElement.textDateBox]}>
                                <Text style={[styleDayElement.textDate, {fontSize: convertFont(Platform.OS === 'ios' ? 14 : 13)}]}>{textCurrentDay}</Text>
                            </View>

                            <View>
                                
                                <View style={styleDayElement.titleBox}>
                                    <Text style={[styleDayElement.title, styleFontConvertForTitle.sport, {fontSize: convertFont(Platform.OS === 'ios' ? 16 : 15)}]} >
                                        {title}
                                    </Text>
                                </View>
                                
                                <Text style={[styleDayElement.textPart, {fontSize: convertFont(Platform.OS === 'ios' ? 15 : 14)}]} >
                                    {description}
                                </Text>
                            </View>
                        </ImageBackground>
                    </Pressable>
                </View>
            </Shadow>
        </View>
	);
};


export default DayElementZero;



