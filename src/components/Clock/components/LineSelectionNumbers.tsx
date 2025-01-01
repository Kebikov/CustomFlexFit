import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';


interface ILineSelectionNumbers {
    /** `Top для координат линии.` */
    centerTop: number;
    /** `Высота линии выделения чисел.` */
    itemHeight: number;
}


/**
 * @component `Прозрачная линия для выделения чисел в часах.`
 */
const LineSelectionNumbers: FC<ILineSelectionNumbers> = ({
    centerTop,
    itemHeight
}) => {

    return (
        <View style={[styles.line, {top: centerTop}]}>
            <View style={[styles.lineBody, {height: itemHeight}]} />
        </View>
    );
};


const styles = StyleSheet.create({
    line: {
        position: 'absolute',
        zIndex: 1,
        left: 0,
        width: '100%'
    },
    lineBody: {
        flex: 1,
        backgroundColor: 'white',
        opacity: .5
    }
});


export default LineSelectionNumbers;