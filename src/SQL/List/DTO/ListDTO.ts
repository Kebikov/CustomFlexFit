/**
 * @table `List - Список подходов: какое упражнение + вес + повторы + время отдыха.`
 * @param id ID.
 * @param queue Очередность выполнения подхода.
 * @param id_Day  `REFERENCES > Day` День выполнения подхода.
 * @param id_Exercise `REFERENCES > Exercise` Выполняемое упражнение.
 */
export interface ListDTO {
    id: number;
    queue: number;
    id_Day: number;
    id_Exercise: number;
}

export interface ListDTOomitId extends ListDTO {}