import { View, Text, StyleSheet, Platform } from 'react-native';
import React, { FC, memo } from 'react';
import Title from '@/components/Title/Title';
import InputForAdd from '@/components/InputForAdd/InputForAdd';
import type { IInputsSet } from './types';
import { useTranslation } from 'react-i18next';
import HelpText from '@/components/HelpText/HelpText';
import { COLOR_ROOT } from '@/constants/colors';


interface IInputs {
    fontSizeTitle: number;
    borderRadiusBody: number;
    titleDescription: IInputsSet;
    setTitleDescription: React.Dispatch<React.SetStateAction<IInputsSet>>;
}


/**
 * @component ``
 */
const Inputs: FC<IInputs> = ({
    fontSizeTitle,
    titleDescription,
    setTitleDescription,
    borderRadiusBody
}) => {

    const {t} = useTranslation(['[exercise]']);

    return (
        <>
            <Title text={t('[exercise]:addSet.nameAndNote')} 
                fontSize={fontSizeTitle} 
                marginTop={Platform.OS === 'ios' ? 10 : 0}
            />
            <View style={[styles.bodySetText, {borderRadius: borderRadiusBody}]} >
                <InputForAdd<IInputsSet>
                    keyForState='title'
                    title={t('[exercise]:addExercise.titleInput')}
                    setState={setTitleDescription} 
                    placeholder={t('[exercise]:addExercise.placeholderTitle')}
                    maxLength={27}
                    value={titleDescription.title === t('[exercise]:addExercise.title') ? undefined : titleDescription.title}
                    isNullValue={t('[exercise]:addExercise.title')}
                />

                <InputForAdd<IInputsSet>
                    keyForState='description'
                    title={t('[exercise]:addExercise.titleInputDescription')}
                    setState={setTitleDescription} 
                    placeholder={t('[exercise]:addExercise.placeholderDescription')}
                    maxLength={27}
                    marginTop={10}
                    value={titleDescription.description === t('[exercise]:addExercise.description') ? undefined : titleDescription.description}
                    isNullValue={t('[exercise]:addExercise.description')}
                />
            </View>
            <HelpText text={t('[exercise]:addSet.helpTextNameNote')} />
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