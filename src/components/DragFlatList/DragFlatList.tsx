import { useSharedValue, useDerivedValue, useAnimatedReaction, runOnJS } from 'react-native-reanimated';
import ListItem from './components/ListItem';
import { View, Text } from 'react-native';
import { NullableNumber, TPositions } from './types';
import { getInitialPositions } from './helpers/getInitialPositions';
import { FlatList } from 'react-native-gesture-handler';
import type { IDragFlatList } from './types';
import { useState, useEffect, useLayoutEffect } from 'react';
import { getDataAfterDrag } from './helpers/getDataAfterDrag';
import logApp from '@/helpers/log';


/**
 * `Для создания списка с возможностью перетаскивания элементов.`
 */
const DragFlatList = <T extends {id: string | number}>({
    heightList,
    heightElement,
    data,
    setData,
    renderItem,
    scrollEnabled,
    ListHeaderComponent,
    ListFooterComponent,
    activeButtonIdSv,
    style,
    styleContainer,
    bottomComponentFlatList
}: IDragFlatList<T>) => {

    const MIN_HI = 0;
    const MAX_HI = (data.length - 1) * heightElement;
    const HI = data.length * heightElement;

    // `определение позиций всех элементов`
    const currentPositions = useSharedValue<TPositions>(
        getInitialPositions(data, heightElement, 'useSharedValue')
    );
    console.log(currentPositions.value);
    // происходит ли перемешение или нет 
    const isDragging = useSharedValue<0 | 1>(0);

    // useAnimatedReaction(
    //     () => isDragging.value,
    //     (currentValue, previousValue) => {
    //         if (currentValue === 0 && previousValue === 1) {
    //             const newData = getDataAfterDrag(data, currentPositions);
    //             runOnJS(setData)(newData);
    //         }
    //     },[data]
    // )
    
    useLayoutEffect(() => {
        currentPositions.value = getInitialPositions(data, heightElement, 'useLayoutEffect')
    }, [data]);
    

    return (
        <View style={{...style}} >
            {ListHeaderComponent}
            <View style={heightList ? {height: heightList} : {height: HI, backgroundColor: 'blue'}} >

                <FlatList
                    style={{...styleContainer}}
                    scrollEnabled={scrollEnabled}
                    contentContainerStyle={{height: HI, backgroundColor: 'red'}}
                    data={data}
                    keyExtractor={item => String(item.id)}

                    renderItem={({item}) => (
                            <ListItem
                                id={String(item.id)}
                                heightElement={heightElement}
                                activeButtonIdSv={activeButtonIdSv}

                                isDragging={isDragging}
                                currentPositions={currentPositions}
                                minHi={MIN_HI}
                                maxHi={MAX_HI}
                            >
                                { renderItem(item) }
                            </ListItem>  
                        )
                    }
                />
                <View style={{position: 'absolute', top: MAX_HI ? MAX_HI + heightElement + 5 : heightElement + 5}} >
                    {bottomComponentFlatList}
                </View>
            </View>
            {ListFooterComponent}
        </View>
    );
};


export default DragFlatList;
