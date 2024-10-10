import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import Sql from '@/components/Sql/Sql';
import { COLOR_ROOT } from '@/constants/colors';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

/**
 * @component
 * @example 
 * @returns {JSX.Element}
 */
const Modal: FC = () => {

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.safeAreaView}>
                <Pressable 
                    style={styles.header}
                    onPress={() => router.back()}
                >
                    <View style={styles.imgBox} >
                        <Image source={require('@/source/icon/files/arrow_back.png')} style={styles.img} />
                    </View>
                    <Text style={styles.textHeader} >GO BACK</Text>
                </Pressable>
                <View style={styles.container} >
                    <Sql/>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    safeAreaView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLOR_ROOT.BACKGROUND
    },
    container: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        //backgroundColor: 'red',
        width: '100%',
        height: 30,
        marginTop: 10
    },
    imgBox: {
        width: 24,
        height: 24,
        marginLeft: 10
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    textHeader: {
        color: 'white',
        fontFamily: 'Sport',
        fontSize: 20,
        marginLeft: 10
    }
});

export default Modal;