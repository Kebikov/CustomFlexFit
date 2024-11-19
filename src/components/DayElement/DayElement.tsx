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
import useHookImageCheck from '@/hook/useHookImageCheck';


interface IDay {
	day?: DayDTO;
    backgroundZero?: boolean;
    width?: number;
}


/**
 * @component `Карточка дня занятий.`
 * @optional
 * @param day ? Обьект дня занятия с interface DayDTOomitId.
 * @param backgroundZero ? Цвет фона пока нет изображения.
 * @param width ? Ширина компонента в процентах. [example - 100]
 */
const DayElement: FC<IDay> = ({ 
    day,
    backgroundZero,
    width = 100
}) => {
    const {textCurrentDay} = getCurrentDateInFormatArray();
    const {convertFont} = useConvertFont();
    const {imgCheck} = useHookImageCheck();


    const image = 
        day && day.img ? imgCheck(day.img)
        :
        backgroundZero ? IMAGE.ZERO_FON
        :
        undefined;

	return (
        <View style={[styleDayElement.container, {width: `${width}%`}]} >
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
                        <Image source={day && day.lastExercise ? require('@/source/img/dumbbell-orange.png') : require('@/source/img/dumbbell-white.png')} style={styleDayElement.dumbbell} />
                        
                        <View style={[styleDayElement.textDateBox]}>
                            <Text style={[styleDayElement.textDate, {fontSize: convertFont(Platform.OS === 'ios' ? 14 : 13)}]}>{day ? day.date : textCurrentDay}</Text>
                        </View>

                        <View>
                            
                            <View style={styleDayElement.titleBox}>
                                <Text style={[styleDayElement.title, styleFontConvertForTitle.sport, {fontSize: convertFont(Platform.OS === 'ios' ? 16 : 15)}]} >
                                    {day ? day.title : null}
                                </Text>
                            </View>
                            
                            <Text style={[styleDayElement.textPart, {fontSize: convertFont(Platform.OS === 'ios' ? 15 : 14)}]} >
                                {day ? day.description : null}
                            </Text>
                        </View>
                    </ImageBackground>
                </Pressable>
            </View>
        </View>
	);
};


export const styleDayElement = StyleSheet.create({
    container: {
        marginTop: 15,
		height: 132,
        borderRadius: 10,
        overflow: 'hidden'
    },
    shadow_style: {
        flex: 1
    },
    shadow_view: {
        flex: 1
    },
	main: {
		width: '100%',
		height: '100%',
		overflow: 'hidden',
	},
	dumbbell: {
		position: 'absolute',
		top: 10,
		right: 15,
		width: 30,
		height: 19,
		resizeMode: 'contain'
	},
	titleBox: {
		flexDirection: 'row'
	},
	title: {
		fontFamily: 'Sport500',
		paddingHorizontal: 10,
		paddingVertical: 2,
		fontWeight: '600',
		backgroundColor: `${COLOR_ROOT.LIME}`,
		marginLeft: 10,
        borderRadius: 5,
        overflow: 'hidden'
	},
	textDateBox: {
		flexDirection: 'row',
		alignItems: 'center',
		borderLeftWidth: 3,
		borderLeftColor: `${COLOR_ROOT.LIME}`,
		marginLeft: 10,
		marginTop: 10
	},
	textDate: {
        fontFamily: 'Sport400',
        paddingBottom: 2,
		color: 'white',
		marginLeft: 10
	},
	textPart: {
        fontFamily: 'Sport400',
		color: 'white',
		marginLeft: 10,
		paddingTop: 10,
		paddingBottom: 10
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: 'rgba(0, 0, 0, 0.5)'
	},
	imageBackground: {
		flex: 1,
		justifyContent: 'space-between'
	}
});

export default DayElement;



