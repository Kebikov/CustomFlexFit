import { TPositions, IGetPositions } from "../types";

/** `Получение обьектов с данными для каждого числа.` */
export const getPositions = ({ data, heightElement, offset, info }: IGetPositions): TPositions[] => {
    'worklet';

    let allPositions: TPositions[] = [];

    data.forEach((item, i) => {
        allPositions.push(
            {
                num: item,
                top: i * heightElement + offset,
                heightElement
            }
        )
    });

    return allPositions;
};