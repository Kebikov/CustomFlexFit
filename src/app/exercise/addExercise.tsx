import { View, StyleSheet, Image } from 'react-native';
import React, { FC, useEffect } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';
import { useTranslation } from 'react-i18next';
import PickBackgroundForDay from '@/components/PickBackgroundForDay/PickBackgroundForDay';
import { SET_BACKGROUND_FOR_EXERCISE } from '@/redux/slice/setup.slice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import HelpText from '@/components/HelpText/HelpText';
import SetEditSwipeable from '@/components/SetEditSwipeable/SetEditSwipeable';


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    const {appRouter} = useHookRouter();
    const {t} = useTranslation(['[exercise]', 'button']);
    const DISPATCH = useAppDispatch();

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);

    const selectedBackgroundExercise = useAppSelector(state => state.setupSlice.selectedBackgroundExercise);

    useEffect(() => {
        return () => {
            console.log('Размонтирование AddExercise !');
        }
    }, []);

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

                    {
                        exerciseStateArray.map((state, i) => <SetEditSwipeable id={state.id} index={i}  key={state.id} />)
                    }

                    <HelpText text={t('[exercise]:addExercise.infoCreateExercise')} />
                    
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
        height: 230,
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