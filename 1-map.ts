import React, { FC, useState, useRef } from 'react';
import { ScrollView, View, StyleSheet, Text } from 'react-native';
import { useSharedValue, useDerivedValue } from 'react-native-reanimated';
import ListItem from './components/ListItem';
import { SONGS } from './constants';
import { NullableNumber, TPositions } from './types';
import { COLOR_ROOT } from '@/constants/colors';
import { getInitialPositions } from './helpers/getInitialPositions';
import { TItem } from './types';
import { FlatList } from 'react-native-gesture-handler';
import WrapperScroll from '@/components/WrapperScroll/WrapperScroll';


interface IDragList<T extends {id: number}> {
    /** `Высота одного элемента.` */
    heightElement: number;
    data: T[];
    renderItem: (item: T) => JSX.Element | null;
}

//: Добавить состояние при котором при долгом нажатии активируется обрабтчик и можно перемешять элементы.

/**
 * `Для создания списка с возможностью перетаскивания элементов.`
 */
const DragList = <T extends {id: number}>({
    heightElement,
    data,
    renderItem
}: IDragList<T>) => {

    const MIN_HI = 0;
    const MAX_HI = (data.length - 1) * heightElement;

    // `определение позиций всех элементов при перетаскивании`
    const currentPositions = useSharedValue<TPositions>(
        getInitialPositions(data.length, heightElement),
    );

    const currentPositionsDv = useDerivedValue(() => {
        //console.log(JSON.stringify( currentPositions.value, null, 2));
        return currentPositions.value;
    });


    //console.log(JSON.stringify( currentPositionsDv.value, null, 2));

    // происходит ли перемешение или нет 
    const isDragging = useSharedValue<0 | 1>(0);

    // id элемента который пользователь началь перетаскивать
    const draggedItemId = useSharedValue<NullableNumber>(null);

    const _renderItem = () => {
        
        return data.map((item) => ( 
            <ListItem
                item={item}
                heightElement={heightElement}
                key={item.id}

                isDragging={isDragging}
                draggedItemId={draggedItemId}
                currentPositions={currentPositions}
                minHi={MIN_HI}
                maxHi={MAX_HI}
            >
                { renderItem(item) }
            </ListItem>    
        ));
    }

    return (
        <View style={{height: '100%'}} >
            <ScrollView
                contentContainerStyle={{height: data.length * heightElement}}
            >
                { _renderItem() }
            </ScrollView> 
        </View>
    );
};


export const styles = StyleSheet.create({
});

export default DragList;
