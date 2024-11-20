import { View, StyleSheet, Image, Button, Pressable, Text } from 'react-native';
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
import useHookImageCheck from '@/hook/useHookImageCheck';
import IMAGE from '@/source/img';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    const {imgCheck} = useHookImageCheck();
    const {appRouter} = useHookRouter();
    const {t} = useTranslation(['[exercise]', 'button']);
    const DISPATCH = useAppDispatch();

    const exerciseStateArray: IExerciseState[] = useAppSelector(state => state.setsSlice.exerciseStateArray);

    const [data, setData] = useState<IExerciseState[]>([]);

    const selectedBackground = useAppSelector(state => state.setupSlice.selectedBackground);

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
                handlePess={() => appRouter.navigate('/exercise/modalAddImageExercise')}
                marginTop={40}
            />
        </>
    )

    return (
        <View style={styles.container} >
            <View style={styles.bodyForm} >

                <Pressable 
                    onPress={() => console.log('WORKING !')}
                    style={{width: '100%', height: 50, backgroundColor: 'red', justifyContent: 'center', alignItems: 'center',
                        transform: [
                            {translateY: -100}
                        ]
                    }} 
                >
                    <Text style={{color: 'white', fontSize: 20, textAlign: 'center'}}>Press Me</Text>
                </Pressable>

                <ButtonSwipeable 
                    totalButton={1} 
                    onPressButton1={() => console.log('press 1')}
                    borderRadiusButton={20}
                    colorButton1='black'
                    colorButton2='black'
                    colorButton3='black'
                    onPressButton2={() => console.log('press 2')}
                    onPressButton3={() => console.log('press 3')}
                >
                    <View style={{
                        width: '100%',
                        height: 100,
                        backgroundColor: 'green'
                    }}></View>
                </ButtonSwipeable>

                {/* <DraggableFlatList
                    ListHeaderComponent={header}
                    data={data}
                    onDragEnd={ ({ data }) => setData(data) } 
                    keyExtractor={item => String(item.id)}
                    renderItem={({item, drag, isActive, getIndex}) => <SetEditSwipeable item={item} drag={drag} isActive={isActive} index={getIndex()} />}
                    ListFooterComponent={footer}
                    showsVerticalScrollIndicator={false}
                /> */}

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