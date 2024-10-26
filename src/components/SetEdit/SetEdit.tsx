import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import type { ExerciseDTO } from '@/SQLite/Exercise/DTO/ExerciseDTO';



interface ISet {
    amount: number;
    exercise: ExerciseDTO;
}

/**
 * @component
 * `Блок с одним повтором упражнения.`
 * @param amount - Количество повторов в подходе.
 * @param title - Титульный текст.
 * @param descriptions - Описание под титульным текстом.
 * @example <Set amount={#} title={#} descriptions={#} />
 * @returns {JSX.Element}
 */
const SetEdit: FC<ISet> = ({
    amount, 
    exercise
}) => {

	return (
        <View
            style={[styles.container]} 
        >
            <View style={styles.rapBox} >
                <Text style={styles.textRap} >{amount}</Text>
            </View>
            <View style={styles.descriptionsBox} >
                <Text style={styles.textTitle} >{exercise.title}</Text>
                <Text style={styles.textDescriptions} >{exercise.description}</Text>
            </View>
        </View>
	);
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: COLOR_ROOT.DARK_GREY,
        borderRadius: 10
    },
    rapBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: COLOR_ROOT.GREY,
        marginLeft: 10
    },
    descriptionsBox: {
        marginLeft: 10,
        padding: 3,
        justifyContent: 'center'
    },
    textRap: {
        fontFamily: 'Sport',
        fontSize: 30,
        color: COLOR_ROOT.LIGHT_GREY
    },
    textTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 18
    },
    textDescriptions: {
        fontSize: 14,
        fontWeight: '500',
        color: COLOR_ROOT.MEDIUM_GREY,
        lineHeight: 16
    }
});


export default SetEdit;


