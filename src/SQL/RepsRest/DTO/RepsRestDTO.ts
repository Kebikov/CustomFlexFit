export interface RepsRestDTO {
     /** `ID` */
    id: number;
     /** `Очередность.` */
    order: number;
     /** `Количество повторений.` */
    reps: number;
     /** `Время отдыха в сек. после упражнения.` */
    rest: number;
     /** `Продолжительность выполнения упражнения.` */
    duration: number;
     /** `[REFERENCES] > [List]` */
    id_List: number;
}

export interface RepsRestDTOomitId extends RepsRestDTO {}