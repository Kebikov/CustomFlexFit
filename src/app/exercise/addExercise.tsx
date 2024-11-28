import { View, StyleSheet, Image, Button, Pressable, Text, SectionList } from 'react-native';
import React, { FC, useEffect, useState, useMemo } from 'react';
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
import { IExerciseState } from '@/redux/slice/sets.slice';
import useHookImageCheck from '@/hook/useHookImageCheck';
import IMAGE from '@/source/img';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';
import SetEdit from '@/components/SetEdit/SetEdit';
import VibrationApp from '@/helpers/VibrationApp';
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import { TEST_DATA } from '@/components/DragFlatList/constants';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    const {imgCheck} = useHookImageCheck();
    const {appRouter} = useHookRouter();
    const {t} = useTranslation(['[exercise]', 'button']);

    const exerciseStateArray: IExerciseState[] = useAppSelector(state => state.setsSlice.exerciseStateArray);

    /** Данные для FlatList. */
    const [data, setData] = useState<IExerciseState[]>([]);
    const [data1, setData1] = useState<string[]>(['Hello', 'Roman', 'Masha']);
    /** Id который активен в данный момент, остальные закрываются. */
    const [activeButtonId, setActiveButtonId] = useState<string>();

    const selectedBackground = useAppSelector(state => state.setupSlice.selectedBackground);

    useEffect(() => {
        setData(exerciseStateArray);
        return () => {
        }
    }, [exerciseStateArray]);

    const header = (
        <View>
            <Title text={t('[exercise]:addExercise.headerText')} fontSize={22} marginTop={20} />
            <View style={styles.boxImageBackground} >
                <Image source={
                        selectedBackground && selectedBackground.path ? imgCheck(selectedBackground.path)
                        :
                        IMAGE.ZERO_FON
                    } 
                    style={styles.imageBackground} 
                />
                <View style={[styles.overlay, {backgroundColor: selectedBackground ? undefined : 'rgba(0, 0, 0, 0.5)'}]} />
            </View>

            <PickImage
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
                //handlePess={() => appRouter.navigate('/exercise/modalAddImageExercise')}
                handlePess={() => setData1(['Hello', 'Masha', 'Roman'])}
                marginTop={40}
            />
        </>
    )


    return (
        <WrapperScroll
            //isScrollEnabled={false}
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <DragFlatList
                scrollEnabled={false}
                ListHeaderComponent={header}
                ListFooterComponent={footer}
                heightElement={100}
                data={TEST_DATA}
                renderItem={(item) => (
                    <View style={{
                        backgroundColor: 'blue', 
                        width: '100%', 
                        height: '100%', 
                        alignItems: 'center', 
                        justifyContent: 'center',
                        borderWidth: 2, 
                        borderColor: 'black',
                        borderRadius: 20,
                        marginTop: 5
                        }}
                    >
                        <Title text={item.title} color='white' />
                    </View>
                )}
            />
        </WrapperScroll>
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