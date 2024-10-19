import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { FC } from 'react';
import { useHookRouter } from '../../router/useHookRouter';
import { icon } from '../../source/icon/icon';

/**
 * @component `Компонент меню.`
 */
const Menu: FC = () => {

    const {appRouter} = useHookRouter();

    return (
        <Pressable
            style={styles.settingsBox}
            //onPress={() => appRouter.navigate('/settingsScreen')}
            onPress={() => appRouter.navigate('/modal')}
        >
            <Image source={icon.menu} style={styles.settingsImg} />
        </Pressable>
    );
};

const styles = StyleSheet.create({
    settingsBox: {
        position: 'absolute',
        zIndex: 1,
        top: 40,
        left: 20,
        width: 45,
        height: 45,
        padding: 5
    },
    settingsImg: {
        tintColor: 'white',
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    }
});

export default Menu;