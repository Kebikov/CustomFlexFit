import { arraysForClock } from "../helpers/arraysForClock";
import { IArraysForClock } from "../types";

/** `Начальные установки для отображения.` */
export const valuesClock = (optionsClock: IArraysForClock) => {
    /** `Высота окна с цыфрами.` */
    const height = 252;

    /** `Количество элементов в окне.` */
    const totalElements = 7;

    /** `Высота одного элемента.` */
    const itemHeight = height / totalElements; 

    const {firstNumberArray, secondNumberArray} = arraysForClock(optionsClock);

    /** `Диаметр полного оборота "Первого числа".` */
    const fullRotationFirstNumber = firstNumberArray.length * itemHeight;

    /** `Диаметр полного оборота второго числа.` */
    const fullRotationSecondNumber = secondNumberArray.length * itemHeight;

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
        height
    }
}