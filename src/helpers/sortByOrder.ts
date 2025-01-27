 /** `Сортировка массива обьектов по свойству order.` */
export const sortByOrder = <T extends {order: number}>(arrForSort: T[]) => {
    return arrForSort.sort((x, y) => x.order - y.order);
}