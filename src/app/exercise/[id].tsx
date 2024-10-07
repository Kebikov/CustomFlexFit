import { View, StyleSheet, Text, Dimensions } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { ExerciseDTO } from '@/SQLite/exercise/DTO/exercise.dto';
import { FlatList } from 'react-native-gesture-handler';
//* redux
import { useAppDispatch, useAppSelector } from '@/redux/store/hooks';
import { useLocalSearchParams } from 'expo-router';
//* component
import TimeView from '@/components/TimeView/TimeView';
import HeaderExerciseNav from '@/components/HeaderExerciseNav/HeaderExerciseNav';
import ExerciseElement from '@/components/ExerciseElement/ExerciseElement';
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
    /**
     * `Ширина экрана телефона.`
     */
    const windowsWidth = Dimensions.get('window').width;
	/**
     * dayExercise - День занятий который propse полученый при переходе, в формате "DAY_1" | "DAY_2" | ...
     */
    const {dayExercise} = useLocalSearchParams<{dayExercise: string}>();

    const [currentExercises, setCurrentExercises] = useState<Array<ExerciseDTO>>([]);

	useEffect(() => {
        (async () => {
            const data: Array<ExerciseDTO> = await db.getAllAsync(`SELECT * FROM ${CONFIGURATION.TABLE_EXERCISE} WHERE day = "${dayExercise}"`);
            setCurrentExercises(data);
        })();
	}, []);


    return (
        <WrapperScroll>
            <HeaderExerciseNav />
            <View style={{backgroundColor: 'grey', flex: 1}}>
                <FlatList
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}

                    data={currentExercises}
                    renderItem={({item, index}) => <ExerciseElement exercise={item} width={windowsWidth} order={index} />}
                    keyExtractor={item => String(item.id)}
                    ListEmptyComponent={<View><Text>Нет элементов.</Text></View>}

                    pagingEnabled
                    scrollEventThrottle={16}
                />
            </View>
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
