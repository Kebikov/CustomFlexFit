import { View, StyleSheet } from 'react-native';
import React, { FC, memo } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { TStateDataClock } from '@/components/Clock';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemSet from '@/components/ItemSet/ItemSet';

type Time = TStateDataClock[keyof TStateDataClock]

interface ISet {
    onReps: () => void | undefined;
    onRuntime: () => void | undefined;
    onRestAfter: () => void | undefined;
    /** `Количество повторов в упражнении.` */
    reps: Time;
    /** `Временя выполнения упражнения.` */
    runtime: Time;
    /** `Временя отдыха после упражнения.` */
    restAfter: Time;
    
    fontSizeTitle: number;
    borderRadiusBody: number;
}


/**
 * @component ``
 */
const Set: FC<ISet> = ({
    borderRadiusBody,
    fontSizeTitle,

    onReps,
    onRestAfter,
    onRuntime,

    reps,
    restAfter,
    runtime
}) => {

    const {t} = useTranslation(['[exercise]']);

    return (
        <>
            <Title text={t('[exercise]:addSet.titleAddSet')} marginTop={5} fontSize={fontSizeTitle} />
            <View style={[styles.settings, {borderRadius: borderRadiusBody}]} >
                <ItemSet
                    icon={ICON.REPS}
                    name={t('[exercise]:addSet.titleReps')}
                    values={`${reps.one} ${t('[exercise]:addSet.unitsReps')}`}
                    helpText={t('[exercise]:addSet.helpTextReps')}
                    handlePress={onReps}
                />

                <ItemSet
                    icon={ICON.TIME_REST_2}
                    name={t('[exercise]:addSet.titleRest')}
                    values={`${restAfter.one} ${t('[exercise]:addSet.unitsMimutes')} ${restAfter.two} ${t('[exercise]:addSet.unitsSeconds')}`}
                    helpText={t('[exercise]:addSet.helpTextRest')}
                    marginTop={20}
                    handlePress={onRestAfter}
                />

                <ItemSet
                    icon={ICON.TIME_EXERCISE_2}
                    name={t('[exercise]:addSet.titleExerciseTime')}
                    values={`${runtime.one} ${t('[exercise]:addSet.unitsMimutes')} ${runtime.two} ${t('[exercise]:addSet.unitsSeconds')}`}
                    helpText={t('[exercise]:addSet.helpTextExerciseTime')}
                    marginTop={20}
                    handlePress={onRuntime}
                />
            </View>
        </>
    );
};


const styles = StyleSheet.create({
    settings: {
        backgroundColor: COLOR_ROOT.GREY_CUSTOM(.25),
        padding: 20,
        paddingBottom: 25,
        marginTop: 10
    }
});


export default memo(Set);