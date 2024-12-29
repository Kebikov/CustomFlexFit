import type { IArraysForClock } from "../types";

/**
 * `Вернет массивы: первых и вторых чисел.`
 * @example
 * arraysForClock({one: {total: 24, step: 1}, two: {total: 60, step: 5}}) // для первых и вторых чисел
 */
export const arraysForClock = (value: IArraysForClock) => {
    /**
     * `Массив "Первых чисел".`
     */
    const firstNumberArray = [];
    /**
     * `Массив "Вторых чисел".`
     */
    const secondNumberArray = [];
    
    for(let i = 0; i < value.one.total; i = i + value.one.step) {
        const pad = String(i).padStart(2, '0');
        firstNumberArray.push(pad);
    }

    for(let i = 0; i < value.two.total; i = i + value.two.step) {
        const pad = String(i).padStart(2, '0');
        secondNumberArray.push(pad);
    }

    return {
        /**
         * `Массив "Первых чисел".`
         */
        firstNumberArray,
        /**
         * `Массив "Вторых чисел".`
         */
        secondNumberArray
    }
}








