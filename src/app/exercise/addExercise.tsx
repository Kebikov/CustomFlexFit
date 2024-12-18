import { View, StyleSheet, Image, Button, Pressable, Text, SectionList } from 'react-native';
import React, { FC, useEffect, useState, useMemo } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';
import { useTranslation } from 'react-i18next';
import PickImage from '@/components/PickImage/PickImage';
import { SET_BACKGROUND_FOR_EXERCISE } from '@/redux/slice/setup.slice';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import HelpText from '@/components/HelpText/HelpText';
import SetEditSwipeable from '@/components/SetEditSwipeable/SetEditSwipeable';
import { IExerciseState } from '@/redux/slice/sets.slice';
import useHookImageCheck from '@/hook/useHookImageCheck';
import IMAGE from '@/source/img';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';
import SetEdit from '@/components/SetEdit/SetEdit';
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import usePageAddExercise from '@/hook/hookForScreen/usePageAddExercise';
import logApp from '@/helpers/log';


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => { logApp.page('AddExercise');

    const {imgCheck} = useHookImageCheck();
    const {appRouter} = useHookRouter();
    const DISPATCH = useAppDispatch();
    const {t} = useTranslation(['[exercise]', 'button']);

    const {
        data,
        setData,
        activeButtonId, 
        setActiveButtonId,
        selectedBackground
    } = usePageAddExercise();
    console.log(data);
    const header = (
        <View>
            <Title text={t('[exercise]:addExercise.headerText')} fontSize={22} marginTop={10} />
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
            {/* <HelpText text={t('[exercise]:addExercise.infoCreateExercise')} /> */}
            <ButtonGreen
                text={t('button:create')}
                //handlePess={() => appRouter.navigate('/exercise/modalAddImageExercise')}
                handlePess={() => {}}
                marginTop={40}
            />
        </>
    )

    const addElement = (id: string) => {
        const find = data.findIndex(item => item.id === id);
        //console.log('find = ', String(find))
        /** `Копия добавляемого элемента` */
        const newElement: IExerciseState = JSON.parse(JSON.stringify(data[find]));
        /** `Массив всех id` */
        const arrId = data.map(item => Number(item.id));
        /** `Максимальный id` */
        const maxId = Math.max(...arrId);
        // Установка id добавляемого элемента
        newElement.id = String(maxId + 1);

        const newData = [...data, newElement];

        DISPATCH(SET_EXERCISE_STATE(newData));
        //setData(newData);
    }

    if(data.length === 0) return null;

    return (
        <WrapperScroll
            //isScrollEnabled={false}
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <DragFlatList
                style={{flex: 1, padding: 10}}
                styleContainer={{marginTop: 10}}
                scrollEnabled={false}
                // Elements
                ListHeaderComponent={header}
                ListFooterComponent={footer}
                bottomComponentFlatList={<HelpText text={t('[exercise]:addExercise.infoCreateExercise')} />}

                heightElement={70}
                data={data}
                setData={setData}
                setActiveButtonId={setActiveButtonId}

                renderItem={(item) => (
                    <ButtonSwipeable
                        totalButton={3}

                        onPressButton1={() => {
                            // переход на страницу редактирования упражнения по id
                            appRouter.navigate({pathname: '/exercise/addRepsRest', params: {sendIndex: item.id}});
                        }}
                        onPressButton2={() => addElement(item.id)}
                        onPressButton3={() => {}}
                        //style
                        widthOneButton={62}
                        heightOneButton={62}
                        paddingInsideButton={22}

                        idButton={item.id}
                        activeButtonId={activeButtonId}
                        setActiveButtonId={setActiveButtonId}
                    >
                        <SetEdit exerciseState={item} />
                    </ButtonSwipeable>
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