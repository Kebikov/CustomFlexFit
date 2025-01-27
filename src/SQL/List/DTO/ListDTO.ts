export interface ListDTO {
     /** `ID` */
    id: number;
     /** `Очередность.` */
    order: number;
     /** `[REFERENCES] > [Day]` */
    id_Day: number;
     /** `[REFERENCES] > [Exercise]` */
    id_Exercise: number;
}

export interface ListDTOomitId extends ListDTO {}