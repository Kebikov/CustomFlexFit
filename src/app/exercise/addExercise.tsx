import { View, Text, StyleSheet, Image } from 'react-native';
import React, { FC, useState } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';
import InputForAddDay from '@/components/InputForAddDay/InputForAddDay';
import { useTranslation } from 'react-i18next';


interface IExerciseState {
    img: number | string | undefined;
}


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    const {appRouter} = useHookRouter();
    const {t} = useTranslation();

    const [exerciseState, setExerciseState] = useState<IExerciseState>({
        img: undefined
    });

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <View style={styles.container} >
                <Title text={'Добавть свое упражнение.'} fontSize={22} marginTop={20}/>

                <View style={styles.boxImageBackground} >
                    <Image source={exerciseState.img ? exerciseState.img : require('@/source/img/imgForScreen/zeroFon.jpg')} style={styles.imageBackground} />
                </View>

                <InputForAddDay
                    keyForState='title'
                    title={t('general.title')}
                    setDayState={setExerciseState} 
                    placeholder={t('folder.day.addDay.placeholderInputTitle')}
                    maxLength={27}
                    marginTop={10}
                />
                
                <ButtonGreen
                    text='ggg'
                    handlePess={() => appRouter.navigate('/exercise/modalAddImageExercise')}
                />
            </View>
        </WrapperScroll>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    boxImageBackground: {
        width: '100%',
        height: 200,
        marginTop: 20
    },
    imageBackground: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    }
});

export default AddExercise;