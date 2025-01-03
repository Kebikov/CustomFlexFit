import { arraysForClock } from "../helpers/arraysForClock";
import { IArraysForClock } from "../types";

/** `Начальные установки для отображения.` */
export const valuesClock = (optionsClock: IArraysForClock) => {

    /** `Высота окна с цыфрами.` */
    const height = 200;

    /** `Количество элементов в окне.` */
    const totalElements = 6;

    /** `Высота одного элемента.` */
    const itemHeight = height / totalElements; 

    const {firstNumberArray, secondNumberArray} = arraysForClock(optionsClock);

    /** `Смешения для центра начального элемента.` */
    const offsetTop = itemHeight * (totalElements / 2 - 0.5);
    
    return {
        /** `Высота одного элемента.` */
        itemHeight,
        /** `Массив "Первых чисел".` */
        firstNumberArray,
        /** `Массив "Вторых чисел".` */
        secondNumberArray,
        /** `Высота окна с цыфрами.` */
        height,
        /** `Смешения для центра начального элемента.` */
        offsetTop
    }
}