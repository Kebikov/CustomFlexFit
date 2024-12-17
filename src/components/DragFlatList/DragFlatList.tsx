import { useSharedValue, useDerivedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import ListItem from './components/ListItem';
import { View, LayoutChangeEvent } from 'react-native';
import { NullableNumber, TPositions } from './types';
import { getInitialPositions } from './helpers/getInitialPositions';
import { FlatList } from 'react-native-gesture-handler';
import type { IDragFlatList } from './types';
import { useState, useEffect } from 'react';
import { getDataAfterDrag } from './helpers/getDataAfterDrag';


/**
 * `Для создания списка с возможностью перетаскивания элементов.`
 */
const DragFlatList = <T extends {id: number | string}>({
    heightList,
    heightElement,
    data,
    setData,
    renderItem,
    scrollEnabled,
    ListHeaderComponent,
    ListFooterComponent,
    gap
}: IDragFlatList<T>) => {

    const MIN_HI = 0;
    const MAX_HI = (data.length - 1) * heightElement;

    // `определение позиций всех элементов при перетаскивании`
    const currentPositions = useSharedValue<TPositions>(
        getInitialPositions(data.length, heightElement)
    );

    // происходит ли перемешение или нет 
    const isDragging = useSharedValue<0 | 1>(0);

    // id элемента который пользователь началь перетаскивать
    const draggedItemId = useSharedValue<NullableNumber>(null);

    useAnimatedReaction(
        () => isDragging.value,
        (currentValue, previousValue) => {
            if (currentValue === 0 && previousValue === 1) {
                //console.log('=========================================================================================');
                const newData = getDataAfterDrag(data, currentPositions);
                //console.log('newData = ', JSON.stringify( newData, null, 2));
                runOnJS(setData)(newData);
            }
        },
        []
    )


    return (
        <View style={{flex: 1}}>
            {ListHeaderComponent}
            <View style={heightList ? {height: heightList} : {flex: 1}}>

                <FlatList
                    scrollEnabled={scrollEnabled}
                    contentContainerStyle={{height: data.length * heightElement, paddingHorizontal: 10}}
                    data={data}
                    keyExtractor={item => String(item.id)}

                    renderItem={({item}) => (
                            <ListItem
                                item={item}
                                heightElement={heightElement}
                                gap={gap}

                                isDragging={isDragging}
                                draggedItemId={draggedItemId}
                                currentPositions={currentPositions}
                                minHi={MIN_HI}
                                maxHi={MAX_HI}
                            >
                                { renderItem(item) }
                            </ListItem>  
                        )
                    }
                />

            </View>
            {ListFooterComponent}
        </View>
    );
};


export default DragFlatList;
