import { View, StyleSheet } from 'react-native';
import React, { FC, memo } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { ITimeClock} from '@/components/Clock/Clock';
import Title from '@/components/Title/Title';
import { useTranslation } from 'react-i18next';
import ICON from '@/source/icon';
import ItemRepsRest from '@/components/ItemRepsRest/ItemRepsRest';


interface IRepsRest {
    onRestAfter: () => void | undefined;
    onRuntime: () => void | undefined;
    onReps: () => void | undefined;
    reps: ITimeClock;
    restAfter: ITimeClock;
    fontSizeTitle: number;
    borderRadiusBody: number;
    runtime: ITimeClock;
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
            <Title text={t('[exercise]:modalAddRepsRest.titleModalAddRepsRest')} marginTop={5} fontSize={fontSizeTitle} />
            <View style={[styles.settings, {borderRadius: borderRadiusBody}]} >
                <ItemRepsRest
                    icon={ICON.REPS}
                    name={t('[exercise]:modalAddRepsRest.titleReps')}
                    values={`${reps.one} ${t('[exercise]:modalAddRepsRest.unitsReps')}`}
                    helpText={t('[exercise]:modalAddRepsRest.helpTextReps')}
                    handlePress={onReps}
                />

                <ItemRepsRest
                    icon={ICON.TIME_REST_2}
                    name={t('[exercise]:modalAddRepsRest.titleRest')}
                    values={`${restAfter.one} ${t('[exercise]:modalAddRepsRest.unitsMimutes')} ${restAfter.two} ${t('[exercise]:modalAddRepsRest.unitsSeconds')}`}
                    helpText={t('[exercise]:modalAddRepsRest.helpTextRest')}
                    marginTop={20}
                    handlePress={onRestAfter}
                />

                <ItemRepsRest
                    icon={ICON.TIME_EXERCISE_2}
                    name={t('[exercise]:modalAddRepsRest.titleExerciseTime')}
                    values={`${runtime.one} ${t('[exercise]:modalAddRepsRest.unitsMimutes')} ${runtime.two} ${t('[exercise]:modalAddRepsRest.unitsSeconds')}`}
                    helpText={t('[exercise]:modalAddRepsRest.helpTextExerciseTime')}
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