import { SharedValue } from "react-native-reanimated";
import { StyleProp, ViewStyle } from "react-native";
import { ComponentType, ReactElement, JSXElementConstructor } from "react";


 /** `id как свойсво.` */
export type TPositions = {
    [id: string]: {
        updatedIndex: number;
        updatedTop: number;
    };
};


export interface IDragFlatList<T extends {id: number | string}> {
    //* Mandatory prop
    /** `Высота одного элемента, отступ регулируем высотой элементов.` */
    heightElement: number;
    /** `Массив данных для отображения.` */
    data: T[];
    /** `Установка данных для отображения.` */
    setData: React.Dispatch<React.SetStateAction<T[]>>
    /** `Функция получения и возврата элемента.` */
    renderItem: (item: T) => JSX.Element | null;
    //* Дополнительные Element
    /** `Элементы в верху FlatList` */
    ListHeaderComponent?: JSX.Element | JSX.Element[];
    /** `Элементы в низу FlatList` */
    ListFooterComponent?: JSX.Element | JSX.Element[];
    /** `Элемент внизу FlatList` */
    bottomComponentFlatList?: JSX.Element
    //* Стили:
    /** Вкл./Выкл. скрола. Выключаем, если DragFlatList у родительского компонент есть Scroll*/
    scrollEnabled?: boolean;
    /** 
     * `Стили главного контейнера, в котором уже все остальное.` 
     * @example
     * <View style={`style`} >
     *     <View style={styleFlatList} >
     *          <FlatList contentContainerStyle={contentContainerStyle} />
     *     </View>
     * </View>
     * */
    style?: StyleProp<ViewStyle>;
    /** 
     * `Стили для дочернего контейнера в котором находится FlatList` 
     * @example
     * <View style={style} >
     *     <View style={`styleFlatList`} >
     *          <FlatList contentContainerStyle={contentContainerStyle} />
     *     </View>
     * </View>
     * */
    styleFlatList?: StyleProp<ViewStyle>;
    /** 
     * `Стили для контейнера с элементами FlatList`
     * @example 
     * <View style={style} >
     *     <View style={styleFlatList} >
     *          <FlatList contentContainerStyle={`contentContainerStyle`} />
     *     </View>
     * </View>
     * */
    contentContainerStyle?: StyleProp<ViewStyle>;
}


export interface IListItem<T extends {id: number | string}> {
    /** `Отображаемый элемент.` */
    children: JSX.Element | JSX.Element[] | null;
    /** `Данные для отображения` */
    id: string;
    /** `Переменная для указывающяя происходит ли в данный момент перемешение какого либо элемента.` */
    isDragging: SharedValue<0 | 1>;
    /** `Текушее позиции всех элементов.` */
    currentPositions: SharedValue<TPositions>;
    /** `Высота одного элемента.` */
    heightElement: number;
    /** `Минимальная высота всего списка.` */
    minHi: number;
    /** `Максимильная высота всего списка.` */
    maxHi: number;
    /** `Отступ для элемента.` */
    gap?: number;
    //* Переменные для закрытия всех активных кнопок:
    /** Id активной кнопки. */
    activeButtonIdSv?: SharedValue<string>;
};

export interface IUseGesture {
    /** `Id самого элемента` */
    id: string;
    /** `Переменная для указывающяя происходит ли в данный момент перемешение какого либо элемента.` */
    isDragging: SharedValue<0 | 1>;
    /** `Текушее позиции всех элементов.` */
    currentPositions: SharedValue<TPositions>;
    /** `Минимальная высота всего списка.` */
    minHi: number;
    /** `Максимильная высота всего списка.` */
    maxHi: number;
    /** `Высота одного элемента.` */
    heightElement: number;
        /** Id активной кнопки. */
    activeButtonIdSv?: SharedValue<string>;
}


export type NullableNumber = null | number;
