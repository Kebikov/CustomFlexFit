import { SharedValue } from "react-native-reanimated";

export type TPositions = {
    [key: string]: {
        updatedIndex: number;
        updatedTop: number;
    };
};


export interface IDragFlatList<T extends {id: number | string}> {
    //* Mandatory prop
    /** `Высота одного элемента.` */
    heightElement: number;
    /** `Массив данных для отображения.` */
    data: T[];
    /** `Установка данных для отображения.` */
    setData: React.Dispatch<React.SetStateAction<T[]>>
    /** `Функция получения и возврата элемента.` */
    renderItem: (item: T) => JSX.Element | null;
    //* Дополнительные Element
    /** `Элементы в верху FlatList` */
    ListHeaderComponent?: ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined;
    /** `Элементы в низу FlatList` */
    ListFooterComponent?: ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined;
    /** `Элемент внизу FlatList` */
    bottomComponentFlatList?: JSX.Element
    //* Стили:
    /** `Высота всего FlatLIst` */
    heightList?: number;
    /** Вкл./Выкл. скрола. Выключаем, если DragFlatList у родительского компонент есть Scroll*/
    scrollEnabled?: boolean;
    /** `Стили для DragFlatList` */
    style?: StyleProp<ViewStyle>;
    /** `Стили для контейнера с элементами` */
    styleContainer?: StyleProp<ViewStyle>;
    //* Переменные для закрытия всех активных кнопок:
    /** Id активной кнопки. */
    activeButtonIdSv?: SharedValue<string>;
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
