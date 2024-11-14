/**
 * @table `List_Equipment - List < REFERENCES > Equipment `
 * @param queue Очередность выполнения подхода.
 * @param id_List  `REFERENCES > List` Подход в дне занятий.
 * @param id_Equipment `REFERENCES > Equipment` Используемый инвентарь.
 */
export interface List_Equipment_DTO {
    id_List: number;
    id_Equipment: number;
}
