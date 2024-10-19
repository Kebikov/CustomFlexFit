import { View, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import type { ExerciseDTO } from '@/SQLite/Exercise/DTO/Day.DTO';
//* component
import Set from '@/components/Set/Set';

interface ISets {
    /**
     * Обьект с упражнением.
     */
    exercise: ExerciseDTO;
}


/**
 * @component
 * `Блок с набором подходов.`
 */
const Sets: FC<ISets> = ({exercise}) => {

    /**
     * Массив с повторами в упражнениях.
     */
    let set = [];
    /**
     * Количество повторов в упражнении.
     */
    const amount = exercise.amount;

    /**
     * Добавление количества подходов от меньшего к большему.
     * @example [10, 11, 12]
     */
    switch(amount) {
        case 12:
            set.push(amount - 2);
            set.push(amount - 1);
            set.push(amount);
            break;
        case 20: 
            set.push(amount - 5);
            set.push(amount - 2);
            set.push(amount);
            break;
        default:
            set.push(amount - 2);
            set.push(amount - 1);
            set.push(amount);
            break;
    }

    

	return (
		<View style={styles.container} >
			<Set amount={set[0]} exercise={exercise} id={'0'} />
            <Set amount={set[1]} exercise={exercise} id={'1'} />
            <Set amount={set[2]} exercise={exercise} id={'2'} />
            {
                exercise.burpee 
                ?
                <Set amount={exercise.burpee} exercise={exercise} id={'burpee'} />
                :
                null
            }
            
		</View>
	);
};

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 10
    }
});


export default Sets;
