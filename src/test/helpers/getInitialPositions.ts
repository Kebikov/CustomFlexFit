import { TPositions } from "../types";

/**
 * @param listlength Длинна всего списка.
 * @param heightElement Высота одного элемента.
 */
export const getInitialPositions = (listlength: number, heightElement: number): TPositions => {
    let songPositions: TPositions = {};
    for (let i = 0; i < listlength; i++) {
        songPositions[i] = {
            updatedIndex: i,
            updatedTop: i * heightElement
        };
    }
    return songPositions;
};