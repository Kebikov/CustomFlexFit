import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { GestureDetector, PanGesture } from 'react-native-gesture-handler';
import { TPositions } from '../types';
import ItemNumber from './ItemNumber';
import { SharedValue } from 'react-native-reanimated';


interface IColumnNumbers {
    /** `Массив обьектов с числами для отображения.` */
    arrayNumbers: TPositions[];
    /** `Обработчик жестов.` */
    gestureNumbers: PanGesture;
    /** `Текущяя позиция.` */
    currentPositionsSv: SharedValue<number>;
    /** `Цвет чисел.` */
    colorText: string;
}


/**
 * @component `Ряд чисел.`
 */
const ColumnNumbers: FC<IColumnNumbers> = ({
    arrayNumbers,
    gestureNumbers,
    currentPositionsSv,
    colorText
}) => {

    return (
        <GestureDetector gesture={gestureNumbers} >
            <View style={styles.block} >
                {
                    arrayNumbers.map((item, i) => 
                        <ItemNumber 
                            item={item}
                            colorText={colorText}
                            currentPositionSv={currentPositionsSv}
                            key={i}
                        />
                    )         
                }
            </View>
        </GestureDetector> 
    );
};


const styles = StyleSheet.create({
    block: {
        position: 'relative',
        zIndex: 2,
        width: 40,
        height: '100%',
        overflow: 'hidden'
    }
});


export default ColumnNumbers;