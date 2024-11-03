import { View, Text, StyleSheet, Pressable, Image, Platform } from 'react-native';
import React, { FC } from 'react';
import { useHookRouter } from '@/router/useHookRouter';
import { COLOR_ROOT } from '@/constants/colors';
import { BlurView } from 'expo-blur';

interface IHeaderGoBack {
    paddingLeft?: number;
}

/**
 * @component `Шапка для модального окна.`
 * @optional
 * @param paddingLeft Отступ с лева. [default: 10]
 */
const HeaderGoBack: FC<IHeaderGoBack> = ({
    paddingLeft = 10
}) => {

    const {router} = useHookRouter();

    return (
        <BlurView
            intensity={20}
            tint='dark'
            style={styles.blur}
        >
            <Pressable 
                style={[styles.header, {paddingLeft}]}
                onPress={() => router.back()}
            >
                <View style={styles.imgBox} >
                    <Image source={require('@/source/icon/files/arrow_back.png')} style={styles.img} />
                </View>
                {/* <Text style={styles.textHeader} >GO BACK</Text> */}
            </Pressable>
        </BlurView>
    );
};

const height = 50;

const styles = StyleSheet.create({
    blur: {
        backgroundColor: Platform.OS === 'ios' ? COLOR_ROOT.BACKGROUND_CUSTOM(.2) : COLOR_ROOT.BACKGROUND_CUSTOM(.9),
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 2,
        width: '100%',
        height: height
    },
    header: {
        flex: 1,
        paddingVertical: 10,

        flexDirection: 'row',
        alignItems: 'center'
    },
    imgBox: {
        width: height - 10,
        height: height - 10,
        padding: 7,
        borderRadius: 10,
        backgroundColor: COLOR_ROOT.GREY_CUSTOM(.3)
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