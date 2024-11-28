import React from "react";
import { Image, Text, View, StyleSheet, Pressable } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { SharedValue } from "react-native-reanimated";
import { useGesture } from "../hooks/useGesture";
import { COLOR_ROOT } from "@/constants/colors";
import { TItem, NullableNumber, TPositions } from "../types";


interface IListItem<T extends {id: number}> {
    /** Отображаемый элемент. */
    children: JSX.Element | JSX.Element[] | null;
    /** `Данные для отображения` */
    item: T;
    /** `Переменная для указывающяя происходит ли в данный момент перемешение какого либо элемента.` */
    isDragging: SharedValue<0 | 1>;
    /** `Id элемента который в данный момент перемешяется.` */
    draggedItemId: SharedValue<NullableNumber>;
    /** `Текушее позиции всех элементов.` */
    currentPositions: SharedValue<TPositions>;
    /** `Высота одного элемента.` */
    heightElement: number;
    /** `Минимальная высота всего списка.` */
    minHi: number;
    /** `Максимильная высота всего списка.` */
    maxHi: number;
};


const ListItem = <T extends {id: number}>({
    children,
    item,
    isDragging,
    draggedItemId,
    currentPositions,
    heightElement,
    maxHi,
    minHi
}: IListItem<T>) => {

    const { animatedStyles, gesturePan } = useGesture(
        item,
        isDragging,
        draggedItemId,
        currentPositions,
        minHi,
        maxHi,
        heightElement
    );

    return (
        <Animated.View style={[styles.itemContainer, {height: heightElement}, animatedStyles]} key={item.id} >
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
        position: 'absolute',
    },
    draggerContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'blue',
        borderWidth: 2,
        borderColor: 'black'
    }
});


export default ListItem;
