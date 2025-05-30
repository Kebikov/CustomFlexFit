import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import HelperUtils from '@/utils/HelperUtils';

/**
 * @component
 * Полная дата текушего дня тренировки.
 * @example
 * <DateExercise/>
 * @returns {JSX.Element}
 */
const DateExercise: FC = () => {

    const {arraySplitMinus} = HelperUtils.getCurrentDateInFormatArray();


	return (
		<>
            <View style={styles.dateBox} >
                <View style={styles.dayBox} >
                    <Text style={styles.textDate} >{arraySplitMinus[2]}</Text>
                </View>
                <View style={styles.dayBox} >
                    <Text style={styles.textDate} >{arraySplitMinus[1]}</Text>
                </View>
                <View style={styles.dayBox}>
                    <Text style={styles.textDate} >{arraySplitMinus[0]}</Text>
                </View>
            </View>
        </>
	);
};

const styles = StyleSheet.create({
    dateBox: {
        flexDirection: 'row',
        gap: 10,
        marginLeft: 10,
        marginTop: 10
    },
    dayBox: {
        backgroundColor: COLOR_ROOT.LIME_70,
        paddingVertical: 2,
        paddingHorizontal: 5,
        borderRadius: 4,
    },
    textDate: {
        fontFamily: 'Sport',
        color: '#000',
        fontSize: 24
    }
})


export default DateExercise;
