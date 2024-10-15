import { View, Text, StyleSheet, ImageBackground, Image, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useAppDispatch } from '@/redux/store/hooks';
import { useHookRouter } from '@/router/useHookRouter';
import type { DayDTOomitId } from '@/SQLite/day/DTO/day.dto';
import getCurrentDateInFormatArray from '@/helpers/getCurrentDateInFormatArray';
import { styleFontConvertForTitle } from '@/styles/font';
import useConvertFont from '@/hook/useConvertFont';
import { Shadow } from 'react-native-shadow-2';


interface IDay {
	day?: DayDTOomitId;
    title?: string;
    description?: string;
    backgroundZero?: boolean;
    img?: number | string | object |undefined;
    isShowShadow?: boolean;
}


/**
 * @component `Карточка дня занятий.`
 * @optional
 * @param day ? Обьект дня занятия с interface DayDTOomitId.
 * @param title ? Установливаеваемый заголовок.
 * @param description ? Устанавливаемое описание дня занятий.
 * @param backgroundZero ? Цвет фона пока нет изображения.
 * @param img ? Выбраное изображение для фона дня.
 * @param isShowShadow ? Отображать ли тень. [default - true]
 */
const DayElement: FC<IDay> = ({ 
    day,
    title,
    description,
    backgroundZero,
    img,
    isShowShadow = true
}) => {
    console.log(day);
    const {textCurrentDay} = getCurrentDateInFormatArray();
    const {convertFont} = useConvertFont();
    const dispatch = useAppDispatch();

	const { appRouter } = useHookRouter();

    if(typeof img === 'string') img = {uri: img}

	return (
        <View style={style.box} >
            <Shadow style={style.shadowContainer} distance={isShowShadow ? 12 : 0} startColor='rgba(255, 255, 255, .3)' >
                <Pressable
                    onPress={() => day ? appRouter.navigate({pathname: '/exercise/[id]', params: {dayExercise: day.day}}) : {}}
                    style={style.main}
                >
                    <ImageBackground 
                        source={
                            day ? day.img 
                            : 
                            img ? img 
                            : 
                            backgroundZero ? require('@/source/img/imgForScreen/zeroFon.jpg') 
                            : 
                            undefined
                        } 
                        style={[style.imageBackground]}
                    >
                        <View style={style.overlay} />
                        <Image source={day && day.lastExercise ? require('@/source/img/dumbbell-orange.png') : require('@/source/img/dumbbell-white.png')} style={style.dumbbell} />
                        
                        <View style={[style.textDateBox]}>
                            <Text style={[style.textDate, {fontSize: convertFont(Platform.OS === 'ios' ? 14 : 13)}]}>{day ? day.date : textCurrentDay}</Text>
                        </View>

                        <View>
                            
                            <View style={style.titleBox}>
                                <Text style={[style.title, styleFontConvertForTitle.sport, {fontSize: convertFont(Platform.OS === 'ios' ? 16 : 15)}]} >
                                    {title ? title : day ? day.title : null}
                                </Text>
                            </View>
                            
                            <Text style={[style.textPart, {fontSize: convertFont(Platform.OS === 'ios' ? 15 : 14)}]} >
                                {description ? description : day ? day.description : null}
                            </Text>
                        </View>
                    </ImageBackground>
                </Pressable>
            </Shadow>
        </View>
	);
};

const style = StyleSheet.create({
    box: {
        marginTop: 15,
        width: '85%',
		height: 132,
    },
    shadowContainer: {
        width: '100%',
        height: '100%'
    },
	main: {
		width: '100%',
		height: '100%',
		borderRadius: 10,
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



