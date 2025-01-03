import { View, StyleSheet, ImageBackground, Text } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHookRouter } from '../../router/useHookRouter';
import ButtonGreen from '../../components/ButtonGreen/ButtonGreen';
import Title from '../../components/Title/Title';
import Description from '../../components/Description/Description';
import Step from '@/components/Step/Step';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';


/**
 * @page `Добавление тренировачного дня.`
 */
const Guide: FC = () => {
    console.debug('page > day.guide');

    const {appRouter} = useHookRouter();
    const {t} = useTranslation(['[day]']);


    return (
        <ImageBackground
            source={require('@/source/img/imgForScreen/1.jpg')}
            style={[styles.imageBackground]}
        >
            <View style={styles.overlay} >
                <WrapperScroll> 

                    <View style={styles.boxHi} >
                        <Title text={t('[day]:guide.title')} />
                        <Description text={t('[day]:guide.description')} marginTop={40} />
                        <Step numberStep={1} text={t('[day]:guide.step1')} marginTop={40} />
                        <Step numberStep={2} text={t('[day]:guide.step2')} marginTop={20} />
                        <Step numberStep={3} text={t('[day]:guide.step3')} marginTop={20} />
                    </View>

                    <ButtonGreen
                        text={t('[day]:guide.button')}
                        handlePess={() => appRouter.push('/day/addDay')}
                        marginBottom={20}
                        widthFlex={1}
                    />

                </WrapperScroll>
            </View>
        </ImageBackground> 
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        flex: 1,
        width: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        paddingHorizontal: 20
    },
    boxHi: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    }
});

export default Guide;

