import styles from './styles';
import { View, Image } from 'react-native';
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
import usePageAddExercise from '@/hook/hookForScreen/usePageAddExercise';
import logApp, {strApp} from '@/helpers/log';
import { useHandleExercise } from '@/app/exercise/addExercise/hooks/useHandleExercise';



/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => { logApp.page('AddExercise');
    
    const {imgCheck} = useHookImageCheck();
    const {appRouter} = useHookRouter();
    const DISPATCH = useAppDispatch();
    const {t} = useTranslation(['[exercise]', 'button']);
    const {data, setData, activeButtonIdSv, selectedBackground} = usePageAddExercise();
    const {addElement, removeElement} = useHandleExercise();
    
    const render = (item: IExerciseState) => {
        return(
            <ButtonSwipeable
                totalButton={3}

                onPressButton1={() => {
                    DISPATCH(SET_EXERCISE_STATE(data));
                    const index = data.findIndex(el => el.id === item.id);
                    // переход на страницу редактирования упражнения по индексу в массиве данных
                    appRouter.navigate({pathname: '/exercise/addRepsRest', params: {sendIndex: String(index)}});
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

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <View style={styles.container}>
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
                <DragFlatList
                    style={{padding: 0, marginTop: 20, flex: 1}}
                    styleFlatList={{marginBottom: 40}}
                    scrollEnabled={false}
                    bottomComponentFlatList={<HelpText text={t('[exercise]:addExercise.infoCreateExercise')} />}

                    heightElement={69}
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


export default AddExercise;