import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import { useHookRouter } from '@/router/useHookRouter';


/**
 * @component `Шапка для модального окна.`
 */
const HeaderGoBack: FC = () => {

    const {router} = useHookRouter();

    return (
        <Pressable 
            style={styles.header}
            onPress={() => router.back()}
        >
            <View style={styles.imgBox} >
                <Image source={require('@/source/icon/files/arrow_back.png')} style={styles.img} />
            </View>
            <Text style={styles.textHeader} >GO BACK</Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 30,
        marginTop: 10,
        marginLeft: 10
    },
    imgBox: {
        width: 24,
        height: 24
    },
    img: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    textHeader: {
        color: 'white',
        fontFamily: 'Sport',
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        marginLeft: 10,
        paddingTop: Platform.OS === 'ios' ? 2 : 0
    }
});


export default HeaderGoBack;