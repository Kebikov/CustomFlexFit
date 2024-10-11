import { View, Text, StyleSheet, ImageBackground, Pressable, Platform } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { COLOR_ROOT } from '../../constants/colors';
import WrapperScroll from '../../components/WrapperScroll/WrapperScroll';


/**
 * @page `Добавление тренировачного дня.`
 */
const Guide: FC = () => {
    console.log('page > day.guide');

    const {t} = useTranslation();

    return (
        <ImageBackground
            source={require('@/source/img/imgForScreen/1.jpg')} 
            style={[styles.imageBackground]}
        >
            <View style={styles.overlay} >
                <Text style={styles.title}>{t('folder.day.guide.title')}</Text>
                <Text style={styles.description}>{t('folder.day.guide.description')}</Text>

                <View style={styles.box_button}>
                    <Pressable
                        style={styles.button}
                        onPress={() => {}}
                    >
                        <Text style={styles.text_button}>{t('folder.day.guide.button')}</Text>
                    </Pressable>
                </View>
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
    },
    title: {
        fontFamily: 'Sport',
        fontSize: Platform.OS === 'ios' ? 40 : 37,
        color: 'white',
        marginBottom: 40
    },
    description: {
        fontSize: Platform.OS === 'ios' ? 17 : 15,
        color: COLOR_ROOT.WHITE_70,
        marginBottom: 48
    },
    box_button: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        marginBottom: 40
    },
    button: {
        width: '90%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLOR_ROOT.LIME,
        borderRadius: 30
    },
    text_button: {
        textAlign: 'center',
        fontFamily: 'Sport',
        fontSize: Platform.OS === 'ios' ? 24 : 20,
        marginTop: Platform.OS === 'ios' ? 4 : 0
    }
});

export default Guide;