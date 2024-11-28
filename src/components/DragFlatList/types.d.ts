export type TPositions = {
    [key: number]: {
        updatedIndex: number;
        updatedTop: number;
    };
};


export interface IDragFlatList<T extends {id: number}> {
    /** `Высота одного элемента.` */
    heightElement: number;
    /** `Массив данных для отображения.` */
    data: T[];
    /** `Функция получения и возврата элемента.` */
    renderItem: (item: T) => JSX.Element | null;
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
