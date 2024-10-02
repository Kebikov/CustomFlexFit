import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';

interface ITest {
    backgroundColor: string;
    width: number;
}


/**
 * @component
 */
const Test: FC<ITest> = ({backgroundColor, width}) => {

    return (
        <View style={[styles.main, {backgroundColor, width}]}>
            <Text>{backgroundColor}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    main: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center' 
    }
});

export default Test;