import React from "react";
import { StyleSheet } from "react-native";
import { GestureDetector } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";
import { useGesture } from "../hooks/useGesture";
import { IListItem } from "../types";


const ListItem = <T extends {id: number | string}>({
    children,
    id,
    isDragging,
    currentPositions,
    heightElement,
    maxHi,
    minHi
}: IListItem<T>) => {

    const { animatedStyles, gesturePan } = useGesture({
        id, 
        isDragging, 
        currentPositions, 
        maxHi, 
        minHi, 
        heightElement
    });

    return (
        <Animated.View 
            style={[
                styles.itemContainer, 
                {height: heightElement}, 
                animatedStyles
            ]} 
        >
            <GestureDetector gesture={gesturePan} >
                <Animated.View style={styles.draggerContainer}>
                    {children}
                </Animated.View>
            </GestureDetector>
        </Animated.View>
    );
};


export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        position: 'absolute'
    },
    draggerContainer: {
        position: 'relative',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default ListItem;
