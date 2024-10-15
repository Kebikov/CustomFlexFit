import { View, StyleSheet, ImageBackground } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHookRouter } from '../../router/useHookRouter';
import ButtonGreen from '../../components/ButtonGreen/ButtonGreen';
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import Step from '@/components/Step/Step';
import AppStatusBar from '@/components/AppStatusBar/AppStatusBar';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';


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
                <WrapperScroll backgroundColor='transparent' > 

                    <View style={styles.boxHi} >
                        <Title text={t('folder.day.guide.title')} />
                        <Description text={t('folder.day.guide.description')} marginTop={40} />
                        <Step numberStep={1} text={t('folder.day.guide.step1')} marginTop={40} />
                        <Step numberStep={2} text={t('folder.day.guide.step2')} marginTop={20} />
                        <Step numberStep={3} text={t('folder.day.guide.step3')} marginTop={20} />
                    </View>

                    <ButtonGreen
                        text={t('folder.day.guide.button')}
                        handlePess={() => appRouter.push('/day/addDay')}
                        marginBottom={20}
                        widthProcent={100}
                    />

                </WrapperScroll>
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
        alignItems: 'center',
        paddingHorizontal: 20
    },
    boxHi: {
        flex: 1,
        justifyContent: 'center'
        //backgroundColor: 'red',
    }
});

export default Guide;