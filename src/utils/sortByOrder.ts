 /** `Сортировка массива обьектов по свойству queue.` */
export const sortByQueue = <T extends {queue: number}>(arrForSort: T[]) => {
    return arrForSort.sort((x, y) => x.queue - y.queue);
}