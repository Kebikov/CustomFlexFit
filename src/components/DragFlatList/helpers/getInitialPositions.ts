import logApp from "@/helpers/log";
import { TPositions } from "../types";

/**
 * @param listlength Длинна всего списка.
 * @param heightElement Высота одного элемента.
 */
export const getInitialPositions = <T>(data: T[], heightElement: number): TPositions => {
    'worklet';

    let songPositions: TPositions = {};

    data.forEach((item, i) => {
        if(item && typeof item === 'object' && 'id' in item) {
            songPositions[Number(item.id)] = {
                updatedIndex: i,
                updatedTop: i * heightElement
            }
        }
    })

    return songPositions;
};