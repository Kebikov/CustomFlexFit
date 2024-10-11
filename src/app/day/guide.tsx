import { View, StyleSheet, ImageBackground } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHookRouter } from '../../router/useHookRouter';
import ButtonGreen from '../../components/ButtonGreen/ButtonGreen';
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';


/**
 * @page `Добавление тренировачного дня.`
 */
const Guide: FC = () => {
    console.log('page > day.guide');

    const {appRouter} = useHookRouter();
    const {t} = useTranslation();


    return (
        <ImageBackground
            source={require('@/source/img/imgForScreen/1.jpg')}
            style={[styles.imageBackground]}
        >
            <View style={styles.overlay} >
                <Title text={t('folder.day.guide.title')} />
                <Description text={t('folder.day.guide.description')} />
                <ButtonGreen
                    text={t('folder.day.guide.button')}
                    handlePess={() => appRouter.push('/day/addDay')}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'flex-end',
        alignItems: 'center',
        padding: 20
    }
});

export default Guide;