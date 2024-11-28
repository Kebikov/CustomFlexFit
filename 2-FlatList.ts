import { useSharedValue, useDerivedValue } from 'react-native-reanimated';
import ListItem from './components/ListItem';
import { View } from 'react-native';
import { NullableNumber, TPositions } from './types';
import { getInitialPositions } from './helpers/getInitialPositions';
import { FlatList } from 'react-native-gesture-handler';
import type { IDragFlatList } from './types';


//: Добавить состояние при котором при долгом нажатии активируется обрабтчик и можно перемешять элементы.

/**
 * `Для создания списка с возможностью перетаскивания элементов.`
 */
const DragFlatList = <T extends {id: number}>({
    heightElement,
    data,
    renderItem
}: IDragFlatList<T>) => {

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


    return (
        <View style={{height: data.length * heightElement, backgroundColor: 'red'}} >
            
            <FlatList
                data={data}
                keyExtractor={item => String(item.id)}
                renderItem={({item}) => {
                    return(
                        <ListItem
                            item={item}
                            heightElement={heightElement}

                            isDragging={isDragging}
                            draggedItemId={draggedItemId}
                            currentPositions={currentPositions}
                            minHi={MIN_HI}
                            maxHi={MAX_HI}
                        >
                            { renderItem(item) }
                        </ListItem>  
                    )
                }}
            />
            
        </View>
    );
};


export default DragFlatList;
