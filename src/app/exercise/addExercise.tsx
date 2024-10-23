import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { COLOR_ROOT } from '@/constants/colors';
import Title from '@/components/Title/Title';
import ButtonGreen from '@/components/ButtonGreen/ButtonGreen';
import { useHookRouter } from '@/router/useHookRouter';


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    const {appRouter} = useHookRouter();

    return (
        <WrapperScroll
            backgroundColor={COLOR_ROOT.BACKGROUND}
        >
            <View style={styles.container} >
                <Title text={'Добавть свое упражнениеddddddfff.'} />
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
    }
});

export default AddExercise;