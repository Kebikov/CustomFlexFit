export interface IArraysForClock {
    one: {
        total: number;
        step: number;
    };
    two: {
        total: number;
        step: number;
    };
}

/**
 * `Вернет массивы: часов и минут.`
 * @param one Первое число в установке времени.
 * @param two Второе число в установке времени.
 * @param total Значение последнего элемента.
 * @param step Шиг элемента.
 * @example  
 * arraysForClock({one: {total: 24, step: 1}, two: {total: 60, step: 5}}) // для часов и минут
 */
export const arraysForClock = (value: IArraysForClock) => {

    /**
     * `Массив часов.`
     */
    const hoursArray = [];
    /**
     * `Массив минут.`
     */
    const minutesArray = [];
    
    for(let i = 0; i < value.one.total; i = i + value.one.step) {
        const pad = String(i).padStart(2, '0');
        hoursArray.push(pad);
    }

    for(let i = 0; i < value.two.total; i = i + value.two.step) {
        const pad = String(i).padStart(2, '0');
        minutesArray.push(pad);
    }


    return {
        /**
         * `Массив часов.`
         */
        hoursArray,
        /**
         * `Массив минут.`
         */
        minutesArray
    }
}








