import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import React, { FC } from 'react';


/**
 * @page `Добавление тренировачного дня.`
 */
const AddDay: FC = () => {
    console.log('page > AddDay');
    return (
        <ImageBackground
            source={require('@/source/img/imgForScreen/1.jpg')} 
            style={[styles.imageBackground]}
        >
            <View style={styles.overlay} >
                <Text>addDay</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    text: {
        color: 'white',
        fontSize: 20
    }
});

export default AddDay;