import { TPositions, IGetPositions } from "../types";

/**
 * @param listlength Длинна всего списка.
 * @param heightElement Высота одного элемента.
 */
export const getPositions = ({ data, heightElement, info }: IGetPositions): TPositions => {
    'worklet';

    let allPositions: TPositions = {};

    data.forEach((item, i) => {
        allPositions[item] = {
            updatedIndex: i,
            updatedTop: i * heightElement
        }
    })
    console.log(`getInitialPositions / ${info}`);
    return allPositions;
};