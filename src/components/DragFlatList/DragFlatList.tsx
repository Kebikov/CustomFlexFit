import Animated, { useSharedValue, useAnimatedStyle, useAnimatedReaction, runOnJS, withTiming, withSpring, ReduceMotion } from 'react-native-reanimated';
import ListItem from './components/ListItem';
import { View } from 'react-native';
import { TPositions } from './types';
import { getInitialPositions } from './helpers/getInitialPositions';
import { FlatList } from 'react-native-gesture-handler';
import type { IDragFlatList } from './types';
import { useEffect } from 'react';
import { getDataAfterDrag } from './helpers/getDataAfterDrag';
import {strApp} from '@/helpers/log';
import { TIME_OF_ELEVATION } from './constants';


/** `//= Для создания списка с возможностью перетаскивания элементов.` */
const DragFlatList = <T extends {id: number, order: number}>({
    heightElement,
    data,
    setData,
    renderItem,
    scrollEnabled,
    ListHeaderComponent,
    ListFooterComponent,
    style,
    styleFlatList,
    contentContainerStyle,
    bottomComponentFlatList
}: IDragFlatList<T>) => { console.info(strApp.Red('render DragFlatList'));

    const MIN_HI = 0;
    const MAX_HI = (data.length - 1) * heightElement;
    const HI = data.length * heightElement;

     /** `Высота FlatLIst.` */
    const heightFlatListSv = useSharedValue<number>(HI);

     /** `Расположение заметки под FlatList.` */
    const topNoteSv = useSharedValue<number>(MAX_HI + heightElement + 5);
    
     /** `Определение позиций всех элементов.` */
    const currentPositions = useSharedValue<TPositions>( getInitialPositions(data, heightElement, 'useSharedValue') );

     /** `Происходит ли перемешение или нет.` */
    const isDragging = useSharedValue<0 | 1>(0);

     /** `Обновление состояния, так как произошло изминение порядка элементов.` */
    useAnimatedReaction(
        () => isDragging.value,
        (currentValue, previousValue) => {
            if (currentValue === 0 && previousValue === 1) {
                const newData = getDataAfterDrag(data, currentPositions.value);
                runOnJS(setData)(newData);
            }
        },[data]
    );

     /** `AnimatedStyle для высоты FlatLIst, увеличение высоты листа при добавлении нового элемента.` */
    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: withTiming(heightFlatListSv.value, {duration: TIME_OF_ELEVATION})
        }
    });

     /** `AnimatedStyle для расположения заметки.` */
    const animatedStyleNote = useAnimatedStyle(() => {
        return {
            top: withSpring(topNoteSv.value, {
                mass: 1,
                damping: 10,
                stiffness: 100,
                overshootClamping: false,
                restDisplacementThreshold: 0.01,
                restSpeedThreshold: 2,
                reduceMotion: ReduceMotion.System,
            })
        }
    });

    useEffect(() => {
        currentPositions.value = getInitialPositions(data, heightElement, 'useEffect');
        heightFlatListSv.value = HI;
        topNoteSv.value = MAX_HI + heightElement;
    }, [data]);
    
    return (
        <View style={style} >
            {ListHeaderComponent}
            <Animated.View style={[animatedStyle, styleFlatList, {position: 'relative'}]} >

                <FlatList
                    scrollEnabled={scrollEnabled}
                    contentContainerStyle={[{flexGrow: 1}, contentContainerStyle]}
                    data={data}
                    extraData={data}

                    keyExtractor={item => String(item.id)}

                    renderItem={({item}) => (
                            <ListItem
                                id={String(item.id)}
                                heightElement={heightElement}
                                
                                isDragging={isDragging}
                                currentPositions={currentPositions}
                                minHi={MIN_HI}
                                maxHi={MAX_HI}
                            >
                                { renderItem(item) }
                            </ListItem>  
                        )
                    }
                    
                    scrollEventThrottle={16}
                />

                <Animated.View style={[{position: 'absolute'}, animatedStyleNote]} >
                    {bottomComponentFlatList}
                </Animated.View>
            </Animated.View>
            {ListFooterComponent}
        </View>
    );
};


export default DragFlatList;
