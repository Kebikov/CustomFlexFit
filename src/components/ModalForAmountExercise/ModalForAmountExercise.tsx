import { View, Text, StyleSheet, Modal, Button } from 'react-native';
import React, { FC } from 'react';
import { COLOR_ROOT } from '@/constants/colors';
import { useAppDispatch } from '@/redux/store/hooks';
import type { ExerciseDTO } from '@/SQLite/exercise/DTO/exercise.dto';

export interface IModalForAmountExercise {
	/**
	 * Состояни открыто ли модальное окно.
	 */
	modalVisible: boolean;
	/**
	 * Функция изминения состояния видимости модального окна.
	 */
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	/**
	 * Обьект упражнения.
	 */
	exercise: ExerciseDTO;
}

/**
 * @component
 * Модальное окно с возможностью обнуления количества сделаных упражнений.
 * @param modalVisible Состояни открыто ли модальное окно.
 * @param setModalVisible Функция изминения состояния видимости модального окна.
 * @param exercise Обьект упражнения.
 * @example <ModalForAmountExercise modalVisible={#} setModalVisible={#} exercise={#} />
 * @returns {JSX.Element}
 */
const ModalForAmountExercise: FC<IModalForAmountExercise> = ({ modalVisible, setModalVisible, exercise }) => {
	const dispatch = useAppDispatch();

	return (
		<View style={styles.container}>
			<Modal animationType='fade' transparent={true} visible={modalVisible}>
				<View style={styles.container}>
					<View style={styles.modalBox}>
						<Text style={styles.text}>Обнулить счетчик упражнений ?</Text>
						<View style={styles.buttonBox}>
							<View style={styles.button}>
								<Button
									title='yes'
									color={COLOR_ROOT.LIME_70}
									onPress={() => {}}
								/>
							</View>
							<View style={styles.button}>
								<Button title='not' color={COLOR_ROOT.MEDIUM_GREY} onPress={() => setModalVisible(!modalVisible)} />
							</View>
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	modalBox: {
		width: 330,
		height: 150,
		backgroundColor: COLOR_ROOT.DARK_GREY,
		borderRadius: 10,
		borderColor: COLOR_ROOT.LIME_70,
		borderWidth: 3,

		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		color: 'white',
		fontSize: 17,
		fontWeight: '500'
	},
	buttonBox: {
		flexDirection: 'row',
		gap: 50,
		marginTop: 20
	},
	button: {
		width: 70
	}
});

export default ModalForAmountExercise;
