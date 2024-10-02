import { View, StyleSheet, ImageBackground, ActivityIndicator, Text } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { IExercise, TExercise } from '@/constants/dataStartExercise';
import { Gesture, GestureDetector, FlatList } from 'react-native-gesture-handler';
//* redux
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { setSliceExerciseArray } from '@/redux/slice/sets.slice';
import { setSliceSaveInDataBase } from '@/redux/slice/sets.slice';
import { useLocalSearchParams } from 'expo-router';
//* component
import DateExercise from '@/components/DateExercise/DateExercise';
import WeightExercise from '@/components/WeightExercise/WeightExercise';
import UpDownWeight from '@/components/UpDownWeight/UpDownWeight';
import TimeView from '@/components/TimeView/TimeView';
import Sets from '@/components/Sets/Sets';
import HeaderExerciseNav from '@/components/HeaderExerciseNav/HeaderExerciseNav';
//* SQL
import CONFIGURATION from '@/constants/сonfiguration';
import { useSQLiteContext } from 'expo-sqlite';
import { COLOR_ROOT } from '@/constants/colors';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';

export type TNumExercise = 0 | 1 | 2;


/**
 * @screen
 * `Экран с днем занятия и упражнениями.`
 * @returns {JSX.Element}
 */
const Exercise: FC = () => {

    const db = useSQLiteContext();

	// dayExercise - День занятий который propse полученый при переходе, в формате "DAY_1" | "DAY_2" | ...
    const {dayExercise} = useLocalSearchParams<{dayExercise: string}>();
    console.log(dayExercise);

	const exerciseValue: Array<TExercise> = ['EXERCISE_1', 'EXERCISE_2', 'EXERCISE_3'];
	/**
	 * @param exerciseArray Массив с данными о упражнениях в данный день.
	 */
	const exerciseArray = useAppSelector(state => state.setsSlice.exerciseArray); 
	/**
	 * Изминения состояния выбора упражнения.
	 * @param selectExercise - Число которое используется для выбора упражнения из массива.
	 */
	const [selectExercise, setSelectExercise] = useState<TNumExercise>(0);
    const dispatch = useAppDispatch();
    /**
     * Обьект выбранного упрожнения.
     */
	let exercise = exerciseArray.find(item => item.exercise === exerciseValue[selectExercise]);

	useEffect(() => {
        (async () => {
            const data: Array<IExercise> = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_EXERCISE} WHERE day = "${dayExercise}"`);
            console.log(JSON.stringify( data, null, 2));

            dispatch(setSliceExerciseArray(data));
        })();
        return () => {
            dispatch(setSliceSaveInDataBase());
        }
	}, []);


    // Обработка свайпов
    const swipe = Gesture.Pan()
        .onEnd((e) => {
            if(e.translationX > 80) {
                setSelectExercise(state => {
                    if(state !== undefined && 0 < state) {
                        return (state - 1) as TNumExercise;
                    } else {
                        return state;
                    }
                });
            }
            if(e.translationX < -80) {

                setSelectExercise(state => {
                    if(state !== undefined && state < 2) {
                        return (state + 1) as TNumExercise;
                    } else {
                        return state;
                    }
                });
            }
        });

    if (!exercise) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#0000ff' />
            </View>
        );
    }

    
    return (
        <WrapperScroll>
            <HeaderExerciseNav setSelectExercise={setSelectExercise} />
            <GestureDetector gesture={swipe} >
                <View style={styles.main}>
                    <ImageBackground source={exercise.img} style={styles.header} >
                        <DateExercise/>
                        <View style={styles.numberBox} >
                            <Text style={styles.numberText} >{selectExercise + 1}</Text>
                        </View>
                        <WeightExercise exercise={exercise} />
                        <UpDownWeight exercise={exercise} />
                    </ImageBackground>
                    <Sets exercise={exercise} />
                </View>
            </GestureDetector>
            <TimeView givenTime={150} />
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
        backgroundColor: COLOR_ROOT.BACKGROUND
	},
	header: {
		width: '100%',
		height: 340,
		borderBottomLeftRadius: 40,
		borderBottomRightRadius: 40,
		overflow: 'hidden',
		justifyContent: 'space-between',

        shadowColor: '#fff',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 5
	},
	text: {
		color: '#fff',
		fontSize: 30
	},
    numberBox: {
        position: 'absolute',
        left: 30,
        top: 30
    },
    numberText: {
        color: 'white',
        fontSize: 200,
        fontFamily: 'Sport',
        opacity: .6
    }
});

export default Exercise;
