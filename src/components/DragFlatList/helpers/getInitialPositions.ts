import logApp from "@/helpers/log";
import { TPositions } from "../types";

/**
 * @param listlength Длинна всего списка.
 * @param heightElement Высота одного элемента.
 */
export const getInitialPositions = <T>(data: T[], heightElement: number, info?: string): TPositions => {
    'worklet';

    let songPositions: TPositions = {};

    data.forEach((item, i) => {
        if(item && typeof item === 'object' && 'id' in item) {
            songPositions[String(item.id)] = {
                updatedIndex: i,
                updatedTop: i * heightElement
            }
        }
    })
    console.log(`getInitialPositions / ${info}`);
    return songPositions;
};