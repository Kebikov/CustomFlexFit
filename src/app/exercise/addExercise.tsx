import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';


/**
 * @page `Страница добавления занятия.`
 */
const AddExercise: FC = () => {

    return (
        <View style={styles.main} >
            <Text>addExercise</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default AddExercise;