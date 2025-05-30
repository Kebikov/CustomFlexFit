import { View, Image, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';
import { useTranslation } from 'react-i18next';
import PickImage from '@/components/PickImage/PickImage';
import { SET_EXERCISE_STATE } from '@/redux/slice/sets.slice';
import { useAppDispatch } from '@/redux/store/hooks';
import HelpText from '@/components/HelpText/HelpText';
import { IExerciseState } from '@/redux/slice/sets.slice';
import useHookImageCheck from '@/hook/useHookImageCheck';
import IMAGE from '@/source/img';
import ButtonSwipeable from '@/components/ButtonSwipeable/ButtonSwipeable';
import SetEdit from '@/components/SetEdit/SetEdit';
import DragFlatList from '@/components/DragFlatList/DragFlatList';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import usePageAddExercise from '@/hook/page/usePageAddExercise';
import {logApp} from '@/utils/log';
import useHandleExercise from '@/hook/page/addExercise/useHandleExercise';



/** @page `//= Страница добавления занятия.` */
const AddExercise: FC = () => { logApp.page('AddExercise');
    
    const {imgCheck} = useHookImageCheck();
    const {appRouter} = useHookRouter();
    const DISPATCH = useAppDispatch();
    const {t} = useTranslation(['[exercise]', 'button']);
    const {data, setData, activeButtonIdSv, background} = usePageAddExercise();
    const {addElement, removeElement} = useHandleExercise();
    
    const render = (item: IExerciseState) => {
        return(
            <ButtonSwipeable
                totalButton={3}

                onPressButton1={() => {
                    DISPATCH(SET_EXERCISE_STATE(data));
                    const index = data.findIndex(el => el.id === item.id);
                    // переход на страницу редактирования упражнения по индексу в массиве данных
                    appRouter.navigate({pathname: '/exercise/addSet', params: {sendIndex: String(index)}});
                }}
                onPressButton2={() => addElement(item.id, data)}
                onPressButton3={() => removeElement(item.id, data)}
                //style
                widthOneButton={62}
                heightOneButton={62}
                paddingInsideButton={22}

                idButton={item.id}
                activeButtonIdSv={activeButtonIdSv}
            >
                <SetEdit exerciseState={item} />
            </ButtonSwipeable>
        )
    };

     /** `Высота одного элемента в DragFlatList.` */
    const elementHeight = 69;

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
            //isScrollEnabled={false}
        >
            <View style={styles.container}>
                <View>
                    <Title text={t('[exercise]:addExercise.headerText')} fontSize={22} marginTop={10} />
                    <View style={styles.boxImageBackground} >
                        <Image source={
                                background ? 
                                imgCheck(background)
                                :
                                IMAGE.ZERO_FON
                            } 
                            style={styles.imageBackground} 
                        />
                        <View style={[styles.overlay, {backgroundColor: background ? undefined : 'rgba(0, 0, 0, 0.5)'}]} />
                    </View>

                    <PickImage
                        aspect={[8, 5]}
                        path='/exercise/modalAddImageExercise'
                        marginTop={20}
                    />

                    <HelpText text={t('[exercise]:addExercise.infoAddImage')} />
                </View>
                <DragFlatList
                    style={{padding: 0, marginTop: 20, flex: 1}}
                    styleFlatList={{flex: 1, marginBottom: 45}}

                    scrollEnabled={false}
                    bottomComponentFlatList={<HelpText text={t('[exercise]:addExercise.infoCreateExercise')} />}

                    heightElement={elementHeight}
                    data={data}
                    setData={setData}

                    renderItem={render}
                />
                <ButtonGreen
                    text={t('button:create')}
                    //handlePess={() => appRouter.navigate('/exercise/modalAddImageExercise')}
                    handlePess={() => {}}
                    marginTop={20}
                    marginBottom={40}
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
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