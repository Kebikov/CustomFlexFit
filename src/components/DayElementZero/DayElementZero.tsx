import { View, Text, ImageBackground, Image, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import HelperUtils from '@/utils/HelperUtils';
import { styleFontConvertForTitle } from '@/styles/font';
import useConvertFont from '@/hook/useConvertFont';
import { Shadow } from 'react-native-shadow-2';
import IMAGE from '@/source/img';
import { styleDayElement } from '../DayElement/DayElement';
import useHookImageCheck from '@/hook/useHookImageCheck';


interface IDayElementZero {
     /** `Установливаеваемый заголовок.` */
    title?: string;
     /** `Устанавливаемое описание дня занятий.` */
    description?: string;
     /** `Цвет фона пока нет изображения.` */
    backgroundZero?: boolean;
     /** `Выбраное изображение для фона дня.` */
    img?: number | string;
     /** `Отображать ли тень. [default - true]` */
    isShowShadow?: boolean;
     /** `Ширина компонента в процентах. [example - 100]` */
    width?: number;
}


/** @component `//= Карточка дня занятий с нулевыми данными.` */
const DayElementZero: FC<IDayElementZero> = ({
    title,
    description,
    backgroundZero,
    img,
    isShowShadow = true,
    width = 100
}) => {
    
    const {textCurrentDay} = HelperUtils.getCurrentDateInFormatArray();
    const {convertFont} = useConvertFont();
    const {imgCheck} = useHookImageCheck();

    const imageBackground = 
        img ? imgCheck(img)
        :
        backgroundZero ? IMAGE.ZERO_FON
        :
        undefined;

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
                            source={imageBackground} 
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



