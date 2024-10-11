import { View, Text, StyleSheet, ImageBackground, Pressable } from 'react-native';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import Menu from '../../components/Menu/Menu';


/**
 * @page `Добавление тренировачного дня.`
 */
const AddDay: FC = () => {
    console.log('page > AddDay');

    const {t} = useTranslation();

    return (
        <ImageBackground
            source={require('@/source/img/imgForScreen/1.jpg')} 
            style={[styles.imageBackground]}
        >
            <Menu/>
            <View style={styles.overlay} >
                <Text style={styles.text}>{t('page.listDay.title')}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: 'white',
        fontSize: 30
    }
});

export default AddDay;


