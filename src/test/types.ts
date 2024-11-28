export type TItem = {
    id: number;
    title: string;
    singer: string;
    imageSrc: string;
};


export type TPositions = {
    [key: number]: {
        updatedIndex: number;
        updatedTop: number;
    };
};


export type NullableNumber = null | number;
