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

    /** `Диаметр полного оборота "Первого числа".` */
    const fullRotationFirstNumber = firstNumberArray.length * itemHeight;

    /** `Диаметр полного оборота второго числа.` */
    const fullRotationSecondNumber = secondNumberArray.length * itemHeight;

    /** `Смешения для центра начального элемента.` */
    const offsetTop = itemHeight * (totalElements / 2 - 0.5);
    
    return {
        /** `Высота одного элемента.` */
        itemHeight,
        /** `Массив "Первых чисел".` */
        firstNumberArray,
        /** `Массив "Вторых чисел".` */
        secondNumberArray,
        /** `Диаметр полного оборота "Первого числа".` */
        fullRotationFirstNumber,
        /** `Диаметр полного оборота второго числа.` */
        fullRotationSecondNumber,
        /** `Высота окна с цыфрами.` */
        height,
        /** `Смешения для центра начального элемента.` */
        offsetTop
    }
}