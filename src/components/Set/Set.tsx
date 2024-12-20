import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { FC, useState, useEffect } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { Audio } from 'expo-av';
//* redux
import { useAppSelector, useAppDispatch } from '@/redux/store/hooks';
import { useDispatch } from 'react-redux';
import type { ExerciseDTO } from '@/SQL/Exercise/DTO/ExerciseDTO';
import ModalForAmount from '@/components/ModalForAmount/ModalForAmount';

export type TId = '0' | '1' | '2' | 'burpee';

interface ISet {
    amount: number;
    exercise: ExerciseDTO;
}

/**
 * @component
 * `Блок с одним повтором упражнения.`
 * @param amount - Количество повторов в подходе.
 * @param title - Титульный текст.
 * @param descriptions - Описание под титульным текстом.
 * @example <Set amount={#} title={#} descriptions={#} />
 * @returns {JSX.Element}
 */
const Set: FC<ISet> = ({
    amount, 
    exercise
}) => {
    /**
     * Формирование уникального id для подхода в упражнении.
     * @example "DAY_1#EXERCISE_1#0"
     */
    //const createdId:string = exercise.day + '#' + exercise.exercise + '#' + id;
    /**
     * Состояние видимости модального окна с изминение количества упражнений.
     */
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const dispatch = useDispatch();
    /**
     * Функция для проигрывания звука.
     */
    const playSound = async () => {
        const {sound} = await Audio.Sound.createAsync(require('@/source/audio/bip.mp3'));
        sound.playAsync()
                .then((result) => {
                    // Удаление сушности sound после проигрывания звука.
                    // 'durationMillis' - продолжительность про
                    if('durationMillis' in result) {
                        setTimeout(() => {
                            sound.unloadAsync();
                        }, result.durationMillis);
                    }
                    
                })
                .catch(error => console.error('Ошибка очистки звука:', error))
    };

    /**
     * Переменная с результатом, есть ли совпадения в массиве с нажатыми id, нашего текушего id.
     */
    const isPush: boolean = false;
    /**
     * Добавление id в массив нажатых кнопок.
     */
    const onPush = () => {
    }

    
	return (
        <>
            <ModalForAmount modalVisible={modalVisible} setModalVisible={setModalVisible} exercise={exercise} id={exercise.id} />
            <Pressable
                style={[styles.container, isPush ? {borderColor: COLOR_ROOT.LIME_70, borderWidth: 3} : null]} 
                onPress={() => {
                    onPush();
                    playSound();
                }} 
                onLongPress={() => {
                    setModalVisible(true);
                }}
            >
                <View style={styles.rapBox} >
                    <Text style={styles.textRap} >{amount}</Text>
                </View>
                <View style={styles.descriptionsBox} >
                    <Text style={styles.textTitle} >{exercise.title}</Text>
                    <Text style={styles.textDescriptions} >{exercise.description}</Text>
                </View>
            </Pressable>
        </>
	);
};


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        backgroundColor: COLOR_ROOT.DARK_GREY,
        borderRadius: 10
    },
    rapBox: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 5,
        backgroundColor: COLOR_ROOT.GREY,
        marginLeft: 10
    },
    descriptionsBox: {
        marginLeft: 10,
        padding: 3,
        justifyContent: 'center'
    },
    textRap: {
        fontFamily: 'Sport',
        fontSize: 30,
        color: COLOR_ROOT.LIGHT_GREY
    },
    textTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#fff',
        lineHeight: 18
    },
    textDescriptions: {
        fontSize: 14,
        fontWeight: '500',
        color: COLOR_ROOT.MEDIUM_GREY,
        lineHeight: 16
    }
});


export default Set;


