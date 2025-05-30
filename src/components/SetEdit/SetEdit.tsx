import { View, Text, StyleSheet, Platform, Image } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import type { ExerciseDTO } from '@/SQL/Exercise/DTO/ExerciseDTO';
import type { IExerciseState } from '@/redux/slice/sets.slice';
import ICON from '@/source/icon';
import { useTranslation } from 'react-i18next';


interface ISet {
    exerciseState: IExerciseState
}


/**
 * @component `Блок с одним повтором упражнения.`
 */
const SetEdit: FC<ISet> = ({
    exerciseState
}) => {

    const {t} = useTranslation(['[exercise]']);

	return (
        <View
            style={[styles.container]} 
        >
            <View style={styles.rapBox} >
                <Text style={styles.textRap} >{exerciseState.reps.one}</Text>
            </View>
            <View style={styles.descriptionsBox} >
                <Text style={styles.textTitle} >
                    {
                    exerciseState.title 
                    //+ ' ' + exerciseState.order
                    }
                </Text>
                <Text style={styles.textDescriptions} >{exerciseState.description}</Text>
                <View style={styles.time} >

                    <View style={styles.rest} >
                        <View style={styles.rest_icon_box} >
                            <Image source={ICON.TIME_REST_2} style={styles.rest_icon} />
                        </View>
                        <Text style={styles.rest_text} >{`${exerciseState.restAfter.one} ${t('[exercise]:addSet.unitsMimutes')} ${exerciseState.restAfter.two} ${t('[exercise]:addSet.unitsSeconds')}`}</Text>
                    </View>

                    <View style={[styles.rest, {marginLeft: 10}]} >
                        <View style={styles.rest_icon_box} >
                            <Image source={ICON.TIME_EXERCISE_2} style={styles.rest_icon} />
                        </View>
                        <Text style={styles.rest_text} >{`${exerciseState.runtime.one} ${t('[exercise]:addSet.unitsMimutes')} ${exerciseState.runtime.two} ${t('[exercise]:addSet.unitsSeconds')}`}</Text>
                    </View>

                </View>
            </View>
        </View>
	);
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 65,
        backgroundColor: COLOR_ROOT.DARK_GREY,
        borderRadius: 10
    },
    rapBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
        height: 50,
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
        fontSize: 32,
        color: COLOR_ROOT.LIGHT_GREY
    },
    textTitle: {
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: '500',
        color: '#fff'
    },
    textDescriptions: {
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        fontWeight: '500',
        color: COLOR_ROOT.MEDIUM_GREY,
        lineHeight: 16
    },
    time: {
        flexDirection: 'row',
        paddingBottom: 2
    },
    rest: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 3
    },
    rest_icon_box: {
        width: 12,
        height: 12
    },
    rest_icon: {
        width: '100%',
        height: '100%',
        objectFit: 'contain'
    },
    rest_text: {
        color: 'white',
        fontSize: 10,
        fontWeight: '300',
        marginLeft: 5
    }
});


export default SetEdit;


