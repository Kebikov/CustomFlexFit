import { View, Text, StyleSheet } from 'react-native';
import React, { FC } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import Title from '../Title/Title';


const AnimatadFlatList = Animated.createAnimatedComponent(FlatList);


interface IDragFlatList<T> {
    clildren: JSX.Element | JSX.Element[];
    data: T;
}




/**
 * @wrapper `Flatlist для перетаскивания компонентов.`
 */
const DragFlatList = <T,>({
    clildren,
    data
}:IDragFlatList<T> ) => {


    return (
        <View style={styles.container} >
            <View style={styles.contaiber_body} >

            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
    },
    contaiber_body: {
    }
});


export default DragFlatList;