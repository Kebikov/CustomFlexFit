/**
 * @table `RepsRest - Количество повторений и отдых после упражнения.`
 * @param id ID.
 * @param reps Количество повторений.
 * @param rest Время отдыха в сек. после упражнения.
 * @param id_List `REFERENCES > List` Подход в дне занятий.
 */
export interface RepsRestDTO {
    id: number;
    reps: number;
    rest: number;
    id_List: number;
}

export interface RepsRestDTOomitId extends RepsRestDTO {}