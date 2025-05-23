import { View, StyleSheet, Text, Platform } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useHookRouter } from '../../router/useHookRouter';
import ButtonGreen from '../../components/ButtonGreen/ButtonGreen';
import Title from '../../components/Title/Title';
import Step from '@/components/Step/Step';
import WrapperImageBackground from '@/components/WrapperImageBackground/WrapperImageBackground';
import { COLOR_ROOT } from '@/constants/colors';
import { logApp } from '@/utils/log';


/**
 * @page `Добавление тренировачного дня.`
 */
const Guide: FC = () => { logApp.page('day.guide');

    const {appRouter} = useHookRouter();
    const {t} = useTranslation(['[day]']);


    return (
        <WrapperImageBackground
            imageBackground={require('@/source/img/imgForScreen/1.jpg')}
            overlayColor='rgba(0, 0, 0, .6)'
        >
            <View style={styles.overlay} >
                    <View style={styles.boxHi} >
                        <Title text={t('[day]:guide.title')} />
                        <Text style={styles.description} >{t('[day]:guide.description')}</Text>
                        <Step numberStep={1} title={t('[day]:guide.step1')} discription={t('[day]:guide.step1_description')} marginTop={40} />
                        <Step numberStep={2} title={t('[day]:guide.step2')} discription={t('[day]:guide.step2_description')} marginTop={20} />
                    </View>

                    <ButtonGreen
                        text={t('[day]:guide.button')}
                        handlePess={() => appRouter.push('/day/addDay')}
                        marginBottom={20}
                        widthFlex={1}
                    />
            </View>
        </WrapperImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        width: '100%',
    },
    overlay: {
        flex: 1,
        paddingHorizontal: 20
    },
    boxHi: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
    },
    description: {
        marginTop: 40,
        fontFamily: 'Sport400',
        fontSize: Platform.OS === 'ios' ? 17 : 14,
        letterSpacing: .5,
        color: COLOR_ROOT.WHITE_70
    }
});


export default Guide;

