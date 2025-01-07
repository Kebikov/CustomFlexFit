import { View, StyleSheet } from 'react-native';
import React, { FC, memo } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { TStateDataClock } from '@/components/Clock';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemRepsRest from '@/components/ItemRepsRest/ItemRepsRest';

type Time = TStateDataClock[keyof TStateDataClock]

interface IRepsRest {
    onReps: () => void | undefined;
    onRuntime: () => void | undefined;
    onRestAfter: () => void | undefined;
    /** `Количество повторов в упражнении.` */
    reps: Time;
    runtime: Time;
    restAfter: Time;
    
    fontSizeTitle: number;
    borderRadiusBody: number;
}


/**
 * @component ``
 */
const RepsRest: FC<IRepsRest> = ({
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
            <Title text={t('[exercise]:addRepsRest.titleAddRepsRest')} marginTop={5} fontSize={fontSizeTitle} />
            <View style={[styles.settings, {borderRadius: borderRadiusBody}]} >
                <ItemRepsRest
                    icon={ICON.REPS}
                    name={t('[exercise]:addRepsRest.titleReps')}
                    values={`${reps.one} ${t('[exercise]:addRepsRest.unitsReps')}`}
                    helpText={t('[exercise]:addRepsRest.helpTextReps')}
                    handlePress={onReps}
                />

                <ItemRepsRest
                    icon={ICON.TIME_REST_2}
                    name={t('[exercise]:addRepsRest.titleRest')}
                    values={`${restAfter.one} ${t('[exercise]:addRepsRest.unitsMimutes')} ${restAfter.two} ${t('[exercise]:addRepsRest.unitsSeconds')}`}
                    helpText={t('[exercise]:addRepsRest.helpTextRest')}
                    marginTop={20}
                    handlePress={onRestAfter}
                />

                <ItemRepsRest
                    icon={ICON.TIME_EXERCISE_2}
                    name={t('[exercise]:addRepsRest.titleExerciseTime')}
                    values={`${runtime.one} ${t('[exercise]:addRepsRest.unitsMimutes')} ${runtime.two} ${t('[exercise]:addRepsRest.unitsSeconds')}`}
                    helpText={t('[exercise]:addRepsRest.helpTextExerciseTime')}
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


export default memo(RepsRest);