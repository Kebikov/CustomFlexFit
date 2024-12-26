import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC, memo } from 'react';
import Title from '@/components/Title/Title';
import InputForAdd from '@/components/InputForAdd/InputForAdd';
import type { INameAndNote } from '@/components/Clock/types';
import { useTranslation } from 'react-i18next';
import HelpText from '@/components/HelpText/HelpText';
import { COLOR_ROOT } from '@/constants/colors';


interface IInputs {
    fontSizeTitle: number;
    borderRadiusBody: number;
    nameAndNote: INameAndNote;
    setNameAndNote: React.Dispatch<React.SetStateAction<INameAndNote>>;
}


/**
 * @component ``
 */
const Inputs: FC<IInputs> = ({
    fontSizeTitle,
    nameAndNote,
    setNameAndNote,
    borderRadiusBody
}) => {

    const {t} = useTranslation(['[exercise]']);

    return (
        <>
            <Title text={t('[exercise]:addRepsRest.nameAndNote')} 
                fontSize={fontSizeTitle} 
                marginTop={Platform.OS === 'ios' ? 10 : 0}
            />
            <View style={[styles.bodySetText, {borderRadius: borderRadiusBody}]} >
                <InputForAdd<INameAndNote>
                    keyForState='name'
                    title={t('[exercise]:addExercise.titleInput')}
                    setState={setNameAndNote} 
                    placeholder={t('[exercise]:addExercise.placeholderTitle')}
                    maxLength={27}
                    value={nameAndNote.name === t('[exercise]:addExercise.title') ? undefined : nameAndNote.name}
                    isNullValue={t('[exercise]:addExercise.title')}
                />

                <InputForAdd<INameAndNote>
                    keyForState='note'
                    title={t('[exercise]:addExercise.titleInputDescription')}
                    setState={setNameAndNote} 
                    placeholder={t('[exercise]:addExercise.placeholderDescription')}
                    maxLength={27}
                    marginTop={10}
                    value={nameAndNote.note === t('[exercise]:addExercise.description') ? undefined : nameAndNote.note}
                    isNullValue={t('[exercise]:addExercise.description')}
                />
            </View>
            <HelpText text={t('[exercise]:addRepsRest.helpTextNameNote')} />
        </>
    );
};


const styles = StyleSheet.create({
    bodySetText: {
        backgroundColor: COLOR_ROOT.GREY_CUSTOM(.25),
        paddingHorizontal: 20,
        paddingBottom: 25,
        paddingTop: 15,
        marginTop: 10
    }
});


export default memo(Inputs);