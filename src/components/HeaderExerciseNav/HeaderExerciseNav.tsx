import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { useHookRouter } from '@/router/useHookRouter';
import { icon } from '@/source/icon/icon';

interface IBottomMenu {

}

/**
 * @component
 * `Навигация вверху экрана на экране упражнения`
 */
const HeaderExerciseNav: FC<IBottomMenu> = () => {

    const {appRouter} = useHookRouter();

	return (
		<View style={styles.container} >
            <Pressable
                // Нажатие назад.
                onPress={() => appRouter.replace('/')}
            >
                <Text style={styles.text} >finish and exit</Text>
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
        marginLeft: 10
    }
});

export default HeaderExerciseNav;
