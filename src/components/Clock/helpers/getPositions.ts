import { TPositions, IGetPositions } from "../types";

/**
 * @param listlength Длинна всего списка.
 * @param heightElement Высота одного элемента.
 */
export const getPositions = ({ data, heightElement, info }: IGetPositions): TPositions[] => {
    'worklet';

    let allPositions: TPositions[] = [];

    data.forEach((item, i) => {
        allPositions.push(
            {
                num: item,
                top: i * heightElement,
                heightElement
            }
        )
    });

    //console.log(`getInitialPositions / ${info}`);
    return allPositions;
};