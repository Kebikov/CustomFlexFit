import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import DateExercise from '@/components/DateExercise/DateExercise';
import WeightExercise from '@/components/WeightExercise/WeightExercise';
import UpDownWeight from '@/components/UpDownWeight/UpDownWeight';
import Sets from '@/components/Sets/Sets';
import type { ExerciseDTO } from '@/SQLite/Exercise/DTO/ExerciseDTO';

interface IExerciseElement {
    exercise: ExerciseDTO;
    width: number;
    order: number;
}

/**
 * @component
 * `Упражнение дня занятий.`
 */
const ExerciseElement: FC<IExerciseElement> = ({exercise, width, order}) => {

    return (
        <View style={[styles.main, {width}]}>
            <ImageBackground 
                //source={exercise.img} 
                style={styles.header} 
            >
                <DateExercise/>
                <View style={styles.numberBox} >
                    {/* <Text style={styles.numberText} >{selectExercise + 1}</Text> */}
                    <Text style={styles.numberText} >{order + 1}</Text>
                </View>
                <WeightExercise exercise={exercise} />
                <UpDownWeight exercise={exercise} />
            </ImageBackground>
            <Sets exercise={exercise} />
        </View>
    );
};

const styles = StyleSheet.create({
	main: {
		flex: 1,
        backgroundColor: COLOR_ROOT.BACKGROUND
	},
	header: {
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

export default ExerciseElement;