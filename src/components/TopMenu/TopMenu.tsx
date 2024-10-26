import { View, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC } from 'react';
import { icon } from '@/source/icon';
import { COLOR_ROOT } from '@/constants/colors';
import { useHookRouter } from '@/router/useHookRouter';


/**
 * @component
 */
const TopMenu: FC = () => {

    const {router} = useHookRouter();

    return (
        <View style={styles.container} >
            <Pressable
                // Нажатие назад.
                onPress={() => router.back()}
            >
                <Image source={icon.arrow_back} style={styles.img} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLOR_ROOT.BACKGROUND
    },
    img: {
        width: 27,
        height: 27,
        marginLeft: 10
    },
    text: {
        color: 'white',
        fontFamily: 'Sport',
        fontSize: 18,
        marginRight: 10
    }
});

export default TopMenu;
