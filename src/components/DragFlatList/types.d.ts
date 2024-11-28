export type TPositions = {
    [key: number]: {
        updatedIndex: number;
        updatedTop: number;
    };
};


export interface IDragFlatList<T extends {id: number}> {
    /** `Высота всего FlatLIst` */
    heightList?: number;
    /** `Высота одного элемента.` */
    heightElement: number;
    /** `Массив данных для отображения.` */
    data: T[];
    /** `Функция получения и возврата элемента.` */
    renderItem: (item: T) => JSX.Element | null;
    /** Вкл./Выкл. скрола. */
    scrollEnabled?: boolean;
    /** `Элементы в верху FlatList` */
    ListHeaderComponent?: ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined;
    /** `Элементы в низу FlatList` */
    ListFooterComponent?: ComponentType<any> | ReactElement<any, string | JSXElementConstructor<any>> | null | undefined;
}


export interface IListItem<T extends {id: number}> {
    /** `Отображаемый элемент.` */
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


export type NullableNumber = null | number;
