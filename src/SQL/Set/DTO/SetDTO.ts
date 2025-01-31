export interface SetDTO {
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
     /** `Вес используемый в упражнении, если null значит указан набор используемого инвентаря для подхода.` */
    weight: number | null;
     /** `[Set] > [Exercise]` */
    id_Exercise: number;
}

export interface SetDTOomitId extends SetDTO {}