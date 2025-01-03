interface IgapsForClock  {
    fullRotationFirstNumber: number;
    fullRotationSecondNumber: number;
    itemHeight: number;
}


/**
 * `Промежутки для первого и второго числа, для определения в какой промежежуток попадает выбраная цыфра и установить ее номинал на основании промежутка.`
 */
export const gapsForClock = ({
    fullRotationFirstNumber,
    fullRotationSecondNumber,
    itemHeight
}: IgapsForClock) => {

    const pushInArray = (array: Array<number>, fullRotation: number): void => {
        for(let i = 0; i <= fullRotation; i += itemHeight) array.push(i);
    }

    /**
     * `Массив промежутков для первого числа.`
     */
    const gapsFirstNumber: number[] = [];
    pushInArray(gapsFirstNumber, fullRotationFirstNumber);
    
    /**
     * `Массив промежутков для второго числа.`
     */
    const gapsSecondNumber: number[] = [];
    pushInArray(gapsSecondNumber, fullRotationSecondNumber);


    return {
        /**
         * `Массив промежутков для первого числа.`
         */
        gapsFirstNumber,
        /**
         * `Массив промежутков для второго числа.`
         */
        gapsSecondNumber
    }
}