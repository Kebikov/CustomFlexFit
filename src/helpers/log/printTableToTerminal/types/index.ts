import {selectionTypeObj, signObj} from '../modules/dataForTable'

export type TObj = {
    [key in string]: number | string;
}

export interface IlengthColumn {
    key: keyof TObj;
    length: number;
}

export interface IOptions {
    sing:  keyof typeof signObj | undefined;
    selectionType: keyof typeof selectionTypeObj;
}

export interface IPrint {
    dash: string;
    header: string;
    data: TObj[];
    columnLength: IlengthColumn[];
}