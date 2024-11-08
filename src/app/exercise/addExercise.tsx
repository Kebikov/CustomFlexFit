import { View, StyleSheet, Image } from 'react-native';
import React, { FC, useEffect, useState } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';
import { useTranslation } from 'react-i18next';
import PickImage from '@/components/PickImage/PickImage';
import { SET_BACKGROUND_FOR_EXERCISE } from '@/redux/slice/setup.slice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import HelpText from '@/components/HelpText/HelpText';
import SetEditSwipeable from '@/components/SetEditSwipeable/SetEditSwipeable';
import DraggableFlatList from 'react-native-draggable-flatlist';
import { IExerciseState } from '@/redux/slice/sets.slice';


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    const {appRouter} = useHookRouter();
    const {t} = useTranslation(['[exercise]', 'button']);
    const DISPATCH = useAppDispatch();

    const exerciseStateArray = useAppSelector(state => state.setsSlice.exerciseStateArray);

    const [data, setData] = useState<IExerciseState[]>([]);

    const selectedBackgroundExercise = useAppSelector(state => state.setupSlice.selectedBackgroundExercise);

    useEffect(() => {
        setData(exerciseStateArray);
        return () => {
            console.log('Размонтирование AddExercise !');
        }
    }, [exerciseStateArray]);

    const header = (
        <View>
            <Title text={t('[exercise]:addExercise.headerText')} fontSize={22} marginTop={20} />
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

            <PickImage
                SET_ACTIONS={SET_BACKGROUND_FOR_EXERCISE}
                aspect={[8, 5]}
                modalPath='/exercise/modalAddImageExercise'
                marginTop={20}
            />
            <HelpText text={t('[exercise]:addExercise.infoAddImage')} />
        </View>
    );

    const footer = (
        <>
            <HelpText text={t('[exercise]:addExercise.infoCreateExercise')} />
            <ButtonGreen
                text={t('button:create')}
                handlePess={() => appRouter.navigate('/exercise/modalAddImageExercise')}
                marginTop={40}
            />
        </>
    )

    return (
        <View style={styles.container} >
            <View style={styles.bodyForm} >

                <DraggableFlatList
                    ListHeaderComponent={header}
                    data={data}
                    onDragEnd={ ({ data }) => setData(data) } 
                    keyExtractor={item => String(item.id)}
                    renderItem={({item, drag, isActive, getIndex}) => <SetEditSwipeable item={item} drag={drag} isActive={isActive} index={getIndex()} />}
                    ListFooterComponent={footer}
                    showsVerticalScrollIndicator={false}
                />

            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_ROOT.BACKGROUND
    },
    bodyForm: {
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 40,
        width: '100%',
        justifyContent: 'center'
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