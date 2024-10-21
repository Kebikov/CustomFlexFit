export type TTables = 'Day' | 'Exercise' | 'List' | 'Equipment' | 'RepsRest' | 'List_Equipment';

/**
 * @constant Таблицы в BD.
 * @param DB_Name Имя BD.
 * @param TABLE_Day Тренировочный день.
 * @param TABLE_Exercise Упражнение.
 * @param TABLE_List Список подходов: какое упражнение + вес + повторы + время отдыха.
 * @param TABLE_Equipment Используемый инвентарь, блины, грифы.
 * @param TABLE_RepsRest Количество повторений и отдых после упражнения.
 */
export interface IConfiguration {
    DB_Name: string;
    TABLE_Day: TTables;
    TABLE_Exercise: TTables;
    TABLE_List: TTables;
    TABLE_Equipment: TTables;
    TABLE_RepsRest: TTables;
    TABLE_RELATION_List_Equipment: TTables;
}


const CONFIGURATION: IConfiguration = {
	DB_Name: 'customFlexFit.db',

	TABLE_Day: 'Day',
	TABLE_Exercise: 'Exercise',
    TABLE_List: 'List',
    TABLE_Equipment: 'Equipment',
    TABLE_RepsRest: 'RepsRest',
    
    TABLE_RELATION_List_Equipment: 'List_Equipment'
};


export default CONFIGURATION;