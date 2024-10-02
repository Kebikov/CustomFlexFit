import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import React, { FC } from 'react';
import { useHookRouter } from '@/router/useHookRouter';
import { icon } from '@/source/icon/icon';

interface IBottomMenu {
    /**
     * @function
     * Изминения состояния выбора упражнения.
     * - Состояние должно быть от 0 до 2.
     */
    setSelectExercise: Function;
}

/**
 * @component
 * `Навигация вверху экрана на экране упражнения`
 */
const HeaderExerciseNav: FC<IBottomMenu> = ({setSelectExercise}) => {

    const {appRouter} = useHookRouter();

	return (
		<View style={styles.container} >
            <Pressable
                // Нажатие назад.
                onPress={() => {
                        setSelectExercise((state: number) => {
                            if(state === 0) { 
                                appRouter.navigate('/');
                            } else if(0 < state && state < 3) {
                                return state - 1;
                            } else {
                                return state;
                            }
                        });
                }}
            >
                <Image source={icon.arrow_back} style={styles.img} />
            </Pressable>
            <Pressable
                // Нажатие вперед.
                onPress={() => {
                    setSelectExercise((state: number) => {
                        if(0 <= state && state < 2) { 
                            return state + 1;
                        } else {
                            return state;
                        }
                    });
                }}
            >
                <Text style={styles.text} >Next Exercise</Text>
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
        marginRight: 10
    }
});

export default HeaderExerciseNav;
