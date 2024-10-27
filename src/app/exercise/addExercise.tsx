import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';
import InputForAddDay from '@/components/InputForAddDay/InputForAddDay';
import { useTranslation } from 'react-i18next';
import PickBackgroundForDay from '@/components/PickBackgroundForDay/PickBackgroundForDay';
import { SET_BACKGROUND_FOR_EXERCISE } from '@/redux/slice/setup.slice';
import { useAppSelector } from '@/redux/store/hooks';
import Set from '@/components/Set/Set';
import Description from '@/components/Description/Description';
import HelpText from '@/components/HelpText/HelpText';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';
import SetEdit from '@/components/SetEdit/SetEdit';


interface IExerciseState {
    img: string;
    title: string;
    description: string;
}


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    const {appRouter} = useHookRouter();
    const {t} = useTranslation(['[exercise]', 'button']);

    const [exerciseState, setExerciseState] = useState<IExerciseState>({
        title: t('[exercise]:addExercise.title'),
        description: t('[exercise]:addExercise.description'),
        img: '',
    });

    const selectedBackgroundExercise = useAppSelector(state => state.setupSlice.selectedBackgroundExercise);

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <View style={styles.container} >
                <Title text={t('[exercise]:addExercise.headerText')} fontSize={22} marginTop={20} />
                <View style={styles.bodyForm} >

                    <View style={styles.boxImageBackground} >
                        <Image source={
                                selectedBackgroundExercise && typeof selectedBackgroundExercise === 'string' ? {uri: selectedBackgroundExercise}
                                :
                                typeof selectedBackgroundExercise === 'number' ? selectedBackgroundExercise
                                :
                                require('@/source/img/imgForScreen/zeroFon.jpg')
                            } 
                            style={styles.imageBackground} 
                        />
                        <View style={[styles.overlay, {backgroundColor: selectedBackgroundExercise ? undefined : 'rgba(0, 0, 0, 0.5)'}]} />
                    </View>

                    <PickBackgroundForDay 
                        SET_ACTIONS={SET_BACKGROUND_FOR_EXERCISE}
                        aspect={[8, 5]}
                        modalPath='/exercise/modalAddImageExercise'
                        marginTop={20}
                    />
                    <HelpText text={t('[exercise]:addExercise.infoAddImage')} />

                    <ButtonSwipeable
                        totalButton={3}
                        onPressButton1={() => appRouter.navigate('/exercise/modalAddRepsRest')}
                        onPressButton2={() => {}}
                        onPressButton3={() => {}}
                        marginTop={10}
                        paddingForButton={20}
                    >
                        <SetEdit exercise={{...exerciseState, id: 0}} amount={0} />
                    </ButtonSwipeable>

                    
                    <HelpText text={t('[exercise]:addExercise.infoCreateExercise')} />

                    <InputForAddDay<IExerciseState>
                        keyForState='title'
                        title={t('[exercise]:addExercise.titleInput')}
                        setDayState={setExerciseState} 
                        placeholder={t('[exercise]:addExercise.placeholderTitle')}
                        maxLength={27}
                        marginTop={10}
                    />

                    <InputForAddDay<IExerciseState>
                        keyForState='description'
                        title={t('[exercise]:addExercise.titleInputDescription')}
                        setDayState={setExerciseState} 
                        placeholder={t('[exercise]:addExercise.placeholderDescription')}
                        maxLength={27}
                        marginTop={10}
                    />
                    
                    <ButtonGreen
                        text={t('button:create')}
                        handlePess={() => appRouter.navigate('/exercise/modalAddImageExercise')}
                        marginTop={40}
                    />
                </View>
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyForm: {
        paddingHorizontal: 20,
        width: '100%'
    },
    boxImageBackground: {
        width: '100%',
        height: 170,
        marginTop: 20,
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        borderRadius: 20
    },
    overlay: {
        ...StyleSheet.absoluteFillObject
    }
});

export default AddExercise;